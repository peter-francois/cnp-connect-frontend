import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { ResetPasswordInterface } from "../types/interfaces/auth/ResetPasswordInterface";
import { resetPassword } from "../api/auth.api";
import type { ResponseInterfaceMessage } from "../types/interfaces/responseInterface.types";

class AuthService {
  resetPassword(): UseMutationResult<ResponseInterfaceMessage, Error, ResetPasswordInterface> {
    return useMutation({
      mutationFn: ({ token, password, confirmPassword }) => resetPassword(token, password, confirmPassword),
    });
  }
}

export const authService = new AuthService();
