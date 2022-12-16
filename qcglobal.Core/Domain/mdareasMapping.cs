using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdareasMapping : ClassMap<mdareas>
    {
        public mdareasMapping()
        {
            Table("mdareas");
            Id(x => x.code);
            Map(x => x.levelion).Nullable();
            Map(x => x.name).Not.Nullable();
            Map(x => x.orderidx).Nullable();
            Map(x => x.parent).Nullable();
            Map(x => x.status).Not.Nullable();

        }
    }
}
