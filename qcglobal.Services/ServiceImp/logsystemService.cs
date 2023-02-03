using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class logsystemService : BaseService<logsystem>, IlogsystemService
    {
        #region declare

        IlogsystemRepository _logsystemRepository;

        #endregion

        #region contructor
        public logsystemService(IlogsystemRepository logsystemRepository) : base(logsystemRepository)
        {
            _logsystemRepository = logsystemRepository;
        }

        #endregion


       
    }
}
