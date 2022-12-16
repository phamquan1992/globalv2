using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface ImdmajorsService
    {
        IQueryable<mdmajors> GetAll();
        bool CreateNew(mdmajors obj);
        bool Update(mdmajors obj);
        bool Delete(mdmajors obj);
    }
}
