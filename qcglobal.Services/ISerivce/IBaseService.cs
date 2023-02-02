using FluentNHibernate.Data;
using qcglobal.Core.Domain;
using qcglobal.Core.Other;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface IBaseService<TEntity>
    {
        #region method

        /// <summary>
        /// Service lấy tất cả đối tượng
        /// </summary>
        /// <returns></returns>
        IQueryable<TEntity> GetEntities();

        /// <summary>
        /// Service lấy đối tượng theo ID
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        TEntity GetEntityById(int entityId);

        /// <summary>
        /// Service thêm thông tin đối tượng
        /// </summary>
        /// <param name="entity">đối tượng</param>
        /// <returns></returns>
        ServiceResult Add(TEntity entity);
        /// <summary>
        /// Service thêm danh sách đối tượng
        /// </summary>
        /// <param name="entity">Danh sách đối tượng</param>
        /// <returns></returns>
        ServiceResult AddRange(IEnumerable<TEntity> entity);

        /// <summary>
        /// Service sửa thông tin đối tượng
        /// </summary>
        /// <param name="entity">đối tượng</param>
        /// <returns></returns>
        ServiceResult Update(TEntity entity);

        /// <summary>
        /// Service sửa thông tin theo danh sách đối tượng
        /// </summary>
        /// <param name="entity">Danh sách đối tượng</param>
        /// <returns></returns>
        ServiceResult UpdateRange(IEnumerable<TEntity> entity);

        /// <summary>
        /// Service xóa đối tượng
        /// </summary>
        /// <param name="entityId">ID đối tượng</param>
        /// <returns></returns>
        ServiceResult Delete(int ids);

        /// <summary>
        /// Service xóa danh sách đối tượng
        /// </summary>
        /// <param name="entityId"> list ID đối tượng</param>
        /// <returns></returns>
        ServiceResult DeleteRange(List<int> ids);

        void BeginTran();
        void CommintTran();
        void RollBackTran();
        void Clear();
        /// <summary>
        /// Service thêm thông tin đối tượng
        /// </summary>
        /// <param name="entity">đối tượng</param>
        /// <returns></returns>
        ServiceResult AddTran(TEntity entity);
        /// <summary>
        /// Service thêm danh sách đối tượng
        /// </summary>
        /// <param name="entity">Danh sách đối tượng</param>
        /// <returns></returns>
        ServiceResult AddRangeTran(IEnumerable<TEntity> entity);

        /// <summary>
        /// Service sửa thông tin đối tượng
        /// </summary>
        /// <param name="entity">đối tượng</param>
        /// <returns></returns>
        ServiceResult UpdateTran(TEntity entity);

        /// <summary>
        /// Service sửa thông tin theo danh sách đối tượng
        /// </summary>
        /// <param name="entity">Danh sách đối tượng</param>
        /// <returns></returns>
        ServiceResult UpdateRangeTran(IEnumerable<TEntity> entity);

        /// <summary>
        /// Service xóa đối tượng
        /// </summary>
        /// <param name="entityId">ID đối tượng</param>
        /// <returns></returns>
        ServiceResult DeleteTran(int ids);

        /// <summary>
        /// Service xóa danh sách đối tượng
        /// </summary>
        /// <param name="entityId"> list ID đối tượng</param>
        /// <returns></returns>
        ServiceResult DeleteRangeTran(List<int> ids);
        #endregion


    }
}
