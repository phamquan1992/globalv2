using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface IdepartmentService
    {
        IQueryable<department> GetAll();
        department GetbyID(int id);
        department GetbyCode(string ma);
        bool CreateNew(department obj);
        bool Update(department obj);
        bool UpdateRange(List<department> obj);
        bool Delete(department obj);
        bool DeleteRange(List<department> obj);
    }
}
