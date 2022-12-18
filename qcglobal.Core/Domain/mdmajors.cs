using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class mdmajors
    {
        [Key]
        public virtual int id { get; set; }

        [Unique]
        [Required]
        [DisplayName("Ma chuyen nganh")]
        public virtual string majorscode { get; set; }
        public virtual string majorsname { get; set; }
        public virtual string description { get; set; }

        // sửa order --> orderidx do order trùng vs kí tự đặt biệt trong sql
        public virtual int orderidx { get; set; }
        public virtual bool isactive { get; set; }
        public virtual string created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual string last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; } = DateTime.Now;
    }
}
