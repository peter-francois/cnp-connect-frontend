import LinesList from "../../components/alert/LinesList";
import { useForm, type SubmitHandler } from "react-hook-form";
import Textarea from "../../components/alert/Textarea";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { useNavigate } from "react-router";
import { type UseFormNewAlert, schemaNewAlert } from "../../types/formData/newAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import Priority from "../../components/alert/Priority";

const NouvelleAlerte = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaNewAlert),
  });
  const selectedPriority = watch("priority");
  const onValidate: SubmitHandler<UseFormNewAlert> = (data) => {
    console.log(data);

    // navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValidate)}>
        <Textarea id="content" placeholder="Decrivez-l'alerte" register={register} errors={errors} />
        <div className="w-full flex justify-between my-7">
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

        <PrimaryButton type="submit">Envoyer</PrimaryButton>
      </form>
    </div>
  );
};

export default NouvelleAlerte;
