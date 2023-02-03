using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class rolepermissionService : BaseService<rolepermission>, IrolepermissionService
    {
        #region declare

        IrolepermissionRepository _rolepermissionRepository;

        #endregion

        #region contructor
        public rolepermissionService(IrolepermissionRepository rolepermissionRepository) : base(rolepermissionRepository)
        {
            _rolepermissionRepository = rolepermissionRepository;
        }

        #endregion


       
    }
}
