export interface employee {
    id: number;
    employeeCode: string;
    employeeName: string;
    address?: string;
    sex?: number;
    image?: string;
    email?: string;
    telephone?: string;
    dateOfBirth?: Date;
    mdTeamsID?: number;
    titleID?: number;
    probationaryPeriod?: Date;
    officialBusinessDay?: Date;
    status?: number;
    nation?: string;
    religion?: string;
    nativeCountry?: string;
    identityCard?: string;
    placeIssueIDCard?: string;
    dateIssueIDCard?: Date;
    education?: string;
    foreignLanguage?: string;
    professionalQualification?: string;
    fatherName?: string;
    fatherDateOfBirth?: Date;
    fatherAddress?: string;
    fatherContact?: string;
    motherName?: string;
    motherDateOfBirth?: Date;
    motherAddress?: string;
    motherContact?: string;
    siblingsName?: string;
    siblingsDateOfBirth?: Date;
    siblingsAddress?: string;
    siblingsContact?: string;
    list_mdteam?:  { key: string, value: string }[];
    list_title?:  { key: string, value: string }[];


}
