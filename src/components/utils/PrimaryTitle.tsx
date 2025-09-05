import type { ReactNode } from "react";

interface PrimaryTitleInterface {
  children: ReactNode;
}

const PrimaryTitle = ({ children }: PrimaryTitleInterface) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default PrimaryTitle;
