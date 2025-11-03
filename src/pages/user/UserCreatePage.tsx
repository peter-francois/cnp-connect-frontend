import PrimaryTitle from "../../components/ui/PrimaryTitle";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import { createUserSchema, type UseFormCreateUser } from "../../types/formSchema/createUserSchema";
import PrimaryButton from "../../components/ui/PrimaryButton";
import Label from "../../components/ui/Label";
import RadioInput from "../../components/ui/RadioInput";
import ErrorMessage from "../../components/ui/ErrorMessage";

const UserCreatePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const selectedRole = watch("role");

  const onValidate: SubmitHandler<UseFormCreateUser> = (data) => {
    console.log(data);
  };

  return (
    <>
      <PrimaryTitle customClass="text-center">Nouvel utilisateur</PrimaryTitle>

      <form className="authForm self-center" onSubmit={handleSubmit(onValidate)}>
        <div className="card-border px-7 py-5">
          <Input
            id="lastname"
            label="Nom"
            type="text"
            placeholder="Nom..."
            register={register}
            errors={errors}
            icon={<UserIcon width={20} />}
          />
          <Input
            id="firstname"
            label="Prénom"
            type="text"
            placeholder="Prénom..."
            register={register}
            errors={errors}
            icon={<UserIcon width={20} />}
          />
          <Input
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
              <Label htmlFor="coordinator" label="Coordinateur" isSelected={selectedRole === "coordinator"} />
              <RadioInput id="coordinator" register={register} name="role" />

              <Label htmlFor="driver" label="Conducteur" isSelected={selectedRole === "driver"} />
              <RadioInput id="driver" register={register} name="role" />
            </div>

            <ErrorMessage id="role" errors={errors} customClass="mt-1" />
          </div>
        </div>

        <PrimaryButton type="submit">Ajouter</PrimaryButton>
      </form>
    </>
  );
};

export default UserCreatePage;
