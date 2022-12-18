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
        /// Service sửa thông tin đối tượng
        /// </summary>
        /// <param name="entity">đối tượng</param>
        /// <returns></returns>
        ServiceResult Update(TEntity entity);

        /// <summary>
        /// Service xóa đối tượng
        /// </summary>
        /// <param name="entityId"> list ID đối tượng</param>
        /// <returns></returns>
        ServiceResult Delete(List<int> ids);


        #endregion


    }
}
