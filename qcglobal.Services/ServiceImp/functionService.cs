using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class functionService : BaseService<functions>, IfunctionService
    {
        #region declare

        IfunctionRepository _functionRepository;

        #endregion

        #region contructor
        public functionService(IfunctionRepository functionRepository) : base(functionRepository)
        {
            _functionRepository = functionRepository;
        }

        #endregion


       
    }
}
