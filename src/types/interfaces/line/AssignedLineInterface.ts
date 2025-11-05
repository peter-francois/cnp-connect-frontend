import type { LineInterface } from "./LineInterface";

export interface AssignedLineInterface {
  lineId: number;
  userId: string;
  assignmentStartDate: Date;
  assignmentEndDate: Date;
  createdAt: Date;
  line: LineInterface
}
