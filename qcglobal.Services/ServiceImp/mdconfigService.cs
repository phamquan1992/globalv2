using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdconfigService : ImdconfigService
    {
        private readonly IUnitOfWork _unitOfWork;
        public mdconfigService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<mdconfig> GetAll()
        {
            return _unitOfWork.mdconfigRepository.GetAll();
        }
        public bool CreateNew(mdconfig obj)
        {
            try
            {
                return _unitOfWork.mdconfigRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(mdconfig obj)
        {
            try
            {
                return _unitOfWork.mdconfigRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(mdconfig obj)
        {
            try
            {
                return _unitOfWork.mdconfigRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
