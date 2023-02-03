using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class userdataMapping : ClassMap<userdata>
    {
        public userdataMapping()
        {
            Table("userdata");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.username).Not.Nullable();
            Map(x => x.password).Not.Nullable();
            Map(x => x.email).Not.Nullable();
            Map(x => x.serialtoken).Nullable();
            Map(x => x.status).Nullable();
            Map(x => x.isadmin).Nullable();
            Map(x => x.creation_by).Nullable();
            Map(x => x.created_date).Nullable();          
            Map(x => x.last_update_by).Nullable();
            Map(x => x.last_update_date).Nullable();
        }
    }
}
