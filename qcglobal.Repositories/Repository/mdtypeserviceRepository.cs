using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class mdtypeserviceRepository : BaseRepository<mdtypeservice>, ImdtypeserviceRepository
    {
        private readonly ISession _session;
        public mdtypeserviceRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
