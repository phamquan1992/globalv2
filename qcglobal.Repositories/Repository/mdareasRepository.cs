using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class mdareasRepository : BaseRepository<mdareas>, ImdareasRepository
    {
        private readonly ISession _session;
        public mdareasRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
