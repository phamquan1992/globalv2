using NHibernate;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;

namespace qcglobal.Repositories.Repository
{
    public class mdteamsRepository : BaseRepository<mdteams>, ImdteamsRepository
    {
        private readonly ISession _session;
        public mdteamsRepository(ISession session) : base(session)
        {
            _session = session;
        }
    }
}
