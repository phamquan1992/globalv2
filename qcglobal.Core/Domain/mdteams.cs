using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdteams
    {
        public virtual int id { get; set; }
        public virtual string teamcode { get; set; }
        public virtual string teamname { get; set; }
        public virtual string description { get; set; }
        public virtual int? leaderid { get; set; }
        public virtual int? userid { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }
}
