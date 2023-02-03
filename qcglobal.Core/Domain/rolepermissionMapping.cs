using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class rolepermissionMapping : ClassMap<rolepermission>
    {
        public rolepermissionMapping()
        {
            Table("rolepermission");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.permissionid).Not.Nullable();
            Map(x => x.roleid).Not.Nullable();
            Map(x => x.creation_by).Nullable();
            Map(x => x.created_date).Nullable();          
            Map(x => x.last_update_by).Nullable();
            Map(x => x.last_update_date).Nullable();
        }
    }
}
