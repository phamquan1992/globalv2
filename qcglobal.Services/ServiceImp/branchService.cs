using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class branchService : IbranchService
    {
        private readonly IUnitOfWork _unitOfWork;
        public branchService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IQueryable<branch> GetAll()
        {
            return _unitOfWork.branchRepository.GetAll();
        }
        public branch GetbyID(int id)
        {
            return _unitOfWork.branchRepository.FindBy(id);
        }
        public branch GetbyCode(string ma)
        {
            return _unitOfWork.branchRepository.FindBy(t => t.branchcode == ma);
        }
        public bool CreateNew(branch obj)
        {
            try
            {
                return _unitOfWork.branchRepository.Add(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool Update(branch obj)
        {
            try
            {
                return _unitOfWork.branchRepository.Update(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool UpdateRange(List<branch> obj)
        {
            try
            {
                return _unitOfWork.branchRepository.UpdateRange(obj);

            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool Delete(branch obj)
        {
            try
            {
                return _unitOfWork.branchRepository.Delete(obj);

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool DeleteRange(List<branch> obj)
        {
            try
            {
                return _unitOfWork.branchRepository.DeleteRange(obj);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
