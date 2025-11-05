import { XCircleIcon } from "@heroicons/react/24/solid";
import SecondaryTitle from "../ui/SecondaryTitle";
import PrimaryButton from "../ui/PrimaryButton";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import type { LineInterface } from "../../types/interfaces/line/LineInterface";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newAssigmentCoordinatorSchema,
  type UseFormAssigmentCoordinator,
} from "../../types/formSchema/newAssigmentCoordinatorSchema";
import {
  newAssigmentDriverSchema,
  type UseFormNewAssigmentDriverSchema,
} from "../../types/formSchema/newAssigmentDriverSchema";
import { useMutation } from "@tanstack/react-query";
import { update } from "../../api/user.api";
import LinesList from "../ui/LinesList";
import TrainsList from "../ui/TrainsList";

interface AssignmentInterface {
  selectedUserRole: UserRolesEnum;
  authenticateUserRole: UserRolesEnum;
}

const Assignment = ({ selectedUserRole, authenticateUserRole }: AssignmentInterface) => {
  const [toggleReassign, setToggleReassign] = useState(false);
  const [selectedLine, setSelectedLine] = useState<LineInterface[]>([]);
  const isDriver: boolean = selectedUserRole === UserRolesEnum.DRIVER;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isDriver ? newAssigmentDriverSchema : newAssigmentCoordinatorSchema),
  });

  const onValidate: SubmitHandler<UseFormAssigmentCoordinator | UseFormNewAssigmentDriverSchema> = (data) => {
    assignment.mutate(data);
  };

  const handleSelectedLineFromChild = (data: LineInterface[] | []) => {
    setSelectedLine(data);
  };

  const assignment = useMutation({
    mutationFn: (data: UseFormAssigmentCoordinator | UseFormNewAssigmentDriverSchema) => {
      console.log(data);
      update(data);
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  const toogleAssignment = () => {
    if (toggleReassign) {
      setToggleReassign(false);
      setSelectedLine([]);
      reset();
    }
    setToggleReassign(!toggleReassign);
  };

  if (selectedUserRole === UserRolesEnum.SUPERVISOR) return null;

  return (
    <>
      <PrimaryButton type="button" handleOnCLick={() => toogleAssignment()} customClass="px-3">
        Réasignations
      </PrimaryButton>

      {toggleReassign && (
        <div className="border rounded bg-slate-900 p-3 flex flex-col">
          {/* @dev changé pour le close boutton de Nico */}
          <button onClick={() => toogleAssignment()} aria-label="Fermer" className="relative ">
            <XCircleIcon width={30} className="cursor-pointer absolute -top-7 -left-7" />
          </button>

          <form onSubmit={handleSubmit(onValidate)}>
            <SecondaryTitle customClass="mb-3 center">
              {isDriver ? "Sélectionnez une ligne" : "Sélectionnez une ou plusieurs lignes"}
            </SecondaryTitle>

            <LinesList
              register={register}
              type={isDriver ? "radio" : "checkbox"}
              authenticateUserRole={authenticateUserRole}
              selectedUserRole={selectedUserRole}
              handleSelectedLineFromChild={isDriver ? handleSelectedLineFromChild : () => null}
              isAlerts={false}
              registerError={errors}
            />

            {selectedLine.length == 1 && isDriver && (
              <>
                <SecondaryTitle customClass="my-3 center">Sélectionnez un train</SecondaryTitle>
                <TrainsList register={register} type="radio" line={selectedLine[0]} registerError={errors} />
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
