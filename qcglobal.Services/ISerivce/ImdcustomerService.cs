using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface ImdcustomerService
    {
        IQueryable<mdcustomer> GetAll();
        bool CreateNew(mdcustomer obj);
        bool Update(mdcustomer obj);
        bool Delete(mdcustomer obj);
    }
}
