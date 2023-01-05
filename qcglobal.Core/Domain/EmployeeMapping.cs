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
            Id(x => x.ID).GeneratedBy.Identity();
            Map(x => x.EmployeeCode).Nullable();
            Map(x => x.FullName).Nullable();
            Map(x => x.FullNameOther).Nullable();
            Map(x => x.Sex).Nullable();
            Map(x => x.BirthDate).Nullable();
            Map(x => x.BranchID).Nullable();
            Map(x => x.DepartmentID).Nullable();
            Map(x => x.TitleID).Nullable();
            Map(x => x.Status).Nullable();
            Map(x => x.MajorsID).Nullable();
            Map(x => x.ContractType).Nullable();
            Map(x => x.MissionStatus).Nullable();
            Map(x => x.Description).Nullable();
            Map(x => x.Email).Nullable();
            Map(x => x.Telephone).Nullable();
            Map(x => x.AreasCode1).Nullable();
            Map(x => x.AreasCode2).Nullable();
            Map(x => x.AreasCode3).Nullable();
            Map(x => x.AreasCodeNow1).Nullable();
            Map(x => x.AreasCodeNow2).Nullable();
            Map(x => x.AreasCodeNow3).Nullable();
            Map(x => x.Resident_Desc).Nullable();
            Map(x => x.AddressNow_Des).Nullable();
            Map(x => x.Ethnic).Nullable();
            Map(x => x.Religion).Nullable();
            Map(x => x.CCCD_CMT).Nullable();
            Map(x => x.CCCDDate).Nullable();
            Map(x => x.CCCDAddressBy).Nullable();
            Map(x => x.TaxCode).Nullable();
            Map(x => x.VssId).Nullable();
            Map(x => x.IsMarried).Nullable();
            Map(x => x.Image).Nullable();
            Map(x => x.RecruitDate).Nullable();
            Map(x => x.created_by).Nullable();
            Map(x => x.created_date).Nullable();
            Map(x => x.last_updated_by).Nullable();
            Map(x => x.last_updated_date).Nullable();
        }
    }
}
