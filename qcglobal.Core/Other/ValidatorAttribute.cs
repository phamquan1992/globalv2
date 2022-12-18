using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Other
{
    public class ValidatorAttribute
    {

        /// <summary>
        /// attribute cung cấp cho các property bắt buộc nhập - phục vụ cho validate
        /// </summary>
        [AttributeUsage(AttributeTargets.Property)]
        public class Key : Attribute
        {

        }
        /// <summary>
        /// attribute cung cấp cho các property bắt buộc nhập - phục vụ cho validate
        /// </summary>
        [AttributeUsage(AttributeTargets.Property)]
        public class Required : Attribute
        {

        }

        /// <summary>
        /// attribute cung cấp cho property để tránh trùng dữ liệu
        /// </summary>
        [AttributeUsage(AttributeTargets.Property)]
        public class Unique : Attribute
        {

        }

        /// <summary>
        /// attribute cung cấp cho property để hiên thị tên
        /// </summary>
        [AttributeUsage(AttributeTargets.Property)]
        public class DisplayName : Attribute
        {
            public string Name { get; set; }
            public DisplayName(string name = null)
            {
                this.Name = name;
            }
        }
    }
}
