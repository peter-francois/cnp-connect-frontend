import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router";
import StatusIsConnected from "../../components/user/StatusIsConnected";
import UserField from "../../components/user/UserField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useEffect, useState } from "react";
import type { UserInterface } from "../../types/interfaces/UserInterface";
import Assignment from "../../components/user/Assignment";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { getLines } from "../../api/line.api";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import { useUserDetails } from "../../hooks/useUserDetails";
// method => PATH
// path => api/v1/users/:userId
// method => GET
// path => api/v1/users/:userId

// -------
// Comments:
// Superviseur : peut sélectionner une ligne et attribuer un train disponible sur cette ligne à un conducteur.
// Superviseur : peut sélectionner des lignes disponibles pour un coordinateur.
// Coordinateur : peut sélectionner une ligne et attribuer un train disponible sur cette ligne à un conducteur.
// Conducteur : peut voir la ligne et le train qui lui sont affectés.
// Utilisateur connecté voir son profil et peut changer sa photo et son statut

const UserDetailsPage = () => {
  const { id } = useParams();
  const [lines, setLines] = useState<LineInterface[]>([]);
  const roleUserFromToken: UserRolesEnum = UserRolesEnum.coordinator;

  // @dev use tanstack
  useEffect(() => {
    const getData = async () => {
      const data = await getLines();
      setLines(data);
    };
    getData();
  }, []);

  // const {
  //   isPending,
  //   isError,
  //   data: currentUser,
  //   error,
  // } = useQuery({
  //   queryKey: [`user${id}`],
  //   queryFn: () => getUsersById(Number(id)),
  // });
  const { isPending, isError, data: currentUser, error } = useUserDetails(Number(id));

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return currentUser ? (
    <div className="my-3">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src={currentUser.avatar_url}
            alt={currentUser.firstName}
          />
          {/* @dev input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm text-center" to="/">
            Changer la photo
          </Link>
        </div>

        <ul>
          <UserField label="Nom" value={currentUser.firstName} />
          {/* @dev faire le changement de Supervisor a superviseur */}
          <UserField label="Rôle" value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} />
          <UserField
            label="Date d'embauche"
            value={new Date(currentUser.hiringAt).toLocaleDateString("fr-FR", {
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
            <UserField label="Email" value={currentUser.email} />
            <Link
              to={`mailto:${currentUser.email}`}
              className="size-8 mt-9 ml-5 bg-indigo-600 hover:bg-indigo-900 active:border active:border-indigo-400 text-base py-3 text-indigo-100 rounded-lg cursor-pointer border-box center"
            >
              <EnvelopeIcon width={20}></EnvelopeIcon>
            </Link>
          </div>

          <div className="flex items-center">
            <UserField label="Statut" value={currentUser.isConnected ? "Connecté" : "Non connecté"} />
            <StatusIsConnected customClass="mt-7 ml-5" status={currentUser.isConnected} />
          </div>

          <UserField
            label="Affectation"
            value={
              currentUser.lignesId
                ? `Ligne${currentUser.lignesId.length == 1 ? "" : "s"} ${currentUser.lignesId.join(", ")}`
                : `Train ${currentUser.trainsId}`
            }
          />
        </ul>
      </section>

      <div className="flex flex-col gap-6 my-4 mx-auto">
        {roleUserFromToken != UserRolesEnum.conductor && (
          <Assignment currentUserRole={currentUser.role} lines={lines} />
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
