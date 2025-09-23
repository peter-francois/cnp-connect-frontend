import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { links } from "../../utils/links";
import PrimaryButton from "../utils/PrimaryButton";
import AlertsIem from "./AlertsIem";
import Menu from "./Menu";

const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between h-20 border-b  border-gray-400 w-full px-4 py-5 fixed bg-slate-950/90 z-30">
      <div>
        <Bars3Icon width={38} onClick={openMenu} />
        <Menu links={links} isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} menuRef={menuRef} />
      </div>

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
