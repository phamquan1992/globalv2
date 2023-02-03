using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class rolepermissionRepository : BaseRepository<rolepermission>, IrolepermissionRepository
    {
        private readonly ISession _session;
        public rolepermissionRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
