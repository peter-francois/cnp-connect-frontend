import type { ReactNode } from "react";

interface SecondaryTitleInterface {
  children: ReactNode;
  customClass?: string;
}

const SecondaryTitle = ({ children, customClass }: SecondaryTitleInterface) => {
  return <h2 className={`font-bold ${customClass}`}>{children}</h2>;
};

export default SecondaryTitle;
