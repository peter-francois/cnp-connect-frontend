import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";

interface LinkComponentInterface {
  link: string;
  allowedRolesLink: UserRolesEnum[] | undefined;
  children: ReactNode;
  handleOnClick: () => void;
}

const ItemLink = ({ link, children, allowedRolesLink, handleOnClick }: LinkComponentInterface) => {
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);

  return (
    <NavLink
      to={link}
      onClick={handleOnClick}
      className={({ isActive }) =>
        `text-indigo-50 px-4 py-2.5 rounded-2xl hover:text-indigo-500 ${isActive && "text-indigo-500 underline"} ${
          me && !allowedRolesLink?.includes(me.role) && "hidden"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default ItemLink;
