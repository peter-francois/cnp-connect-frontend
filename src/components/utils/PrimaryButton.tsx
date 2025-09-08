import type { ReactNode } from "react";

interface PrimaryButtonInterface {
  children: ReactNode;
  handleOnCLick?: () => void;
  customClass?: string;
}

const PrimaryButton = ({ handleOnCLick, children, customClass }: PrimaryButtonInterface) => {
  return (
    <button
      onClick={handleOnCLick}
      className={`bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base w-full py-3 text-indigo-100 rounded-lg cursor-pointer ${customClass}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
