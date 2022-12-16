using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class title
    {
        public virtual int id { get; set; }
        public virtual string titlecode { get; set; }
        public virtual string titlename { get; set; }
        public virtual string description { get; set; }
        public virtual int? order { get; set; }
        public virtual int? departmentid { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }
}
