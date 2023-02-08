export interface userdata {
    id: number;
    username: string;
    password: string;
    email: string;
    serialtoken?: string;
    isadmin?:number;
    status?:number;
    lstroleid?:string;
    list_email?:  { key: string, value: string }[];
    list_role?:  { key: string, value: string }[];
}
