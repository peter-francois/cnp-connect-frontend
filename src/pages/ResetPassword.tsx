import { EnvelopeIcon } from "@heroicons/react/24/outline";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";

const ResetPassword = () => {
  return (
    <>
      <PrimaryTitle>Réinitialiser mot de passe</PrimaryTitle>

      <form className="flex flex-col max-h-96 max-w-96 w-full px-5 gap-20">
        <div className="card-border relative">
          <Input
            id="email"
            type="email"
            placeholder="Veuillez rentrer votre email"
            label="Email"
            icon={<EnvelopeIcon width={20} />}
          />
        </div>
        <PrimaryButton>Envoyer</PrimaryButton>
      </form>
    </>
  );
};

export default ResetPassword;
