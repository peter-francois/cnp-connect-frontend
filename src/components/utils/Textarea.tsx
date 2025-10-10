import type { FieldErrors, UseFormRegister } from "react-hook-form";



interface TextareaInterface {
  id: string;
  placeholder?: string;
  errors?: FieldErrors; //change the any to right type
  customClass?: string;
  register: UseFormRegister<any>;
}

const Textarea = ({ id, placeholder, errors, customClass, register }: TextareaInterface) => {
  return (
    <div className={`flex flex-col items-start gap-2 my-5 ${customClass}`}>
      <textarea
        id={id}
        rows={5}
        placeholder={placeholder}
        {...register(id)}
        className="block w-full rounded-md pl-9 pr-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-200/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 "
      ></textarea>

      {errors && errors[id] && <p className="text-red-500 text-sm ml-1">{errors[id].message as string}</p>}
    </div>
  );
};

export default Textarea;
