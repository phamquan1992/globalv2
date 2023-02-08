using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class role
    {
        [Key]
        public virtual int id { get; set; }

        [Unique]
        [Required]
        [DisplayName("Tên vai trò")]
        public virtual string name { get; set; }
        public virtual int? active { get; set; }
        public virtual string creation_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual string last_update_by { get; set; }
        public virtual DateTime? last_update_date { get; set; } = DateTime.Now;

        public virtual string lstpermissionid { get; set; }

    }
}
