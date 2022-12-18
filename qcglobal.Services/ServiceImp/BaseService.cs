using FluentNHibernate.Data;
using NHibernate.Criterion;
using qcglobal.Core.Exceptions;
using qcglobal.Core.Other;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Services.ServiceImp
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class
    {
        #region declare and contructor
        IBaseRepository<TEntity> _baseRepository;
        protected ServiceResult _serviceResult;
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { QCGlobalCode = QCGlobalEnum.QCGlobalCode.Success };
        }

        #endregion

        #region method

        public IQueryable<TEntity> GetEntities()
        {
            return _baseRepository.GetAll();
        }

        public TEntity GetEntityById(int entityId)
        {
            return _baseRepository.FindBy(entityId);
        }

        public virtual ServiceResult Add(TEntity entity)
        {
            // validate dữ liệu
            var isValidate = Validate(entity);
            if (isValidate == true)
            {               
                if (_baseRepository.Add(entity))
                {
                    _serviceResult.Data = true;
                    _serviceResult.QCGlobalCode = QCGlobalEnum.QCGlobalCode.IsValid;
                }
                else
                {
                    _serviceResult.Data = false;
                    _serviceResult.Message = "Đã có lỗi sảy ra!";
                    _serviceResult.QCGlobalCode = QCGlobalEnum.QCGlobalCode.NotValid;
                }
            }
            return _serviceResult;
        }

        public virtual ServiceResult Update(TEntity entity)
        {
            var isValidate = Validate(entity);
            if (isValidate)
            {
                if (_baseRepository.Update(entity))
                {
                    _serviceResult.Data = true;
                    _serviceResult.QCGlobalCode = QCGlobalEnum.QCGlobalCode.IsValid;
                }
                else
                {
                    _serviceResult.Data = false;
                    _serviceResult.Message = "Đã có lỗi sảy ra!";
                    _serviceResult.QCGlobalCode = QCGlobalEnum.QCGlobalCode.NotValid;
                }
                
            }
            return _serviceResult;
        }

        public ServiceResult Delete(List<int> ids)
        {
            if (ids != null && ids.Count > 0)
            {
                ids = ids.Distinct().ToList();
                var entity = _baseRepository.GetAll().ToList().Where(x => ids.Contains((int)GetKeyValueOfEntity(x)));
                _serviceResult.Data = _baseRepository.DeleteRange(entity);
            }
            else
            {
                _serviceResult.Data = false;
                _serviceResult.Message= "khong co du lieu";
            }
            return _serviceResult;            
        }

        /// <summary>
        /// lấy giá trị key của đổi tượng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        private static int GetKeyValueOfEntity(TEntity entity)
        {
            var result = -1;
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {             
                if (property.IsDefined(typeof(Key), false))
                {
                    var value = property.GetValue(entity);
                    result = (int)value;
                    break;
                }
            }
            return result;
        }

        /// <summary>
        /// kiểm tra dữ liệu
        /// </summary>
        /// <param name="entity">object</param>
        /// <returns>true: Valid / false: Not Valid</returns>
        protected bool Validate(TEntity entity)
        {
            var isValidate = true;
            // khai báo 1 mảng chứa các câu thông báo lỗi
            var msgArrayError = new List<string>();
            // lấy các property
            var properties = entity.GetType().GetProperties();
            int id = 0;
            
            // đọc các property
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);

                // lay ra id
                if (property.IsDefined(typeof(Key), false))
                {
                    id = (int)propertyValue;
                }


                var displayName = string.Empty;
                //lấy tất cả tên của property
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                // lấy tên hiển thị đầu tiên của property
                if (displayNameAttributes.Length > 0)
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }

                // kiểm tra xem attribute có cần validate không
                // check bắt buộc nhập
                if (property.IsDefined(typeof(Required), false))
                {
                    if (propertyValue == null || string.IsNullOrEmpty(propertyValue.ToString().Trim()))
                    {
                        isValidate = false;
                        msgArrayError.Add(string.Format("{0} không được phép để trống", displayName));
                    }
                }
                // check trùng dữ liệu
                if (property.IsDefined(typeof(Unique), false))
                {
                    var propertyName = property.Name;
                    var entities = _baseRepository.GetAll().ToList();
                    if (entities != null && entities.Count() > 0)
                    {
                        var tempEntity = entities.Where(x => object.Equals(propertyValue, x.GetType().GetProperty(propertyName).GetValue(x, null)) && !object.Equals(id, x.GetType().GetProperty("id").GetValue(x, null))).FirstOrDefault();
                        if (tempEntity != null)
                        {
                            isValidate = false;
                            msgArrayError.Add(string.Format("{0} không được phép trungf", displayName));
                            break;
                        }
                    }

                }

            }
            if (msgArrayError != null && msgArrayError.Count > 0)
            {
                _serviceResult.Message = msgArrayError[0];
            }

            //_serviceResult.Data = msgArrayError;
            //if (msgArrayError.Count > 0)
            //{
            //    throw new QCGlobalValidateNotValidException(msgArrayError);
            //}
            return isValidate;
        }

        /// <summary>
        /// hàm thực hiện kiểm tra nghiệp vụ/ dữ liệu tùy chỉnh
        /// </summary>
        /// <param name="entity">object</param>
        /// <returns>true:valid / false:not valid</returns>
        protected virtual bool ValidateCustom(TEntity entity)
        {
            return true;
        }


        #endregion

    }
}
