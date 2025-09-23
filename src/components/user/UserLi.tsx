import type { ReactNode } from "react";
import PrimaryButton from "../utils/PrimaryButton";

interface UserLiInterface {
  label: string;
  value: string | boolean;
  icon?: ReactNode;
}

const UserLi = ({ label, value, icon }: UserLiInterface) => {
  return (
    <li className="my-2.5">
      <div className="flex justify-between">
        <p className="font-bold mb-1">{label}: </p>
        {icon && (
          <PrimaryButton type="button" customClass="px-2 relative right-0">
            {icon}
          </PrimaryButton>
        )}
      </div>
      <p className="pl-2">{value}</p>
    </li>
  );
};

export default UserLi;
