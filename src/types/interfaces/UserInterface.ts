import type { UserRolesEnum } from "../enum/UserEnum";
import type { AssignedLineInterface } from "./AssignedLine";
import type { AssignedTrain } from "./AssignedTrain";

export interface UserInterface {
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
  assignedLines?: AssignedLineInterface[];
  assignedTrains?: AssignedTrain[];
}
