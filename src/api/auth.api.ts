import type { ResponseInterface, ResponseInterfaceMessage } from "../types/interfaces/responseInterface.types";
import type { SafeUserInterface } from "../types/interfaces/UserInterface";
import { axiosClient } from "../utils/axiosClient";

const api = axiosClient();

interface SigninInterface {
  email: string;
  password: string;
}

export const signinApi = async (email: string, password: string): Promise<ResponseInterface<string>> => {
  const body: SigninInterface = { email, password };
  const { data } = await api.post<ResponseInterface<string>>("/auth/signin", body);
  return data;
};

export const signoutApi = async (): Promise<void> => {
  await api.post("/auth/signout");
};

export const resetPasswordAuthApi = async (
  token: string,
  password: string,
  confirmPassword: string
): Promise<ResponseInterfaceMessage> => {
  const res = await api.post<ResponseInterfaceMessage>("/auth/reset-password", {
    token,
    password,
    confirmPassword,
  });

  return res.data;
};

export const forgotPasswordAuthApi = async (email: string): Promise<void> => {
  const body = { email };
  await api.post("/auth/forgot-password", body);
};

export const meApi = async (): Promise<SafeUserInterface> => {
  const { data } = await api.get("/auth/me");
  return data.data.user;
};
