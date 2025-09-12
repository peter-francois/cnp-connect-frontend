import type { UserInterface } from "../interfaces/UsersInterface";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import StatusIsConnect from "../components/utils/StatusIsConnect";
import UserLign from "../components/utils/UserLign";
import CloseButton from "../components/utils/CloseButton";
import UserTrain from "../components/utils/UserTrain";
import { useState } from "react";

interface UserPropsInterface {
  userData: UserInterface;
}

const User = ({ userData }: UserPropsInterface) => {
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  return (
    <>
      <li
        className={`flex items-center justify-between gap-4 py-2 px-7 relative cursor-pointer ${
          currentUser == userData.id ? "bg-indigo-300" : "hover:bg-indigo-300 "
        } `}
        onClick={() => setCurrentUser(userData.id)}
      >
        <div className="flex items-center gap-4">
          <img className="rounded-full w-10" src={userData.avatar_url} alt={userData.lastName} />
          <span>
            {userData.firstName} {userData.lastName}
          </span>
        </div>

        <span>{userData.role}</span>
        {currentUser == userData.id && (
          <div className=" absolute border rounded w-full bg-indigo-600  top-11 left-0 z-20 p-3 flex justify-between">
            <CloseButton onClose={() => setCurrentUser(null)} />
            <StatusIsConnect status={userData.isConnected} />
            <UserLign lignesId={userData.lignesId} />
            <UserTrain train={userData.trainsId} />
            <Link to={`/users/${userData.id}`}>
              <EllipsisVerticalIcon width={20} className=" text-white" />
            </Link>
          </div>
        )}
      </li>
    </>
  );
};

export default User;
