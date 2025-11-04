import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router";
import StatusIsConnected from "../../components/user/StatusIsConnected";
import UserField from "../../components/user/UserField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Assignment from "../../components/user/Assignment";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import { useUserDetails } from "../../hooks/useUserDetails";

const UserDetailsPage = () => {
  const { id } = useParams();
  const authenticateUserRole: UserRolesEnum = UserRolesEnum.SUPERVISOR;
  const { isPending, isError, data: selectedUser, error } = useUserDetails(Number(id));

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return selectedUser ? (
    <div className="my-3">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src={selectedUser.avatar_url}
            alt={selectedUser.firstName}
          />
          {/* @dev input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm text-center" to="/">
            Changer la photo
          </Link>
        </div>

        <ul>
          <UserField label="Nom" value={selectedUser.firstName} />
          <UserField label="Rôle" value={selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} />
          <UserField
            label="Date d'embauche"
            value={new Date(selectedUser.hiringAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          />
        </ul>
      </section>

      <section className="flex justify-between">
        <ul className="flex flex-col">
          <div className="flex">
            <UserField label="Email" value={selectedUser.email} />
            <Link
              to={`mailto:${selectedUser.email}`}
              className="size-8 mt-9 ml-5 bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base py-3 text-indigo-100 rounded-lg cursor-pointer border-box center"
            >
              <EnvelopeIcon width={20}></EnvelopeIcon>
            </Link>
          </div>

          <div className="flex items-center">
            <UserField label="Statut" value={selectedUser.isConnected ? "Connecté" : "Non connecté"} />
            <StatusIsConnected customClass="mt-7 ml-5" status={selectedUser.isConnected} />
          </div>

          <UserField
            label="Affectation"
            value={
              selectedUser.lignesId
                ? `Ligne${selectedUser.lignesId.length == 1 ? "" : "s"} ${selectedUser.lignesId.join(", ")}`
                : `Train ${selectedUser.trainsId}`
            }
          />
        </ul>
      </section>

      <div className="flex flex-col gap-6 my-4 mx-auto">
        {authenticateUserRole != UserRolesEnum.DRIVER && (
          <Assignment selectedUserRole={selectedUser.role} authenticateUserRole={authenticateUserRole} />
        )}

        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </div>
    </div>
  ) : (
    // @dev page not found
    <span>Aucun utilisateur touvé</span>
  );
};

export default UserDetailsPage;
