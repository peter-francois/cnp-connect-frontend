import type { ReactNode } from "react";

interface PopUpInterface {
  children: ReactNode;
}

const PopUp = ({ children }: PopUpInterface) => {
  return (
    <div className="flex justify-center items-center bg-red-700/40 rounded-lg px-5 py-2 border border-red-700">
      {children}
    </div>
  );
};

export default PopUp;
