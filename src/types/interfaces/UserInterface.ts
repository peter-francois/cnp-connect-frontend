import type { UserRolesEnum } from "../enum/UserEnum";
import type { AssignedLinesInterface } from "./line/AssignedLineInterface";
import type { AssignedTrainsInterface } from "./train/AssignedTrainInterface";

export interface SafeUserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  hiredAt: Date;
  isConnected: boolean;
  isAvailable: boolean;
  isActif: boolean;
  role: UserRolesEnum;
}

export interface CreateUserRequestInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  hiredAt: Date;
  role: UserRolesEnum.COORDINATOR | UserRolesEnum.DRIVER;
}

export interface SafeUserWithLinesAndTrainsInterface extends SafeUserInterface {
  assignedLines: AssignedLinesInterface[] | [];
  assignedTrains: AssignedTrainsInterface[] | [];
}
