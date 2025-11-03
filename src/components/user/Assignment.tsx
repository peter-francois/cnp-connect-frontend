import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../ui/SecondaryTitle";
import PrimaryButton from "../ui/PrimaryButton";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { LineInterface } from "../../types/interfaces/LineInterface";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newAssigmentCoordinatorSchema,
  type UseFormAssigmentCoordinator,
} from "../../types/formSchema/newAssigmentCoordinatorSchema";
import {
  newAssigmentConductorSchema,
  type UseFormNewAssigmentConductorSchema,
} from "../../types/formSchema/newAssigmentConductorSchema";
import { useMutation } from "@tanstack/react-query";
import { update } from "../../api/user.api";
import LinesList from "../ui/LinesList";
import TrainsList from "../ui/TrainsList";

interface AssignmentInterface {
  currentUserRole: UserRolesEnum;
}

const Assignment = ({ currentUserRole }: AssignmentInterface) => {
  const [toggleReassign, setToggleReassign] = useState(false);
  const [selectedLine, setSelectedLine] = useState<LineInterface[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      currentUserRole === UserRolesEnum.conductor ? newAssigmentConductorSchema : newAssigmentCoordinatorSchema
    ),
  });

  const onValidate: SubmitHandler<UseFormAssigmentCoordinator | UseFormNewAssigmentConductorSchema> = (data) => {
    assignment.mutate(data);
  };

  const handleSelectedLineFromChild = (data: LineInterface[] | []) => {
    setSelectedLine(data);
  };
  const assignment = useMutation({
    mutationFn: (data: UseFormAssigmentCoordinator | UseFormNewAssigmentConductorSchema) => update(data),
    onSuccess: (data) => {
      console.log("success", data);
    },
  });

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
          <button onClick={() => setToggleReassign(false)} aria-label="Fermer" className="relative ">
            <XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />
          </button>
          <form onSubmit={handleSubmit(onValidate)}>
            {currentUserRole == UserRolesEnum.conductor ? (
              <>
                <SecondaryTitle customClass="mb-3 center">Sélectionnez une ligne puis un train</SecondaryTitle>
                <LinesList
                  register={register}
                  type="radio"
                  currentUserRole={currentUserRole}
                  handleSelectedLineFromChild={handleSelectedLineFromChild}
                  isAlerts={false}
                  registerError={errors}
                />
                {selectedLine.length == 1 && (
                  <TrainsList register={register} type="radio" line={selectedLine[0]} registerError={errors} />
                )}
              </>
            ) : (
              <>
                <SecondaryTitle customClass="mb-3">Sélectionnez une ou plusieurs lignes</SecondaryTitle>
                <LinesList
                  register={register}
                  type="checkbox"
                  currentUserRole={currentUserRole}
                  isAlerts={false}
                  registerError={errors}
                />
              </>
            )}
            <div className="w-full flex justify-center">
              <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
                Envoyer
              </PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Assignment;
