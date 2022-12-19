using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdmajorsService : BaseService<mdmajors>, ImdmajorsService
    {
        #region declare

        ImdmajorsRepository _mdMajorsRepository;

        #endregion

        #region contructor
        public mdmajorsService(ImdmajorsRepository mdmajorsRepository) : base(mdmajorsRepository)
        {
            _mdMajorsRepository = mdmajorsRepository;
        }

        #endregion


       
    }
}
