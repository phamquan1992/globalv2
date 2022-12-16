using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdcustomerService : ImdcustomerService
    {
        private readonly IUnitOfWork _unitOfWork;
        public mdcustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<mdcustomer> GetAll()
        {
            return _unitOfWork.mdcustomerRepository.GetAll();
        }
        public bool CreateNew(mdcustomer obj)
        {
            try
            {
                return _unitOfWork.mdcustomerRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(mdcustomer obj)
        {
            try
            {
                return _unitOfWork.mdcustomerRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(mdcustomer obj)
        {
            try
            {
                return _unitOfWork.mdcustomerRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
