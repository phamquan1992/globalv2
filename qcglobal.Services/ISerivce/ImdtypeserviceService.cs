using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface ImdtypeserviceService
    {
        IQueryable<mdtypeservice> GetAll();
        bool CreateNew(mdtypeservice obj);
        bool Update(mdtypeservice obj);
        bool Delete(mdtypeservice obj);
    }
}
