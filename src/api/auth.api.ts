import { useApi } from "../hooks/useApi";

const api = useApi();

interface SigninInterface {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export const signin = async (email: string, password: string): Promise<AuthResponse> => {
  const body: SigninInterface = { email, password };
  const { data } = await api.post<AuthResponse>("/auth/signin", body);
  return data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  const body = { email };
  await api.post("/auth/forgot-password", body);
  
}
