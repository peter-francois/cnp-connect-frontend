import { useState } from "react";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { useLinesList } from "../../hooks/useLinesList";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import SelectableInput from "../ui/SelectableInput";
import ErrorMessage from "./ErrorMessage";

interface LinesListInterface {
  register: UseFormRegister<any>; // @dev find right type '--'
  type: string; // @dev enum
  handleSelectedLineFromChild?: (data: LineInterface[] | []) => void | null;
  isAlerts: boolean;
  registerError: FieldErrors;
  selectedUserRole: UserRolesEnum;
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
  const { isPending, isError, data, error: fetchError } = useLinesList();

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
      {isAlerts && authenticateUserRole == UserRolesEnum.DRIVER && (
        // @dev créé un boutton selectAll générique
        <div className="flex gap-2">
          <button
            type="button"
            className="border border-indigo-600 cursor-pointer rounded-2xl py-2 px-3 my-3 text-center hover:bg-indigo-400 hover:text-gray-900 active:text-gray-900 active:bg-indigo-400"
            onClick={() => (selectLines.length === data.length ? setSelectLines([]) : setSelectLines(data))}
          >
            {selectLines.length === data.length ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        </div>
      )}

      <div className="card-border justify-around relative grid grid-flow-col grid-rows-3 gap-y-7 gap-x-2 p-5">
        {data.map((line) => (
          <SelectableInput
            key={line.id}
            label="lines"
            data={line}
            onClick={() => handleSelectLines(line)}
            isSelected={selectLines.some((item) => item.id === line.id)}
            register={register}
            type={type}
            customClass="size-10"
          />
        ))}
      </div>

      <ErrorMessage id="lines" errors={registerError} />
    </>
  );
};

export default LinesList;
