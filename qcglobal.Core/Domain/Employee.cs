using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class Employee
    {
        [Key]
        public virtual int ID { get; set; }

        [Unique]
        [Required]
        [DisplayName("Mã nhân viên")]
        public virtual string EmployeeCode { get; set; }

        [Required]
        [DisplayName("Tên nhân viên")]
        public virtual string FullName { get; set; }
        public virtual string FullNameOther { get; set; }
        public virtual int? Sex { get; set; }
        public virtual DateTime? BirthDate { get; set; }
        public virtual int? BranchID { get; set; }
        public virtual int? DepartmentID { get; set; }
        public virtual int? TitleID { get; set; }
        public virtual int? Status { get; set; }
        public virtual int? MajorsID { get; set; }
        public virtual int? ContractType { get; set; }
        public virtual int? MissionStatus { get; set; }
        public virtual string Description { get; set; }
        public virtual string Email { get; set; }
        public virtual string Telephone { get; set; }
        public virtual string AreasCode1 { get; set; }
        public virtual string AreasCode2 { get; set; }
        public virtual string AreasCode3 { get; set; }
        public virtual string AreasCodeNow1 { get; set; }
        public virtual string AreasCodeNow2 { get; set; }
        public virtual string AreasCodeNow3 { get; set; }
        public virtual string Resident_Desc { get; set; }
        public virtual string AddressNow_Des { get; set; }
        public virtual string Ethnic { get; set; }
        public virtual string Religion { get; set; }
        public virtual string CCCD_CMT { get; set; }
        public virtual string CCCDDate { get; set; }
        public virtual string CCCDAddressBy { get; set; }
        public virtual string TaxCode { get; set; }
        public virtual string VssId { get; set; }
        public virtual int? IsMarried { get; set; }
        public virtual string Image { get; set; }
        public virtual DateTime? RecruitDate { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; } = DateTime.Now;
    }
}
