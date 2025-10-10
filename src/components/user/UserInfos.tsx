import type { UserInterface } from "../../types/interfaces/UserInterface";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import StatusIsConnected from "./StatusIsConnected";
import UserLines from "./UserLines";
import CloseButton from "../utils/CloseButton";
import UserTrain from "./UserTrain";
import SecondaryTitle from "../utils/SecondaryTitle";

interface UserPropsInterface {
  userData: UserInterface;
  currentUser: number | null;
  setCurrentUser: (id: number | null) => void;
}

const UserInfos = ({ userData, currentUser, setCurrentUser }: UserPropsInterface) => {
  return (
    <>
      <li
        className={`flex items-center justify-between gap-4 py-2 px-7 relative cursor-pointer ${
          currentUser == userData.id ? "bg-indigo-300" : "hover:bg-indigo-300 "
        } `}
        onClick={() => setCurrentUser(currentUser === userData.id ? null : userData.id)}
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
            <div className="flex">
              <SecondaryTitle>Statut:</SecondaryTitle>
              <StatusIsConnected status={userData.isConnected} />
            </div>
            <div className="flex">
              <SecondaryTitle>Ligne{userData.lignesId && userData.lignesId.length >= 2 && "s"}:</SecondaryTitle>
              <UserLines lignesId={userData.lignesId} />
            </div>
            <div className="flex">
              <SecondaryTitle>Train:</SecondaryTitle>
              <UserTrain train={userData.trainsId} />
            </div>
            <Link to={`/utilisateurs/${userData.id}`}>
              <EllipsisVerticalIcon width={20} className=" text-white" />
            </Link>
          </div>
        )}
      </li>
    </>
  );
};

export default UserInfos;
