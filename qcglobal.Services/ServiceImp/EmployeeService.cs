using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region declare

        IEmployeeRepository _employeeRepository;

        #endregion

        #region contructor
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #endregion


       
    }
}
