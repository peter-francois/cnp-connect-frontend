import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { UseFormNewAlert } from "../../types/formData/newAlertSchema";

interface PriorityInterface {
  priority: string;
  label: string;
  name: keyof UseFormNewAlert;
  errors?: FieldErrors;
  register: UseFormRegister<any>;
  isSelected: boolean;
}
const Priority = ({ label, priority, name, register, errors, isSelected }: PriorityInterface) => {
  return (
    <>
      <label
        className={`border border-indigo-600 cursor-pointer rounded-2xl py-3 gap-1 w-25 text-center ${
          isSelected && "bg-indigo-400 text-gray-900"
        }`}
      >
        <input type="radio" id={name} value={priority} className="hidden" {...register(name)} />
        {label}
      </label>
      {errors && errors[name] && <p className="text-red-500 text-sm ml-1">{errors[name].message as string}</p>}
    </>
  );
};

export default Priority;
