import { XMarkIcon } from "@heroicons/react/24/outline";
import type { LinkInterface } from "../../types/interfaces/linkInterfaces.types";
import ItemLink from "./ItemLink";
import PrimaryButton from "../ui/PrimaryButton";
import { useAuthService } from "../../hooks/useAuthService";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface MenuComponentInterface {
  links: LinkInterface;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ({ links, isOpen, menuRef, setIsOpen }: MenuComponentInterface) => {
  const closeMenu = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const { signout } = useAuthService();
  const { mutate, isPending } = signout();
  const queryClient = useQueryClient();

  const handleSignout = () => {
    mutate(undefined, {
      onSuccess: () => {
        localStorage.clear();
        queryClient.clear();

        navigate("/");
      },
      onError: (error) => console.log(error),
    });
  };

  return (
    <>
      {isOpen && (
        <div
          ref={menuRef}
          className="h-screen border border-gray-400 rounded-2xl w-80 absolute top-0 left-0 bg-slate-950"
        >
          {/* 79px => Height of div minus border */}
          <div className="flex items-center justify-between border-b border-gray-400 px-4 h-[79px] mb-10">
            <h2>Menu</h2>
            <XMarkIcon width={30} className="bg-red-600 hover:bg-red-900 rounded-full" onClick={closeMenu} />
          </div>

          <div className="flex flex-col justify-between h-5/6">
            <nav>
              <ul className="flex flex-col gap-5 px-5">
                {Object.entries(links.items).map(([key, item]) => {
                  return (
                    <ItemLink
                      key={key}
                      name={key}
                      link={item.path}
                      allowedRolesLink={item.allowedRoles}
                      handleOnClick={closeMenu}
                    >
                      {item.name}
                    </ItemLink>
                  );
                })}
              </ul>
            </nav>

            {isPending && <p className="text-center">Déconnexion en cours...</p>}
            <PrimaryButton type="button" customClass="mx-9" handleOnCLick={handleSignout}>
              Se déconneter
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
