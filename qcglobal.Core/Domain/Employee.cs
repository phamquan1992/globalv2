using System;
using System.Collections.Generic;
using System.Text;
using static qcglobal.Core.Other.ValidatorAttribute;

namespace qcglobal.Core.Domain
{
    public class Employee
    {
        [Key]
        public virtual int id { get; set; }

        [Unique]
        [Required]
        [DisplayName("Mã nhân viên")]
        public virtual string EmployeeCode { get; set; }

        [Required]
        [DisplayName("Tên nhân viên")]
        public virtual string EmployeeName { get; set; }
        public virtual string Address { get; set; }
        public virtual int? Sex { get; set; }
        public virtual DateTime? DateOfBirth { get; set; }
        public virtual string Image { get; set; }
        public virtual string Email { get; set; }
        public virtual string Telephone { get; set; }
        public virtual int? TitleID { get; set; }
        public virtual int? MDTeamsID { get; set; }
        public virtual DateTime? ProbationaryPeriod { get; set; }
        public virtual DateTime? OfficialBusinessDay { get; set; }
        public virtual int? Status { get; set; }
        public virtual string Nation { get; set; }
        public virtual string Religion { get; set; }
        public virtual string NativeCountry { get; set; }
        public virtual string IdentityCard { get; set; }
        public virtual string PlaceIssueIDCard { get; set; }
        public virtual DateTime? DateIssueIDCard { get; set; }
        public virtual string Education { get; set; }
        public virtual string ForeignLanguage { get; set; }
        public virtual string ProfessionalQualification { get; set; }
        public virtual string FatherName { get; set; }
        public virtual DateTime? FatherDateOfBirth { get; set; }
        public virtual string FatherAddress { get; set; }
        public virtual string FatherContact { get; set; }
        public virtual string MotherName { get; set; }
        public virtual DateTime? MotherDateOfBirth { get; set; }
        public virtual string MotherAddress { get; set; }
        public virtual string MotherContact { get; set; }
        public virtual string SiblingsName { get; set; }
        public virtual DateTime? SiblingsDateOfBirth { get; set; }
        public virtual string SiblingsAddress { get; set; }
        public virtual string SiblingsContact { get; set; }
        public virtual int? created_by { get; set; }
        public virtual DateTime? created_date { get; set; }
        public virtual int? last_updated_by { get; set; }
        public virtual DateTime? last_updated_date { get; set; } = DateTime.Now;
    }
}
