import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const ChangePassword = () => {
  return (
    <>
      <PrimaryTitle>Changer le mot de passe</PrimaryTitle>

      <form className="form">
        <div className="card-border">
          <Input
            id="new-password"
            label="Nouveau mot de passe"
            type="password"
            placeholder="Nouveau mot de passe"
            icon={<LockClosedIcon width={20} />}
          />
          <Input
            id="confirm-password"
            label="Confirmer mot de passe"
            type="password"
            placeholder="Confirmer mot de passe"
            icon={<LockClosedIcon width={20} />}
          />
        </div>

        <PrimaryButton>Confirmer</PrimaryButton>
      </form>
    </>
  );
};

export default ChangePassword;
