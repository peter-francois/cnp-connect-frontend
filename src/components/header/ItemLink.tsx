import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface LinkComponentInterface {
  link: string;
  children: ReactNode;
}

const ItemLink = ({ link, children }: LinkComponentInterface) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `text-indigo-50 px-4 py-2.5 rounded-2xl hover:text-indigo-500 ${isActive && "text-indigo-500 underline"}`
      }
    >
      {children}
    </NavLink>
  );
};

export default ItemLink;
