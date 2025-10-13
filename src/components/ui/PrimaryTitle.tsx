import type { ReactNode } from "react";

interface PrimaryTitleInterface {
  children: ReactNode;
  customClass?: string;
}

const PrimaryTitle = ({ children, customClass }: PrimaryTitleInterface) => {
  return <h1 className={`text-2xl font-bold ${customClass}`}>{children}</h1>;
};

export default PrimaryTitle;
