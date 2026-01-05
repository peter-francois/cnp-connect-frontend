import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UseFormNewAlert } from "../../types/formSchema/newAlertSchema";
import type { PriorityEnum } from "../../types/enum/UserEnum";
import RadioInput from "../ui/RadioInput";
import Label from "../ui/Label";

interface PriorityInterface {
  priority: PriorityEnum;
  label: string;
  name: keyof UseFormNewAlert;
  errors?: FieldErrors;
  register: UseFormRegister<any>; // @dev find right type '--'
  isSelected: boolean;
}
const Priority = ({ label, priority, name, register, errors, isSelected }: PriorityInterface) => {
  // const id = `${name}-${priority}`;
  return (
    <div>
      <RadioInput id={priority} customClass="sr-only" register={register} name={name} />

      <Label
        htmlFor={priority}
        label={label}
        isSelected={false}
        customClass={isSelected ? "bg-indigo-400 text-gray-900 border-indigo-600 " : "border-indigo-600"}
      />

      {/* <label
        htmlFor={priority}
        className={`border border-indigo-600 cursor-pointer rounded-2xl py-3 px-5 gap-1 w-25 text-center ${
          isSelected && "bg-indigo-400 text-gray-900"
        }`}
      >
        {label}
      </label> */}
      {errors && errors[name] && <p className="text-red-500 text-sm ml-1">{errors[name].message as string}</p>}
    </div>
  );
};

export default Priority;
