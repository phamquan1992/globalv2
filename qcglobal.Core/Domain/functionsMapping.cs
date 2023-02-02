using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class functionsMapping : ClassMap<functions>
    {
        public functionsMapping()
        {
            Table("functions");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.name).Not.Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.active).Nullable();
            Map(x => x.creation_by).Nullable();
            Map(x => x.created_date).Nullable();          
            Map(x => x.last_update_by).Nullable();
            Map(x => x.last_update_date).Nullable();
        }
    }
}
