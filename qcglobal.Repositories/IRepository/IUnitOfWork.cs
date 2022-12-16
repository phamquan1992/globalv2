using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.IRepository
{
    public interface IUnitOfWork
    {
        IbranchRepository branchRepository { get; }
        IdepartmentRepository departmentRepository { get; }
        ImdareasRepository mdareasRepository { get; }
        ImdconfigRepository mdconfigRepository { get; }
        ImdcustomerRepository mdcustomerRepository { get; }        
        ImdmajorsRepository mdmajorsRepository { get; }
        ImdteamsRepository mdteamsRepository { get; }
        ImdtypeserviceRepository mdtypeserviceRepository { get; }
        ItitleRepository titleRepository { get; }
        void Commit();
        void Rollback();
    }
}
