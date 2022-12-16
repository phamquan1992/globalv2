using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdtypeserviceService : ImdtypeserviceService
    {
        private readonly IUnitOfWork _unitOfWork;
        public mdtypeserviceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<mdtypeservice> GetAll()
        {
            return _unitOfWork.mdtypeserviceRepository.GetAll();
        }
        public bool CreateNew(mdtypeservice obj)
        {
            try
            {
                return _unitOfWork.mdtypeserviceRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(mdtypeservice obj)
        {
            try
            {
                return _unitOfWork.mdtypeserviceRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(mdtypeservice obj)
        {
            try
            {
                return _unitOfWork.mdtypeserviceRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
