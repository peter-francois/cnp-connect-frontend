import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import type { TrainInterface } from "../../types/interfaces/train/TrainInterface";

interface SelectableInputInterface {
  label: string;
  data: LineInterface | TrainInterface;
  onClick: () => void;
  isSelected: boolean;
  register: UseFormRegister<FieldValues>;
  type: string;
  customClass?: string;
}

const SelectableInput = ({
  label,
  data,
  onClick,
  isSelected,
  register,
  type,
  customClass,
}: SelectableInputInterface) => {
  return (
    <>
      <label
        htmlFor={`${data.name}`}
        onClick={onClick}
        className={`border border-indigo-600 rounded-2xl text-center cursor-pointer center ${
          isSelected && "bg-indigo-400 text-gray-900"
        } ${customClass}`}
        aria-checked={isSelected}
      >
        {data && data.name}
      </label>

      <input
        className="sr-only"
        type={type}
        id={data.name}
        checked={isSelected}
        value={data.id}
        {...register(label, {
          setValueAs: (v) => Number(v),
        })}
      />
    </>
  );
};

export default SelectableInput;
