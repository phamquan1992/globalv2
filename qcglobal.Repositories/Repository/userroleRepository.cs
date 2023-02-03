using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class userroleRepository : BaseRepository<userrole>, IuserroleRepository
    {
        private readonly ISession _session;
        public userroleRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
