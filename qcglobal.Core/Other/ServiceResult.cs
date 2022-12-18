using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.QCGlobalEnum;

namespace qcglobal.Core.Other
{
    public class ServiceResult
    {
        /// <summary>
        /// dữ liệu trả về của service
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Thông báo kết quả trả về của service
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Mã Code của service
        /// </summary>
        public QCGlobalCode QCGlobalCode { get; set; }
    }
}
