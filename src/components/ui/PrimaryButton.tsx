import type { ReactNode } from "react";

interface PrimaryButtonInterface {
  children: ReactNode;
  handleOnCLick?: () => void;
  customClass?: string;
  type: "submit" | "reset" | "button" | undefined;
  data_cy: string
}

const PrimaryButton = ({ handleOnCLick, children, customClass, type , data_cy}: PrimaryButtonInterface) => {
  return (
    <button
      onClick={handleOnCLick}
      type={type}
      className={`bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 border-indigo-600 border text-base py-3 text-indigo-100 rounded-lg cursor-pointer border-box ${customClass}`}
      data-cy={data_cy}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
