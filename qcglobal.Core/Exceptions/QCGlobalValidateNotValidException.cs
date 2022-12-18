using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Exceptions
{
    /// <summary>
    /// class ngoại lệ khi validate dữ liệu sai
    /// </summary>
    public class QCGlobalValidateNotValidException : Exception
    {
        public QCGlobalValidateNotValidException(object? value = null) =>
                                   (Value) = (value);
        public object? Value { get; }
    }
}
