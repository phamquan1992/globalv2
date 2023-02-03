using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class permissionRepository : BaseRepository<permission>, IpermissionRepository
    {
        private readonly ISession _session;
        public permissionRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
