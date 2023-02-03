using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class userdataService : BaseService<userdata>, IuserdataService
    {
        #region declare

        IuserdataRepository _userdataRepository;

        #endregion

        #region contructor
        public userdataService(IuserdataRepository userdataRepository) : base(userdataRepository)
        {
            _userdataRepository = userdataRepository;
        }

        #endregion


       
    }
}
