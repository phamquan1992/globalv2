using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class department
    {
        public virtual int id { get; set; }
        public virtual int branchid { get; set; }
        public virtual string departmentcode { get; set; }
        public virtual string departmentname { get; set; }
        public virtual string description { get; set; }
        public virtual int orderidx { get; set; }
        public virtual int parentid { get; set; }
        public virtual bool isparentnode { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }
}
