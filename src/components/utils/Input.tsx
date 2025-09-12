import type { ReactNode } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputInterface {
  id: string;
  type: string;
  placeholder?: string;
  label: string;
  errors?: FieldErrors; //change the any to right type
  customClass?: string;
  icon?: ReactNode;
  register: UseFormRegister<any>;
}

const Input = ({ id, type, placeholder, label, errors, customClass, icon, register }: InputInterface) => {
  return (
    <div className={`flex flex-col items-start gap-2 my-5 ${customClass} ${icon && "relative"}`}>
      {icon && <span className="absolute top-10 left-2">{icon}</span>}
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        className="block w-full rounded-md pl-9 pr-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-200/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
      />

      {errors && errors[id] && <p className="text-red-500 text-sm ml-1">{errors[id].message as string}</p>}
    </div>
  );
};

export default Input;
