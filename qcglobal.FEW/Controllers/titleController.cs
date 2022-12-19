using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qcglobal.Core.Domain;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.Controllers
{
    public class titleController : BaseEntitiesController<title>
    {
        ItitleService _baseService;
        public titleController(ItitleService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
