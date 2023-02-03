using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class userroleService : BaseService<userrole>, IuserroleService
    {
        #region declare

        IuserroleRepository _userroleRepository;

        #endregion

        #region contructor
        public userroleService(IuserroleRepository userroleRepository) : base(userroleRepository)
        {
            _userroleRepository = userroleRepository;
        }

        #endregion


       
    }
}
