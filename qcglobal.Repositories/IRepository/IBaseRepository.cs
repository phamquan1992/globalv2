using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace qcglobal.Repositories.IRepository
{
    public interface IBaseRepository<T> where T : class
    {
        bool Add(T entity);
        bool AddRange(IEnumerable<T> entities);
        bool Update(T entity);
        bool UpdateRange(IEnumerable<T> entities);
        bool Delete(T entity);
        bool DeleteRange(IEnumerable<T> entities);

        IQueryable<T> GetAll();
        T FindBy(Expression<Func<T, bool>> expression);
        T FindBy(int id);
        IQueryable<T> FilterBy(Expression<Func<T, bool>> expression);
        void BeginTran();
        void CommintTran();
        void Clear();
        void RollBackTran();
        bool AddTran(T entity);
        bool AddRangeTran(IEnumerable<T> entities);
        bool UpdateTran(T entity);
        bool UpdateRangeTran(IEnumerable<T> entities);
        bool DeleteTran(T entity);
        bool DeleteRangeTran(IEnumerable<T> entities);
    }
}
