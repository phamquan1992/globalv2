using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdconfig
    {
        public virtual int id { get; set; }
        public virtual string configcode { get; set; }
        public virtual string configname { get; set; }
        public virtual string description { get; set; }
        public virtual string parentcode { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }
}
