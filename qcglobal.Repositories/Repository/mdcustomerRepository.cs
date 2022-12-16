using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class mdcustomerRepository : BaseRepository<mdcustomer>, ImdcustomerRepository
    {
        private readonly ISession _session;
        public mdcustomerRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
