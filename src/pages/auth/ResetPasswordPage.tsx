import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { resetPasswordSchema, type UseFormResetPassword } from "../../types/formSchema/resetPasswordSchema";
import { useState } from "react";
import PopUp from "../../components/ui/PopUp";
import { useMutation } from "@tanstack/react-query";
import TextInput from "../../components/ui/TextInput";
import {forgotPassword} from "../../api/auth.api";

const ResetPasswordPage = () => {
  const [isValided, setIsValided] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onValidate: SubmitHandler<UseFormResetPassword> = async (data) => {
    // @dev ici on va envoyé en post l'adresse email dans le back,
    createMutation.mutate(data);
  };
  const createMutation = useMutation({
    mutationFn: (data: UseFormResetPassword) => forgotPassword(data.email),

    onSettled: () => {
      //  on affiche la popup pour l'utilisateur puis tempo 5s et
      setIsValided(true);
      // redirect vers /changer-mot-de-passe
    },
  });

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
          <PopUp customClass="flex-col">
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

export default ResetPasswordPage;
