using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class functionRepository : BaseRepository<functions>, IfunctionRepository
    {
        private readonly ISession _session;
        public functionRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
