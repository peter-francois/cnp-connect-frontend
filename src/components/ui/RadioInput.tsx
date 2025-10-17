import type { UseFormRegister } from "react-hook-form";

interface InputRadioInterface {
  id: string;
  name: string;
  customClass?: string;
  register: UseFormRegister<any>; // @dev find right type '--'
}

const RadioInput = ({ id, register, name, customClass }: InputRadioInterface) => {
  return <input type="radio" id={id} className={`hidden ${customClass}`} value={id} {...register(name)} />;
};

export default RadioInput;
