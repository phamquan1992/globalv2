using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain
{
    public class EmployeeMapping : ClassMap<Employee>
    {
        public EmployeeMapping()
        {
            Table("Employee");
            Id(x => x.id).GeneratedBy.Identity();
            Map(x => x.EmployeeCode).Nullable();
            Map(x => x.EmployeeName).Nullable();
            Map(x => x.Address).Nullable();
            Map(x => x.Sex).Nullable();
            Map(x => x.Image).Nullable();
            Map(x => x.Email).Nullable();
            Map(x => x.Telephone).Nullable();
            Map(x => x.DateOfBirth).Nullable();
            Map(x => x.MDTeamsID).Nullable();
            Map(x => x.TitleID).Nullable();
            Map(x => x.ProbationaryPeriod).Nullable();
            Map(x => x.OfficialBusinessDay).Nullable();
            Map(x => x.Status).Nullable();
            Map(x => x.Nation).Nullable();
            Map(x => x.Religion).Nullable();
            Map(x => x.NativeCountry).Nullable();
            Map(x => x.IdentityCard).Nullable();
            Map(x => x.PlaceIssueIDCard).Nullable();
            Map(x => x.DateIssueIDCard).Nullable();
            Map(x => x.Education).Nullable();
            Map(x => x.ForeignLanguage).Nullable();
            Map(x => x.ProfessionalQualification).Nullable();
            Map(x => x.FatherName).Nullable();
            Map(x => x.FatherDateOfBirth).Nullable();
            Map(x => x.FatherAddress).Nullable();
            Map(x => x.FatherContact).Nullable();
            Map(x => x.MotherName).Nullable();
            Map(x => x.MotherDateOfBirth).Nullable();
            Map(x => x.MotherAddress).Nullable();
            Map(x => x.MotherContact).Nullable();
            Map(x => x.SiblingsName).Nullable();
            Map(x => x.SiblingsDateOfBirth).Nullable();
            Map(x => x.SiblingsAddress).Nullable();
            Map(x => x.SiblingsContact).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
        }
    }
}
