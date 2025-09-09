import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import { NavLink } from "react-router";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const ConnectionPage = () => {
  return (
    <>
      <PrimaryTitle>Connexion</PrimaryTitle>
      <form className="flex flex-col max-h-96 max-w-96 w-full px-5 gap-20">
        <div className="card-border ">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Adresse email"
            customClass="mt-0 mb-10"
            icon={<EnvelopeIcon width={20} />}
          />
          <Input
            id="password"
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            customClass="mt-0 mb-0"
            icon={<LockClosedIcon width={20} />}
          />
          <NavLink to="/" className="text-xs">
            Mot de passe oulié?{" "}
          </NavLink>
        </div>
        <PrimaryButton>Se connecter</PrimaryButton>
      </form>
    </>
  );
};

export default ConnectionPage;
