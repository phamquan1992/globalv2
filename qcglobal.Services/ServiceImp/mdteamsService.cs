using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdteamsService : ImdteamsService
    {
        private readonly IUnitOfWork _unitOfWork;
        public mdteamsService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<mdteams> GetAll()
        {
            return _unitOfWork.mdteamsRepository.GetAll();
        }
        public bool CreateNew(mdteams obj)
        {
            try
            {
                return _unitOfWork.mdteamsRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(mdteams obj)
        {
            try
            {
                return _unitOfWork.mdteamsRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(mdteams obj)
        {
            try
            {
                return _unitOfWork.mdteamsRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
