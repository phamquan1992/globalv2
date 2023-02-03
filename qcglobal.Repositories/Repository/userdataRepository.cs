using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Repositories.Repository
{
    public class userdataRepository : BaseRepository<userdata>, IuserdataRepository
    {
        private readonly ISession _session;
        public userdataRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
