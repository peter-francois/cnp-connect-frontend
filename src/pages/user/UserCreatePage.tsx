import PrimaryTitle from "../../components/ui/PrimaryTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { createUserSchema, type UseFormCreateUser } from "../../types/formSchema/createUserSchema";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Label from "../../components/ui/Label";
import RadioInput from "../../components/ui/RadioInput";
import ErrorMessage from "../../components/ui/ErrorMessage";
import TextInput from "../../components/ui/TextInput";
import { useUserService } from "../../hooks/useUserService";
import { UserRolesEnum } from "../../types/enum/UserEnum";
import PopUp from "../../components/ui/PopUp";
import { useState } from "react";
import { Link } from "react-router";
import { menuLinks } from "../../utils/links";
import { generate } from "generate-password-browser";

const UserCreatePage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const selectedRole = watch("role");
  const { createUser } = useUserService();
  const { mutate } = createUser();

  const onValidate: SubmitHandler<UseFormCreateUser> = (data) => {
    const password = generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    const { email, firstName, lastName, role } = data;

    mutate(
      {
        email,
        firstName,
        lastName,
        role,
        password,
        hiredAt: new Date(),
      },
      { onSuccess: () => setIsSuccess(true), onError: () => setIsSuccess(false) }
    );
  };

  return (
    <>
      <PrimaryTitle customClass="text-center">Nouvel utilisateur</PrimaryTitle>

      <form className="authForm self-center" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border px-7 py-5">
          <TextInput
            id="lastName"
            label="Nom"
            type="text"
            placeholder="Nom..."
            register={register}
            errors={errors}
            icon={<UserIcon width={20} />}
          />
          <TextInput
            id="firstName"
            label="Prénom"
            type="text"
            placeholder="Prénom..."
            register={register}
            errors={errors}
            icon={<UserIcon width={20} />}
          />
          <TextInput
            id="email"
            label="Email"
            type="email"
            placeholder="Email..."
            register={register}
            errors={errors}
            icon={<EnvelopeIcon width={20} />}
          />

          <div>
            <div className="center gap-2">
              <Label
                htmlFor={UserRolesEnum.COORDINATOR}
                label="Coordinateur"
                isSelected={selectedRole === UserRolesEnum.COORDINATOR}
              />
              <RadioInput id={UserRolesEnum.COORDINATOR} register={register} name="role" />

              <Label
                htmlFor={UserRolesEnum.DRIVER}
                label="Conducteur"
                isSelected={selectedRole === UserRolesEnum.DRIVER}
              />
              <RadioInput id={UserRolesEnum.DRIVER} register={register} name="role" />
            </div>

            <ErrorMessage id="role" errors={errors} customClass="mt-1" />
          </div>
        </div>

        {isSuccess !== undefined && (
          <PopUp
            customClass={`${
              isSuccess ? "bg-green-700/40 border-green-700" : "bg-red-700/40 border-red-700"
            } flex flex-col gap-5`}
          >
            {isSuccess ? (
              <>
                <p>Utilisateur créer !</p>

                <div className="flex flex-col center gap-2">
                  <p>
                    Cliquez sur ce lien pour aller vers tous les utilisateurs :<span className="mx-1"></span>
                    <Link to={menuLinks.items.users.path} className="font-bold contents">
                      Cliquez ici
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <p>Impossible de créer cet utilisateur !</p>
            )}
          </PopUp>
        )}

        <PrimaryButton type="submit">Ajouter</PrimaryButton>
      </form>
    </>
  );
};

export default UserCreatePage;
