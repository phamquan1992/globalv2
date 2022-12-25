import { branch } from './branch';
import { department } from './department';
export interface employee {
    id: number;
    employeecode: string;
    employeename: string;
    address: string;
    branchid?: number;
    branchname?: string;
    sex?: boolean;
    tel? : string;
    status?: boolean;
}
