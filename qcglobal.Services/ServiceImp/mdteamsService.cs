﻿using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Repositories.Repository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdteamsService : BaseService<mdteams>, ImdteamsService
    {
        #region declare

        ImdteamsRepository _mdteamsRepository;

        #endregion

        #region contructor
        public mdteamsService(ImdteamsRepository mdteamsRepository) : base(mdteamsRepository)
        {
            _mdteamsRepository = mdteamsRepository;
        }

        #endregion
    }
}
