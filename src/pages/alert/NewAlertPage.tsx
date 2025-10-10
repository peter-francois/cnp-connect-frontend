import LinesList from "../../components/alert/LinesList";
import { useForm, type SubmitHandler } from "react-hook-form";
import Textarea from "../../components/utils/Textarea";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { useNavigate } from "react-router";
import { type UseFormNewAlert, newAlertSchema } from "../../types/formData/newAlertSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Priority from "../../components/alert/Priority";
import { useMutation } from "@tanstack/react-query";
import type { AlertInterface } from "../../types/interfaces/AlertInterface";
import { addAlert } from "../../api/alert.api";

const NewAlertPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newAlertSchema),
  });

  const selectedPriority = watch("priority");

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
    <div>
      <form onSubmit={handleSubmit(onValidate)}>
        <Textarea id="content" placeholder="Decrivez-l'alerte" register={register} errors={errors} />
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

        <LinesList register={register} />
        <div className="w-full flex justify-center">
          <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
            Envoyer
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default NewAlertPage;
