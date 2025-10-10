import { useQuery } from "@tanstack/react-query";
import { getLines } from "../../api/line.api";
import Line from "./Line";
import { useState } from "react";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface LinesListInterface {
  register: UseFormRegister<any>;
  errors?: FieldErrors;
}

const LinesList = ({ register, errors }: LinesListInterface) => {
  const [selectLines, setSelectLines] = useState<LineInterface[]>([]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["lines"],
    queryFn: getLines,
  });

  const handleSelectLines = (line: LineInterface) => {
    if (!selectLines.some((item) => item.id === line.id)) {
      setSelectLines((prev) => [...prev, line]);
    } else {
      setSelectLines((prev) => prev.filter((item) => item.id !== line.id));
    }
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          type="button"
          className="border border-indigo-600 cursor-pointer rounded-2xl py-2 px-3 my-3 text-center hover:bg-indigo-400 hover:text-gray-900 active:text-gray-900 active:bg-indigo-400"
          onClick={() => (selectLines.length === data.length ? setSelectLines([]) : setSelectLines(data))}
        >
          {selectLines.length === data.length ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>
      <div className="card-border py-3 relative grid grid-flow-col grid-rows-3 gap-4">
        {data.map((line) => (
          <Line
            key={line.id}
            lineData={line}
            onClick={() => handleSelectLines(line)}
            isSelected={selectLines.some((item) => item.id === line.id)}
            register={register}
          />
        ))}
      </div>
      {errors && errors["lines"] && <p className="text-red-500 text-sm ml-1">{errors["lines"].message as string}</p>}
    </>
  );
};

export default LinesList;
