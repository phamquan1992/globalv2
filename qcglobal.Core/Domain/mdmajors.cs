using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdmajors
    {
        public virtual int id { get; set; }
        public virtual string majorscode { get; set; }
        public virtual string majorsname { get; set; }
        public virtual string description { get; set; }
        public virtual int order { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int created_by { get; set; }
        public virtual int created_date { get; set; }
        public virtual int last_updated_by { get; set; }
        public virtual int last_updated_date { get; set; }
    }
}
