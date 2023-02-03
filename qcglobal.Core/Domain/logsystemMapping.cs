using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class logsystemMapping : ClassMap<logsystem>
    {
        public logsystemMapping()
        {
            Table("logsystem");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.userid).Not.Nullable();
            Map(x => x.events).Nullable();
            Map(x => x.commentlog).Nullable();
            Map(x => x.ipaddress).Nullable();
            Map(x => x.browser).Nullable();
            Map(x => x.created_date).Nullable();          
        }
    }
}
