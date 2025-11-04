import { LockClosedIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

import PrimaryButton from "../../components/ui/PrimaryButton";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import { resetPasswordSchema, type UseFormResetPassword } from "../../types/formSchema/resetPasswordSchema";
import TextInput from "../../components/ui/TextInput";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onValidate: SubmitHandler<UseFormResetPassword> = (data) => {
    if (data.newPassword === data.confirmPassword) navigate("/signin");
  };

  return (
    <>
      <PrimaryTitle>Changer le mot de passe</PrimaryTitle>

      <form className="authForm" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border px-7 py-5">
          <TextInput
            id="newPassword"
            label="Nouveau mot de passe"
            type="password"
            placeholder="Nouveau mot de passe..."
            register={register}
            errors={errors}
            icon={<LockClosedIcon width={20} />}
          />

          <TextInput
            id="confirmPassword"
            label="Confirmer mot de passe"
            type="password"
            placeholder="Confirmer mot de passe..."
            register={register}
            errors={errors}
            icon={<LockClosedIcon width={20} />}
          />
        </div>

        <PrimaryButton type="submit">Confirmer</PrimaryButton>
      </form>
    </>
  );
};

export default ResetPasswordPage;
