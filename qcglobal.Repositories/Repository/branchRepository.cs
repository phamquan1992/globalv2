using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class branchRepository : BaseRepository<branch>, IbranchRepository
    {
        private readonly ISession _session;
        public branchRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
