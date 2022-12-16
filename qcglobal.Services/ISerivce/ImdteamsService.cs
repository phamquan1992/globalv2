using qcglobal.Core.Domain;
using System.Linq;

namespace qcglobal.Services.ISerivce
{
    public interface ImdteamsService
    {
        IQueryable<mdteams> GetAll();
        bool CreateNew(mdteams obj);
        bool Update(mdteams obj);
        bool Delete(mdteams obj);
    }
}
