import type { ReactNode } from "react";

interface PopUpInterface {
  children: ReactNode;
  customClass?: string;
  data_cy?: string;
}

const PopUp = ({ children, customClass, data_cy }: PopUpInterface) => {
  return (
    <div
      data-cy={data_cy}
      className={`flex justify-center items-center rounded-lg px-5 py-2 border text-justify ${customClass}`}
    >
      {children}
    </div>
  );
};

export default PopUp;
