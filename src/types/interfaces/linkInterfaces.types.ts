import type { UserRolesEnum } from "../enum/UserEnum";

export interface ItemLinkInterface {
  name: string;
  path: string;
  allowedRoles?: UserRolesEnum[];
}

export interface LinkInterface {
  items: Record<string, ItemLinkInterface>;
}
