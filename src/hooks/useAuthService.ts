import { useMutation, useQuery } from "@tanstack/react-query";
import type { ResetPasswordInterface } from "../types/interfaces/auth/ResetPasswordInterface";
import { forgotPasswordAuthApi, resetPasswordAuthApi, signinApi, meApi } from "../api/auth.api";
import type { UseFormForgotPassword } from "../types/formSchema/forgotPasswordSchema";
import type { SigninInterface } from "../types/interfaces/auth/SignInterface";

export const useAuthService = () => {
  const ResetPassword = () =>
    useMutation({
      mutationFn: ({ token, password, confirmPassword }: ResetPasswordInterface) =>
        resetPasswordAuthApi(token, password, confirmPassword),
    });

  const ForgotPassword = () =>
    useMutation({
      mutationFn: (data: UseFormForgotPassword) => forgotPasswordAuthApi(data.email),
    });

  const Signin = () =>
    useMutation({
      mutationFn: ({ email, password }: SigninInterface) => signinApi(email, password),
    });

  const Me = () =>
    useQuery({
      queryKey: ["me"],
      queryFn: () => meApi(),
      staleTime: Infinity, // recharge que si on refresh la page
      retry: false, // evite la boucle infiny si unauthorize
    });

  return { resetPassword: ResetPassword, forgotPassword: ForgotPassword, signin: Signin, me: Me };
};
