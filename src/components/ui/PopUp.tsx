import type { ReactNode } from "react";

interface PopUpInterface {
  children: ReactNode;
  customClass?: string;
}

const PopUp = ({ children, customClass }: PopUpInterface) => {
  return (
    <div
      className={`flex justify-center items-center bg-red-700/40 rounded-lg px-5 py-2 border border-red-700 text-justify ${customClass}`}
    >
      {children}
    </div>
  );
};

export default PopUp;
