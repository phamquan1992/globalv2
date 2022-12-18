using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using qcglobal.Core.Other;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Exceptions
{
    public class QCGlobalResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order { get; } = int.MaxValue - 10;

        public void OnActionExecuting(ActionExecutingContext context) { }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is QCGlobalValidateNotValidException exception)
            {
                var result = new
                {
                    devMsg = exception.Value,
                    userMsg = exception.Value,
                    data = DBNull.Value,
                    moreInfo = ""
                };
                context.Result = new ObjectResult(result)
                {
                    StatusCode = ((int)QCGlobalEnum.QCGlobalCode.NotValid),
                };
                context.ExceptionHandled = true;
            }
        }
    }
}
