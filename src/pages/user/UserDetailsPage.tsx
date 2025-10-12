import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router";
import StatusIsConnected from "../../components/user/StatusIsConnected";
import UserField from "../../components/user/UserField";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { useEffect, useState } from "react";
import { getUsersById } from "../../api/user.api";
import type { UserInterface } from "../../types/interfaces/UserInterface";
import Assignment from "../../components/user/Assignment";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { getLines } from "../../api/line.api";
import { UserRolesEnum } from "../../types/enum/UserEnum";
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
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const [lines, setLines] = useState<LineInterface[]>([]);
  const roleUserFromToken: UserRolesEnum = UserRolesEnum.supervisor;

  useEffect(() => {
    const getData = async () => {
      const data = await getLines();
      setLines(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const user = await getUsersById(Number(id));
      setCurrentUser(user);
    };
    getData();
  }, [id]);

  return currentUser ? (
    <div className="my-3">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src={currentUser.avatar_url}
            alt={currentUser.firstName}
          />
          {/* input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm" to={"/"}>
            Changer la photo
          </Link>
        </div>
        <ul>
          <UserField label="Nom" value={currentUser.firstName} />
          <UserField label="Rôle" value={currentUser.role} />
          <UserField label="Embauché depuis le" value={currentUser.hiringAt} />
        </ul>
      </section>

      <section>
        {/*je doit sortir l'icone et faire une sesction 2 plus propre comme au dessus  */}
        <ul>
          <UserField label="Email" value={currentUser.email} icon={<EnvelopeIcon width={20}></EnvelopeIcon>} />
          <UserField
            label="Statut"
            value={
              <div className="flex gap-3">
                <p>Connecté</p>
                <StatusIsConnected status={currentUser.isConnected}></StatusIsConnected>
              </div>
            }
          />
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
    <span>Aucun utilisateur touvé</span>
  );
};

export default UserDetailsPage;
