import { getUsers } from "./user.api";

interface LoginResponceInterface {
  status: boolean;
  message: string;
  authtoken?: string;
  user?: string;
}

export const Connection = async (email: string, password: string): Promise<LoginResponceInterface> => {
  const users = await getUsers();
  const user = users.find((item) => item.email === email);
  if (user && user.password == password) {
    return { status: true, message: "Connexion établie", authtoken: "fake-token", user: user.lastName };
  }
  return { status: false, message: "Connexion refusée" };
};
