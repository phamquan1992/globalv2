﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qcglobal.Core.Domain;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.Controllers
{
    public class rolesController : BaseEntitiesController<roles>
    {
        IrolesService _baseService;
        public rolesController(IrolesService baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
