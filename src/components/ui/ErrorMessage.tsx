import type { FieldErrors } from "react-hook-form";

interface ErrorMessageInterface {
  id: string;
  errors?: FieldErrors;
  customClass?: string;
}

const ErrorMessage = ({ errors, customClass, id }: ErrorMessageInterface) => {
  return (
    <>
      {errors && errors[id] && (
        <p className={`text-red-500 text-sm ml-1 ${customClass}`}>{errors[id].message as string}</p>
      )}
    </>
  );
};

export default ErrorMessage;
