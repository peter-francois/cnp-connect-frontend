import { useForm, type SubmitHandler } from "react-hook-form";
import Textarea from "../../components/ui/Textarea";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigate } from "react-router";
import { type UseFormNewAlert, newAlertSchema } from "../../types/formSchema/newAlertSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Priority from "../../components/alert/Priority";
import { useMutation } from "@tanstack/react-query";
import type { AlertInterface } from "../../types/interfaces/AlertInterface";
import { addAlert } from "../../api/alert.api";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import LinesList from "../../components/ui/LinesList";

const AlerCreatetPage = () => {
  const navigate = useNavigate();
  const currentUserRole: UserRolesEnum = UserRolesEnum.conductor;
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

  //submit and form validate = use createAlertMutation with data
  const onValidate: SubmitHandler<UseFormNewAlert> = (data) => {
    console.log(data);
    createAlertMutation.mutate(data);
  };

  //Fonction useMatation params (data) = Content + Priority + LinesList
  const createAlertMutation = useMutation({
    mutationFn: (data: AlertInterface) => addAlert(data),
    onSuccess: () => {
      navigate("/utilisateurs");
    },
  });

  return (
    <form onSubmit={handleSubmit(onValidate)}>
      <Textarea
        id="content"
        placeholder="Decrivez-l'alerte"
        register={register}
        errors={errors}
        rows={5}
        textAreaCustomClass="px-5 py-3"
      />
      <div className="w-full flex justify-between my-5">
        <Priority
          name="priority"
          priority="soft"
          register={register}
          label="Soft"
          isSelected={selectedPriority === "soft"}
        />
        <Priority
          name="priority"
          priority="medium"
          register={register}
          label="Medium"
          isSelected={selectedPriority === "medium"}
        />
        <Priority
          name="priority"
          priority="urgent"
          register={register}
          label="Urgent"
          isSelected={selectedPriority === "urgent"}
        />
      </div>
      <LinesList
        register={register}
        type="checkbox"
        authenticateUserRole={currentUserRole}
        isAlerts={true}
        registerError={errors}
      />
      <div className="w-full flex justify-center">
        <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
          Envoyer
        </PrimaryButton>
      </div>
    </form>
  );
};

export default AlerCreatetPage;
