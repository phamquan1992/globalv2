using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Other
{
    public class QCGlobalEnum
    {
        /// <summary>
        /// QCGlobalCode để xác định trạng thái validate
        /// </summary>
        public enum QCGlobalCode
        {
            /// <summary>
            /// dữ liệu hợp lệ
            /// </summary>
            IsValid = 100,
            /// <summary>
            /// dữ liệu không hợp lệ
            /// </summary>
            NotValid = 400,
            /// <summary>
            /// dữ liệu thành công
            /// </summary>
            Success = 200
        }
    }
}
