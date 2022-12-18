using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class mdmajorsService : BaseService<mdmajors>, ImdmajorsService
    {
        #region declare

        ImdmajorsRepository _mdMajorsRepository;

        #endregion

        #region contructor
        public mdmajorsService(ImdmajorsRepository mdmajorsRepository) : base(mdmajorsRepository)
        {
            _mdMajorsRepository = mdmajorsRepository;
        }

        #endregion


        //private readonly IUnitOfWork _unitOfWork;
        //public mdmajorsService(IUnitOfWork unitOfWork)
        //{
        //    _unitOfWork = unitOfWork;
        //}
        //public IQueryable<mdmajors> GetAll()
        //{
        //    return _unitOfWork.mdmajorsRepository.GetAll();
        //}
        //public bool CreateNew(mdmajors obj)
        //{
        //    try
        //    {
        //        return _unitOfWork.mdmajorsRepository.Add(obj);

        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //}
        //public bool Update(mdmajors obj)
        //{
        //    try
        //    {
        //        return _unitOfWork.mdmajorsRepository.Update(obj);

        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //}
        //public bool Delete(mdmajors obj)
        //{
        //    try
        //    {
        //        return _unitOfWork.mdmajorsRepository.Delete(obj);

        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //}
    }
}
