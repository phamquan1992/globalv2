using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class titleService : ItitleService
    {
        private readonly IUnitOfWork _unitOfWork;
        public titleService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<title> GetAll()
        {
            return _unitOfWork.titleRepository.GetAll();
        }
        public bool CreateNew(title obj)
        {
            try
            {
                return _unitOfWork.titleRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(title obj)
        {
            try
            {
                return _unitOfWork.titleRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(title obj)
        {
            try
            {
                return _unitOfWork.titleRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
