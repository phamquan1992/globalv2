using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class mdteams
    {
        [Key]
        public virtual int id { get; set; }

        [Unique]
        [Required]
        [DisplayName("Mã nhóm")]
        public virtual string teamcode { get; set; }

        [Required]
        [DisplayName("Tên nhóm")]
        public virtual string teamname { get; set; }
        public virtual string description { get; set; }
        public virtual int? leaderid { get; set; }
        public virtual int? userid { get; set; }
        public virtual bool isactive { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; } = DateTime.Now;
    }
}
