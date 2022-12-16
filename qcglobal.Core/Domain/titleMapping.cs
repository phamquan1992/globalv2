using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class titleMapping : ClassMap<title>
    {
        public titleMapping()
        {
            Table("title");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.departmentid).Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.isactive).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
            Map(x => x.order).Nullable();
            Map(x => x.titlecode).Not.Nullable();
            Map(x => x.titlename).Not.Nullable();
        }
    }
}
