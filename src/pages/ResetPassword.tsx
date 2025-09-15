import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import { useNavigate } from "react-router";
import { schemaResetPassword, type UseFormResetPassword } from "../types/formData/resetPassword";
import { getUsers } from "../api/user";
import { useState } from "react";
import PopUp from "../components/utils/PopUp";
import type { UserInterface } from "../interfaces/UsersInterface";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isValided, setIsValided] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaResetPassword),
  });
  const onValidate: SubmitHandler<UseFormResetPassword> = async (data) => {
    const users = await getUsers();
    const userByMail = users.find((u) => u.email === data.email);

    const token = "1950";

    if (userByMail) {
      setIsValided(true);
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

      <form className="form" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border relative">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Veuillez rentrer votre email"
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />
        </div>
        {isValided && (
          <PopUp customClass="flex-col">
            <p className="w-full">Merci {user && user.firstName} !</p>
            <p className="w-full">Tu vas recevoir un email afin que tu puisse changer ton mot de passe.</p>
          </PopUp>
        )}
        <PrimaryButton type="submit">Envoyer</PrimaryButton>
      </form>
    </>
  );
};

export default ResetPassword;
