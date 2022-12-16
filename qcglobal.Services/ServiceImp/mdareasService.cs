using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdareasService : ImdareasService
    {
        private readonly IUnitOfWork _unitOfWork;
        public mdareasService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<mdareas> GetAll()
        {
            return _unitOfWork.mdareasRepository.GetAll();
        }
        public bool CreateNew(mdareas obj)
        {
            try
            {
                return _unitOfWork.mdareasRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(mdareas obj)
        {
            try
            {
                return _unitOfWork.mdareasRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Delete(mdareas obj)
        {
            try
            {
                return _unitOfWork.mdareasRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
