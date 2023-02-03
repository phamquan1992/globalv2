using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class logsystem
    {
        [Key]
        public virtual int id { get; set; }
        public virtual int userid { get; set; }
        public virtual string events { get; set; }
        public virtual string commentlog { get; set; }
        public virtual string ipaddress { get; set; }
        public virtual string browser { get; set; }
        public virtual DateTime? created_date { get; set; }
    }
}
