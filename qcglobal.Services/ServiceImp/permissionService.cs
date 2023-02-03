using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class permissionService : BaseService<permission>, IpermissionService
    {
        #region declare

        IpermissionRepository _permissionRepository;

        #endregion

        #region contructor
        public permissionService(IpermissionRepository permissionRepository) : base(permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        #endregion


       
    }
}
