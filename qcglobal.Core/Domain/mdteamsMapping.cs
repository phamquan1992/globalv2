using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class mdteamsMapping : ClassMap<mdteams>
    {
        public mdteamsMapping()
        {
            Table("mdteams");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.isactive).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
            Map(x => x.leaderid).Nullable();
            Map(x => x.teamcode).Not.Nullable();
            Map(x => x.teamname).Not.Nullable();
            Map(x => x.userid).Nullable();
        }
    }
}
