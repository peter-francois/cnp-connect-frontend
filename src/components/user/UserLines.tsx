import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { AssignedLinesInterface } from "../../types/interfaces/line/AssignedLineInterface";

interface UserLignInterface {
  assignedLines: AssignedLinesInterface[];
  role: string;
}

const UserLines = ({ assignedLines, role }: UserLignInterface) => {
  return (
    <>
      {assignedLines && (
        <span className="flex">
          <ul className=" px-2 flex gap-2 w-25 overflow-hidden">
            {role === UserRolesEnum.SUPERVISOR ? "Toutes" : assignedLines.map((assignedLine) => (
             
              <li key={assignedLine.line.id}>{ assignedLine.line.name}</li>
            ))}
          </ul>
        </span>
      )}
    </>
  );
};

export default UserLines;
