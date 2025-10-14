import PrimaryTitle from "../../components/ui/PrimaryTitle";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { NavLink, useNavigate } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import PopUp from "../../components/ui/PopUp";
import { signin } from "../../api/auth.api";
import { signinSchema } from "../../types/formSchema/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { SigninInterface } from "../../types/interfaces/SignInterface";

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInterface>({ resolver: zodResolver(signinSchema) });

  const { isError, isPending, mutate } = useMutation({
    mutationFn: ({ email, password }: SigninInterface) => signin(email, password),
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
      <form onSubmit={handleSubmit(sendDataToBack)} className="authForm">
        <div className="card-border px-7 py-5">
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
