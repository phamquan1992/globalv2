using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface IbranchService
    {
        IQueryable<branch> GetAll();
        branch GetbyID(int id);
        branch GetbyCode(string ma);
        bool CreateNew(branch obj);
        bool Update(branch obj);
        bool UpdateRange(List<branch> obj);
        bool Delete(branch obj);
        bool DeleteRange(List<branch> obj);
    }
}
