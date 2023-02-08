using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class title
    {
        [Key]
        public virtual int id { get; set; }

        [Required]
        [Unique]
        [DisplayName("Ma chuc vu")]
        public virtual string titlecode { get; set; }
        [Required]
        [DisplayName("Ten chuc vu")]
        public virtual string titlename { get; set; }
        public virtual string description { get; set; }
        public virtual int? orderidx { get; set; }
        public virtual int? departmentid { get; set; }
        [Required]
        [DisplayName("Tinh trang kich hoat")]
        public virtual bool? isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }

}
