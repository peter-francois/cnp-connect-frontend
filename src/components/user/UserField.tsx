import type { JSX, ReactNode } from "react";
import PrimaryButton from "../utils/PrimaryButton";
import type { UserRolesEnum } from "../../enum/UserEnum";

interface UserLiInterface {
  label: string;
  value: string | boolean | JSX.Element | UserRolesEnum;
}

const UserField = ({ label, value }: UserLiInterface) => {
  return (
    <li className="my-2.5">
      <div className="flex justify-between">
        <p className="font-bold mb-1">{label}: </p>
      </div>
      <div className="pl-2">{value}</div>
    </li>
  );
};

export default UserField;
