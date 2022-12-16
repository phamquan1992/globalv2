using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class mdconfigRepository : BaseRepository<mdconfig>, ImdconfigRepository
    {
        private readonly ISession _session;
        public mdconfigRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
