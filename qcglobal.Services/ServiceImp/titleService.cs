using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace qcglobal.Services.ServiceImp
{
    public class titleService : BaseService<title>, ItitleService
    {
        #region declare

        ItitleRepository _titleRepository;

        #endregion

        #region contructor
        public titleService(ItitleRepository titleRepository) : base(titleRepository)
        {
            _titleRepository = titleRepository;
        }
        #endregion
    }
}
