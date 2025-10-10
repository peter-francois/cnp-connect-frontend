import PrimaryTitle from "../../components/utils/PrimaryTitle";
import Input from "../../components/utils/Input";
import PrimaryButton from "../../components/utils/PrimaryButton";
import { NavLink, useNavigate } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import PopUp from "../../components/utils/PopUp";
import { Connection } from "../../api/auth.api";
import { signinSchema } from "../../types/formData/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

export interface SigninInterface {
  email: string;
  password: string;
}

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInterface>({ resolver: zodResolver(signinSchema) });

  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ email, password }: SigninInterface) => Connection(email, password),
    onSuccess: (data) => {
      if (data.status && data.authtoken) {
        localStorage.setItem("token", data.authtoken);
        navigate("/utilisateurs");
      }
    },
    onError: (data) => {
      console.log(data.message);
    },
  });

  const sendDataToBack = (data: SigninInterface): void => {
    const email = data.email;
    const password = data.password;
    mutate({ email, password });
  };

  return (
    <>
      <PrimaryTitle>Connexion</PrimaryTitle>
      <form onSubmit={handleSubmit(sendDataToBack)} className="form">
        <div className="card-border ">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Adresse email"
            customClass="mt-0 mb-10"
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            customClass="mt-0 mb-0"
            register={register}
            errors={errors}
            icon={<LockClosedIcon width={20} />}
          />
          <NavLink to="/" className="text-xs">
            Mot de passe oulié?{" "}
          </NavLink>
        </div>
        {isError && <PopUp>L'email et/ou le mot de passe est incorrect !</PopUp>}
        <PrimaryButton type="submit">Se connecter</PrimaryButton>
        {isPending && <span>Connection...</span>}
      </form>
    </>
  );
};

export default SigninPage;
