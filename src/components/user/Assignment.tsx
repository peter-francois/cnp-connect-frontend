import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../ui/SecondaryTitle";
import PrimaryButton from "../ui/PrimaryButton";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AssignmentInterface {
  currentUserRole: UserRolesEnum;
  lines: LineInterface[];
}

const Assignment = ({ currentUserRole, lines }: AssignmentInterface) => {
  const [toggleReassign, setToggleReassign] = useState(false);
  if (currentUserRole === UserRolesEnum.supervisor) {
    return null;
  }
  
  return (
    <>
      <PrimaryButton type="button" handleOnCLick={() => setToggleReassign(!toggleReassign)} customClass="px-3">
        Réasignations
      </PrimaryButton>
      {toggleReassign && (
        <div className="border rounded bg-slate-900 p-3 flex flex-col">
          {/* ici ce doit étre une form car je vais envoyé les donné au back useform et zod */}
          <button onClick={() => setToggleReassign(false)} aria-label="Fermer" className="relative ">
            <XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />
          </button>
          {currentUserRole == UserRolesEnum.conductor && (
            <SecondaryTitle customClass="mb-3 center">Sélectionnez une ligne puis un train</SecondaryTitle>
          )}

          <SecondaryTitle customClass="mb-3">Lignes</SecondaryTitle>
          <div className="gap-3 flex-wrap center">
            {lines.map((line) => (
              <PrimaryButton
                key={line.id}
                type="button"
                customClass="border w-12 focus:outline-none focus:ring focus:border-blue-300 focus:bg-indigo-900"
              >
                {line.name}
              </PrimaryButton>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Assignment;
