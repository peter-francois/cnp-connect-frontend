import type { UserRolesEnum } from "../enum/UserEnum";

export interface UserInterface {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar_url?: string;
  hiringAt: Date;
  isConnected: boolean;
  isAvailable: boolean;
  isActif: boolean;
  role: UserRolesEnum;
  lignesId?: number[];
  trainsId?: number;
}
