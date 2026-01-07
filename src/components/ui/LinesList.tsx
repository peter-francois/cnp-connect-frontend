import { useState } from "react";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import SelectableInput from "../ui/SelectableInput";
import ErrorMessage from "./ErrorMessage";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";
import { useUserService } from "../../hooks/useUserService";

interface LinesListInterface {
  register: UseFormRegister<any>; // @dev find right type '--'
  type: string; // @dev enum
  handleSelectedLineFromChild?: (data: LineInterface[] | []) => void | null;
  isAlerts: boolean;
  registerError: FieldErrors;
  selectedUserRole?: UserRolesEnum;
  authenticateUserRole?: UserRolesEnum;
}

const LinesList = ({
  register,
  type,
  authenticateUserRole,
  handleSelectedLineFromChild,
  isAlerts,
  registerError,
  selectedUserRole,
}: LinesListInterface) => {
  const [selectLines, setSelectLines] = useState<LineInterface[]>([]);
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);
  const id = me?.id;
  const { findUserDetails } = useUserService();
  const { isPending, isError, data, error: fetchError } = findUserDetails(String(id));

  const handleSelectLines = (line: LineInterface) => {
    const isAlreadySelected = selectLines.some((item) => item.id === line.id);
    const isDriver = selectedUserRole === UserRolesEnum.DRIVER;

    if (isDriver) {
      const newSelection = isAlreadySelected ? [] : [line];
      setSelectLines(newSelection);
      if (!isAlreadySelected && handleSelectedLineFromChild) {
        handleSelectedLineFromChild(newSelection);
      }
      return;
    }

    if (isAlreadySelected) {
      setSelectLines((prev) => prev.filter((item) => item.id !== line.id));
    } else {
      setSelectLines((prev) => [...prev, line]);
    }
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {fetchError.message}</span>;
  }

  return (
    <>
      {isAlerts && authenticateUserRole != UserRolesEnum.DRIVER && (
        // @dev créé un boutton selectAll générique
        <div className="flex gap-2">
          <button
            type="button"
            className="border border-indigo-600 cursor-pointer rounded-lg py-2 px-3 my-3 text-center hover:bg-indigo-400 hover:text-gray-900 active:text-gray-900 active:bg-indigo-400"
            onClick={() =>
              setSelectLines(
                selectLines.length === data?.assignedLines.length ? [] : data?.assignedLines.map((al) => al.line)
              )
            }
          >
            {selectLines.length === data?.assignedLines.length ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        </div>
      )}

      <div className="card-border justify-around relative flex flex-wrap gap-y-7 gap-x-2 p-5">
        {/* <div className="card-border justify-around relative grid grid-flow-col grid-rows-3 gap-y-7 gap-x-2 p-5"></div> */}
        {data?.assignedLines.map((line) => {
          return (
            <SelectableInput
              key={line.line.id}
              label="linesIds"
              data={line.line}
              onClick={() => handleSelectLines(line.line)}
              isSelected={selectLines.some((item) => item.id === line.line.id)}
              register={register}
              type={type}
              customClass="size-10"
            />
          );
        })}
      </div>

      <ErrorMessage id="lines" errors={registerError} />
    </>
  );
};

export default LinesList;
