import { useForm, type SubmitHandler } from "react-hook-form";
import Textarea from "../../components/ui/Textarea";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigate } from "react-router";
import { type UseFormNewAlert, newAlertSchema } from "../../types/formSchema/newAlertSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Priority from "../../components/alert/Priority";
import { PriorityEnum, UserRolesEnum } from "../../types/enum/UserEnum";
import LinesList from "../../components/ui/LinesList";
import { useAlertService } from "../../hooks/useAlertService";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";

const AlertCreatePage = () => {
  const navigate = useNavigate();
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newAlertSchema),
  });
  const selectedPriority = watch("priority");
  // @dev mettre un store zustand pour le texte de l'alerte
  const { newAlert } = useAlertService();
  const { mutate } = newAlert();

  if (!me) return null;
  const currentUserRole: UserRolesEnum = me.role;

  //submit and form validate = use createAlertMutation with data
  const onValidate: SubmitHandler<UseFormNewAlert> = (data): void => {
    mutate(data, {
      onSuccess: () => {
        navigate("/utilisateurs");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValidate)}
      aria-labelledby="alert-form-title"
      aria-describedby="alert-form-description"
    >
      <h2 id="alert-form-title" className="sr-only">
        Création d’une alerte
      </h2>

      <p id="alert-form-description" className="sr-only">
        Formulaire permettant de créer une alerte avec priorité et lignes concernées
      </p>

      <Textarea
        id="content"
        placeholder="Decrivez l'alerte"
        register={register}
        errors={errors}
        rows={5}
        textAreaCustomClass="px-5 py-3 outline-indigo-600"
      />

      <fieldset>
        <legend className="sr-only">Niveau de priorité</legend>
        <div className="w-full flex justify-between my-5" role="radiogroup">
          <Priority
            name="priority"
            priority={PriorityEnum.SOFT}
            register={register}
            label="Soft"
            isSelected={selectedPriority === PriorityEnum.SOFT}
          />
          <Priority
            name="priority"
            priority={PriorityEnum.MEDIUM}
            register={register}
            label="Medium"
            isSelected={selectedPriority === PriorityEnum.MEDIUM}
          />
          <Priority
            name="priority"
            priority={PriorityEnum.URGENT}
            register={register}
            label="Urgent"
            isSelected={selectedPriority === PriorityEnum.URGENT}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Sélectionnez les lignes</legend>
        <LinesList
          register={register}
          type="checkbox"
          authenticateUserRole={currentUserRole}
          isAlerts={true}
          registerError={errors}
        />
      </fieldset>

      <div className="w-full flex justify-center">
        <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
          Envoyer
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AlertCreatePage;
