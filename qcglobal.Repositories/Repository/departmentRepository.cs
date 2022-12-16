﻿using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class departmentRepository :BaseRepository<department>, IdepartmentRepository
    {
        private readonly ISession _session;
        public departmentRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
