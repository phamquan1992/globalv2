using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class titleRepository : BaseRepository<title>, ItitleRepository
    {
        private readonly ISession _session;
        public titleRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
