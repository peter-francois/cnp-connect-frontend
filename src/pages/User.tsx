import { Link } from "react-router";
import PrimaryButton from "../components/utils/PrimaryButton";
import UserLi from "../components/user/UserLi";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import SecondaryTitle from "../components/utils/Secondarytitle";

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
const User = () => {
  const user = {
    name: "Peter",
    role: "sup",
    hiredAt: "2025",
    email: "email",
    status: true,
    lignes: [1, 3, 6],
    train: 56,
  };
  const [toggleReassign, setToggleReassign] = useState(false);
  return (
    <div className="my-3">
      <section className="flex justify-around items-center gap-8 mb-4">
        <div className="flex flex-col gap-3">
          <img
            className="rounded-full shadow-xl shadow-neutral-100/15"
            src="https://randomuser.me/api/portraits/women/1.jpg"
            alt="user lastName"
          />
          {/* input type file pour l'ajout de la nouvelle photo */}
          <Link className="text-sm" to={"/"}>
            Changer la photo
          </Link>
        </div>
        <ul>
          <UserLi label="Nom" value={user.name} />
          <UserLi label="Rôle" value={user.role} />
          <UserLi label="Embauché depuis le" value={user.hiredAt} />
        </ul>
      </section>
      <section>
        <ul>
          <UserLi label="Email" value={user.email} icon={<EnvelopeIcon width={20}></EnvelopeIcon>} />
          <UserLi
            label="Status"
            value={
              <div className="flex gap-3">
                <p>Connecté</p>
                <div
                  className={`rounded-full mt-1 ml-2 w-3 h-3 p-2 ${user.status ? "bg-green-600" : "bg-red-600"}`}
                ></div>
              </div>
            }
          />
          <UserLi
            label="Affectation"
            value={
              user.lignes
                ? `Ligne${user.lignes.length == 1 ? "" : "s"} ${user.lignes.join(", ")}`
                : `Train ${user.train}`
            }
          />
        </ul>
      </section>
      <div className="flex flex-col gap-6 my-4 mx-auto">
        {/* boutton asignation: premiere étape affectations de la ligne puis assignation du trains */}

        <PrimaryButton
          type="button"
          handleOnCLick={() => {
            setToggleReassign(!toggleReassign);
          }}
          customClass="px-3"
        >
          Réasignations
        </PrimaryButton>

        {toggleReassign && (
          <div className=" border rounded bg-slate-900 p-3 flex flex-col">
            <button onClick={() => setToggleReassign(false)} aria-label="Fermer" className="relative ">
              {<XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />}
            </button>
            <SecondaryTitle customClass="mb-3">Ligne</SecondaryTitle>
            <div className="gap-3 flex-wrap center">
              {user.lignes.map((ligne) => (
                <PrimaryButton
                  type="button"
                  customClass="border 
              w-12"
                >
                  {ligne}
                </PrimaryButton>
              ))}
            </div>
          </div>
        )}
        <PrimaryButton type="submit">Nouveau message</PrimaryButton>
      </div>
    </div>
  );
};

export default User;
