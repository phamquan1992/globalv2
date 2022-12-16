using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class departmentService : IdepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        public departmentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<department> GetAll()
        {
            return _unitOfWork.departmentRepository.GetAll();
        }
        public department GetbyID(int id)
        {
            return _unitOfWork.departmentRepository.FindBy(id);
        }
        public department GetbyCode(string ma)
        {
            return _unitOfWork.departmentRepository.FindBy(t => t.departmentcode == ma);
        }
        public bool CreateNew(department obj)
        {
            try
            {
                return _unitOfWork.departmentRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(department obj)
        {
            try
            {
                return _unitOfWork.departmentRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool UpdateRange(List<department> obj)
        {
            try
            {
                return _unitOfWork.departmentRepository.UpdateRange(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(department obj)
        {
            try
            {
                return _unitOfWork.departmentRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool DeleteRange(List<department> obj)
        {
            try
            {
                return _unitOfWork.departmentRepository.DeleteRange(obj);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
