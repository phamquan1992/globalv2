export interface role {
  id: number;
  name: string;
  active?: number;
  lstpermissionid?: string;

  list_per?:  { key: string, value: string }[];
}
