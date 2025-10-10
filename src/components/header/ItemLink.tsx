import type { ReactNode } from "react";
import { NavLink } from "react-router";
import type { LinkInterface } from "../../types/interfaces/LinkInterface";

interface LinkComponentInterface {
  link: LinkInterface;
  children: ReactNode;
}

const ItemLink = ({ link, children }: LinkComponentInterface) => {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `text-indigo-50 px-4 py-2.5 rounded-2xl hover:text-indigo-500 ${isActive ? "hidden " : "visible"}`
      }
    >
      {children}
    </NavLink>
  );
};

export default ItemLink;
