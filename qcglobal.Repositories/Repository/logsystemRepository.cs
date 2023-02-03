using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class logsystemRepository : BaseRepository<logsystem>, IlogsystemRepository
    {
        private readonly ISession _session;
        public logsystemRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
