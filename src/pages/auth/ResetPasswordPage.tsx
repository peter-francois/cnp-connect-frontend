import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useNavigate } from "react-router";
import { resetPasswordSchema, type UseFormResetPassword } from "../../types/formSchema/resetPasswordSchema";
import { getUsers } from "../../api/user.api";
import { useState } from "react";
import PopUp from "../../components/ui/PopUp";
import type { UserInterface } from "../../types/interfaces/UserInterface";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [isValided, setIsValided] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const token = "1950";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onValidate: SubmitHandler<UseFormResetPassword> = async (data) => {
    // @dev ici on va envoyé en post l'adresse email dans le back,
    //  on affiche la popup pour l'utilisateur puis tempo 5s et
    // redirect vers /signin
    const users = await getUsers();
    const userByMail = users.find((u) => u.email === data.email);
    setIsValided(true);

    if (userByMail) {
      setUser(userByMail);
      const navigation = () => {
        navigate("/nouveau-mot-de-passe", { state: { user, token } });
      };
      setTimeout(navigation, 4000);
    }
    console.log(user);
  };

  return (
    <>
      <PrimaryTitle>Réinitialiser mot de passe</PrimaryTitle>

      <form className="authForm" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border relative px-7 py-5">
          <Input
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
