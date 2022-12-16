using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class branchMapping : ClassMap<branch>
    {
        public branchMapping()
        {
            Table("branch");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.address).Nullable();
            Map(x => x.branchcode).Not.Nullable();
            Map(x => x.branchid).Nullable();
            Map(x => x.branchname).Not.Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.description).Nullable();
            Map(x => x.isactive).Nullable();
            Map(x => x.isparentnode).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
            Map(x => x.orderidx).Nullable();
        }
    }
}
