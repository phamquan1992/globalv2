using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class rolesRepository : BaseRepository<roles>, IrolesRepository
    {
        private readonly ISession _session;
        public rolesRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
