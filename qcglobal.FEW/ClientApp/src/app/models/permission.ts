export interface permission {
  id: number;
  name: string;
  functionid: number;
  description?: string;
  active?: number;
  list_function?:  { key: string, value: string }[];
}
