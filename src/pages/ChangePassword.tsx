import Input from "../components/utils/Input";
import PrimaryButton from "../components/utils/PrimaryButton";
import PrimaryTitle from "../components/utils/PrimaryTitle";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const ChangePassword = () => {
  return (
    // <div className="flex flex-col items-center justify-evenly min-h-screen">
    <>
      <PrimaryTitle>Changer le mot de passe</PrimaryTitle>

      <form className="flex flex-col flex-1 justify-around max-h-80 h-full">
        <div className="w-full border border-indigo-600 rounded-2xl px-8 py-4">
          <label htmlFor="new-password" className="font-bold">
            Nouveau mot de passe
          </label>

          <div className="flex">
            <LockClosedIcon width={20} className="absolute" />
            <input id="new-password" type="password" className="w-full outline outline-gray-500 rounded-md" />
          </div>

          {/* <Input id="confirm-password" label="Confirmer mot de passe" type="password" errors={false} /> */}
        </div>

        <PrimaryButton>Confirmer</PrimaryButton>
      </form>
    </>
  );
};

export default ChangePassword;
