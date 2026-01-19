import { Link, useNavigate } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryTitle from "../../components/ui/PrimaryTitle";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PopUp from "../../components/ui/PopUp";
import { signinSchema, type UseFormSigninIn } from "../../types/formSchema/signinSchema";
import TextInput from "../../components/ui/TextInput";
import { useAuthService } from "../../hooks/useAuthService";
import { AxiosError } from "axios";

const SigninPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });
  const { signin } = useAuthService();
  const { mutate, isError, isPending } = signin();

  const onValidate: SubmitHandler<UseFormSigninIn> = (data): void => {
    const email = data.email;
    const password = data.password;

    mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          const accessToken = data.data.accessToken
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            navigate("/utilisateurs");
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) console.log("onError", error);
        },
      }
    );
  };

  return (
    <>
      <PrimaryTitle>Connexion</PrimaryTitle>
      <form onSubmit={handleSubmit(onValidate)} className="authForm" noValidate>
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

        {isError && (
          <PopUp customClass="bg-red-700/40 border-red-700">L'email et/ou le mot de passe est incorrect !</PopUp>
        )}

        {isPending && <p>Connection...</p>}
        <PrimaryButton data_cy="data-submit-signin" type="submit">
          Se connecter
        </PrimaryButton>
      </form>
    </>
  );
};

export default SigninPage;
