using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdareas
    {
        public virtual string code { get; set; }
        public virtual string name { get; set; }
        public virtual string parent { get; set; }
        public virtual int? levelion { get; set; }
        public virtual int? orderidx { get; set; }
        public virtual bool status { get; set; }
    }
}
