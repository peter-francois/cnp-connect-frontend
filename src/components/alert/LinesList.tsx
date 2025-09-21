import { useQuery } from "@tanstack/react-query";
import { getLines } from "../../api/line";
import Line from "./Line";
import { useState } from "react";
import type { LineInterface } from "../../interfaces/LinesInterface";
import type { UseFormRegister } from "react-hook-form";

interface LinesListInterface {
  register: UseFormRegister<any>;
}

const LinesList = ({register}: LinesListInterface) => {
    const [selectLines, setSelectLines] = useState<LineInterface[]>([])

  
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["lines"],
    queryFn: getLines,
  });
const handleSelectLines = (line:LineInterface) => {
    if(!selectLines.some((item) => item.id === line.id)) {
                    setSelectLines((prev) => [...prev, line]);
                } else {
                   setSelectLines((prev) => prev.filter((item) => item.id !== line.id));
                }
}

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="card-border py-3 px-5 relative flex flex-wrap gap-10">

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
  );
};

export default LinesList;
