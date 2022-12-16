using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdtypeserviceMapping : ClassMap<mdtypeservice>
    {
        public mdtypeserviceMapping()
        {
            Table("mdtypeservice");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.isactive).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
            Map(x => x.typeservicecode).Not.Nullable();
            Map(x => x.typeservicename).Not.Nullable();
        }
    }
}
