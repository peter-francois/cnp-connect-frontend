import type { UseFormRegister } from "react-hook-form";
import type { LineInterface } from "../../types/interfaces/LineInterface";

interface LineDataInterface {
  lineData: LineInterface;
  onClick: () => void;
  isSelected: boolean;
  register: UseFormRegister<any>;
}

const Line = ({ lineData, onClick, isSelected, register }: LineDataInterface) => {
  return (
    <>
      <label
        htmlFor={lineData.name}
        onClick={onClick}
        className={`p-3 border border-indigo-600 rounded-2xl text-center py-2 px-4 cursor-pointer ${
          isSelected && "bg-indigo-400 text-gray-900"
        }
      `}
      >
        {lineData && lineData.name}
      </label>
      <input
        className="absolute -top-96 -left-96"
        type="checkbox"
        id={lineData.name}
        checked={isSelected}
        value={lineData.id}
        {...register("lines")}
        readOnly
      />
    </>
  );
};

export default Line;
