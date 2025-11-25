import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchBar from "../ui/SearchBar";
import { Link } from "react-router";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import { menuLinks } from "../../utils/links";

interface HeaderUsersInterface {
  search: string;
  setSearch: (value: string) => void;
}

const HeaderUsersPage = ({ search, setSearch }: HeaderUsersInterface) => {
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);

  return (
    <div className="flex flex-col items-center relative">
      <span className="absolute top-7 left-2">
        <MagnifyingGlassIcon width={20} />
      </span>

      <SearchBar value={search} onChange={setSearch} />

      <div className="w-full">
        {me && me.role === UserRolesEnum.SUPERVISOR && (
          <Link
            to={menuLinks.items.newUser.path}
            className="w-full mb-6 text-center block bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base py-2 px-5 text-indigo-100 rounded-lg cursor-pointer"
          >
            + Ajouter un utilisateur
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderUsersPage;
