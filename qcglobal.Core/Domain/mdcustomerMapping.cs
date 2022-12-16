using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdcustomerMapping:ClassMap<mdcustomer>
    {
        public mdcustomerMapping()
        {
            Table("mdcustomer");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.address).Nullable();
            Map(x => x.bankaccount).Nullable();
            Map(x => x.bankname).Nullable();
            Map(x => x.branchid).Nullable();
            Map(x => x.contactemail).Nullable();
            Map(x => x.contactmobile).Nullable();
            Map(x => x.contactname).Nullable();
            Map(x => x.contactsex).Nullable();
            Map(x => x.contacttitle).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.email).Nullable();
            Map(x => x.fax).Nullable();
            Map(x => x.isactive).Nullable();
            Map(x => x.iscustomer).Nullable();
            Map(x => x.isprovider).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
            Map(x => x.objectcode).Nullable();
            Map(x => x.objectname).Nullable();
            Map(x => x.objecttype).Nullable();
            Map(x => x.taxcode).Nullable();
            Map(x => x.tel).Nullable();
            Map(x => x.website).Nullable();
        }
    }
}
