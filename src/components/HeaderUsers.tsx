import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchBar from "./utils/SearchBar";
import { useState } from "react";
import { Link } from "react-router";

interface HeaderUsersInterface {
  search: string;
  setSearch: (value: string) => void;
}

const HeaderUsers = ({ search, setSearch }: HeaderUsersInterface) => {
  const [appUser] = useState(true);
  return (
    <div className="flex flex-col items-center relative">
      <span className="absolute top-7 left-2">
        <MagnifyingGlassIcon width={20} />
      </span>
      <SearchBar value={search} onChange={setSearch} />
      <div className= "w-full">
        {appUser && (
          <Link
            to="/"
            className= "w-full mb-6 text-center block bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base py-2 px-5 text-indigo-100 rounded-lg cursor-pointer"
          >
           + Ajouter un utilisateur
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderUsers;
