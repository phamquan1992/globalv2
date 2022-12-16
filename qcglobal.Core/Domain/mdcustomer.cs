using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdcustomer
    {
        public virtual int id { get; set; }
        public virtual int? branchid { get; set; }
        public virtual string objectcode { get; set; }
        public virtual string objectname { get; set; }
        public virtual string address { get; set; }
        public virtual string tel { get; set; }
        public virtual string fax { get; set; }
        public virtual string email { get; set; }
        public virtual string website { get; set; }
        public virtual string bankaccount { get; set; }
        public virtual string bankname { get; set; }
        public virtual string taxcode { get; set; }
        public virtual string description { get; set; }
        public virtual string contactname { get; set; }
        public virtual string contacttitle { get; set; }
        public virtual int contactsex { get; set; }
        public virtual string contactmobile { get; set; }
        public virtual string contactemail { get; set; }
        public virtual int? objecttype { get; set; }
        public virtual bool iscustomer { get; set; }
        public virtual bool isprovider { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; }
    }
}
