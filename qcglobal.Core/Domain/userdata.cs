using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class userdata
    {
        [Key]
        public virtual int id { get; set; }

        [Unique]
        [Required]
        [DisplayName("Tên nhân viên")]
        public virtual string username { get; set; }

        [Required]
        [DisplayName("Password")]
        public virtual string password { get; set; }

        [Required]
        [DisplayName("Email")]
        public virtual string email { get; set; }
        public virtual string serialtoken { get; set; }

        public virtual int? status { get; set; }
        public virtual int? isadmin { get; set; }
        public virtual string creation_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual string last_update_by { get; set; }
        public virtual DateTime? last_update_date { get; set; } = DateTime.Now;

        public virtual string lstroleid { get; set; }

    }
}
