import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextareaInterface {
  id: string;
  rows: number;
  placeholder?: string;
  errors?: FieldErrors;
  customClass?: string;
  errorCustomClass?: string;
  textAreaCustomClass?: string;
  register: UseFormRegister<any>; // @dev find right type '--'
}

const Textarea = ({
  id,
  placeholder,
  errors,
  customClass,
  register,
  rows,
  textAreaCustomClass,
  errorCustomClass,
}: TextareaInterface) => {
  return (
    <fieldset>
      <legend className="sr-only">message de l'alerte</legend>
      <div className={`flex flex-col items-start gap-2 my-5 ${customClass}`}>
        <label htmlFor={id} className="sr-only">
          Message de l'alerte
        </label>

        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          aria-describedby={errors && errors[id] ? `${id}-error` : undefined}
          {...register(id)}
          className={`block w-full rounded-md text-base outline-1 -outline-offset-1 outline-gray-200/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${textAreaCustomClass}`}
        ></textarea>

        {errors && errors[id] && (
          <p className={`text-red-500 text-sm ml-1 ${errorCustomClass}`}>{errors[id].message as string}</p>
        )}
      </div>
    </fieldset>
  );
};

export default Textarea;
