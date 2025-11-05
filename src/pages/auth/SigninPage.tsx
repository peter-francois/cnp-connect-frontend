import { Link, useNavigate } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PopUp from "../../components/ui/PopUp";
import type { SigninInterface } from "../../types/interfaces/auth/SignInterface";
import { signin } from "../../api/auth.api";
import { signinSchema } from "../../types/formSchema/signinSchema";
import TextInput from "../../components/ui/TextInput";

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
      const tokens = data.data;

      if (tokens.accessToken && tokens.refreshToken) {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        console.log(data.message);
        navigate("/utilisateurs");
      }
    },

    // @dev voir si la gestion d'erreur avec l'intercepteur de reponse sera suffisant pour gérer tous les cas
    onError: (error) => {
      console.log("onError", error.response.data.message);
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
          <TextInput
            id="email"
            type="email"
            label="Email"
            placeholder="Adresse email"
            customClass="mb-10"
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />

          <div className="mb-5">
            <TextInput
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="Mot de passe"
              customClass="mb-1"
              register={register}
              errors={errors}
              icon={<LockClosedIcon width={20} />}
            />
            <Link to="/reinitialisation-mot-passe" className="text-xs">
              Mot de passe oulié ?
            </Link>
          </div>
        </div>

        {isError && <PopUp>L'email et/ou le mot de passe est incorrect !</PopUp>}
        {isPending && <p>Connection...</p>}
        <PrimaryButton type="submit">Se connecter</PrimaryButton>
      </form>
    </>
  );
};

export default SigninPage;
