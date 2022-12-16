using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ISerivce
{
    public interface ImdareasService
    {
        IQueryable<mdareas> GetAll();
        bool CreateNew(mdareas obj);
        bool Update(mdareas obj);
        bool Delete(mdareas obj);
    }
}
