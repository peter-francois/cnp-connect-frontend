import { Bars3Icon } from "@heroicons/react/24/outline";
import PrimaryButton from "../utils/PrimaryButton";
import AlertsIem from "./AlertsIem";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-20 border-b border-gray-400 w-full px-4 py-5 fixed">
      <nav>
        <Bars3Icon width={38} />
      </nav>

      <PrimaryButton type="button" customClass="w-24 h-10 center">
        Alerte
      </PrimaryButton>

      <ul className="center gap-2.5">
        <AlertsIem notificationNumber={5} customClass="bg-green-600" />
        <AlertsIem notificationNumber={3} customClass="bg-yellow-600" />
        <AlertsIem notificationNumber={1} customClass="bg-rose-800" />
      </ul>
    </div>
  );
};

export default Header;
