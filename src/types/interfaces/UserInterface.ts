import type { UserRolesEnum } from "../enum/UserEnum";
import type { AssignedLinesInterface } from "./AssignedLine";
import type { AssignedTrainsInterface } from "./AssignedTrain";

export interface SafeUserInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  hiredAt: Date;
  isConnected: boolean;
  isAvailable: boolean;
  isActif: boolean;
  role: UserRolesEnum;
  assignedLines?: AssignedLinesInterface[];
  assignedTrains?: AssignedTrainsInterface[];
}
export interface createUserInterface extends SafeUserInterface {
  password: string;
}

export interface SafeUserResponseWithLinesAndTrainsInterface extends SafeUserInterface {
  assignedLines: AssignedLinesInterface[] | [];
  assignedTrains: AssignedTrainsInterface[] | [];
}
