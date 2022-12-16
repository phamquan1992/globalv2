using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface ImdconfigService
    {
        IQueryable<mdconfig> GetAll();
        bool CreateNew(mdconfig obj);
        bool Update(mdconfig obj);
        bool Delete(mdconfig obj);
    }
}
