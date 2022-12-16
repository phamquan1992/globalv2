﻿using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class mdmajorsRepository : BaseRepository<mdmajors>, ImdmajorsRepository
    {
        private readonly ISession _session;
        public mdmajorsRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
