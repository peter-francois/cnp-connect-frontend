import type { PriorityEnum } from "../enum/UserEnum";

export interface AlertInterface {
  content: string;
  priority: PriorityEnum;
  lines: number[];
}
