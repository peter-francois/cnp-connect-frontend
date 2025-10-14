import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { links } from "../../utils/links";
import AlertsItem from "./AlertsItem";
import Menu from "./Menu";
import { Link } from "react-router";

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

      {/* faire un composant pour le link car utilisé dans userDetail aussi */}
      <Link
        to="/nouvelle-alerte"
        className="w-24 h-10 center bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base py-3 text-indigo-100 rounded-lg cursor-pointer border-box center"
      >
        Alerte
      </Link>

      <ul className="center gap-2.5">
        <AlertsItem notificationNumber={5} customClass="bg-green-600" />
        <AlertsItem notificationNumber={3} customClass="bg-yellow-600" />
        <AlertsItem notificationNumber={1} customClass="bg-rose-800" />
      </ul>
    </div>
  );
};

export default Header;
