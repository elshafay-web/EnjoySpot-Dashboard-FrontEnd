export interface IPermission {
  moduleName: string;
  permissions: { name: string; isSelected: boolean }[];
}
export interface IRole {
  id: string;
  name: string;
  modules: {
    moduleName: string;
    permissions: string[];
  }[];
  isActive: boolean;
  permissonsIds: string[];
}
