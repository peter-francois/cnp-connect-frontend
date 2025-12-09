import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { forgotPasswordSchema, type UseFormForgotPassword } from "../../types/formSchema/forgotPasswordSchema";
import { useState } from "react";
import PopUp from "../../components/ui/PopUp";
import TextInput from "../../components/ui/TextInput";
import { useAuthService } from "../../hooks/useAuthService";

const ForgotPasswordPage = () => {
  const [isValided, setIsValided] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { forgotPassword } = useAuthService();
  const { mutate } = forgotPassword();

  const onValidate: SubmitHandler<UseFormForgotPassword> = async (data) => {
    mutate(
      { email: data.email },
      {
        onSettled: () => {
          setIsValided(true);
        },
      }
    );
  };

  return (
    <>
      <PrimaryTitle>Réinitialiser mot de passe</PrimaryTitle>

      <form className="authForm" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border relative px-7 py-5">
          <TextInput
            label="Email"
            id="email"
            type="email"
            placeholder="Veuillez rentrer votre email..."
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />
        </div>

        {isValided && (
          <PopUp customClass="flex-col bg-green-700/40 border-green-700">
            <p className="w-full">
              Si vous avez un compte, un e-mail de réinitialisation de mot de passe a été envoyé.
            </p>
          </PopUp>
        )}

        <PrimaryButton type="submit">Envoyer</PrimaryButton>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
