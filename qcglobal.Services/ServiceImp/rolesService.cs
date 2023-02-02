using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class rolesService : BaseService<roles>, IrolesService
    {
        #region declare

        IrolesRepository _rolesRepository;

        #endregion

        #region contructor
        public rolesService(IrolesRepository rolesRepository) : base(rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        #endregion


       
    }
}
