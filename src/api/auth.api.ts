import { getUsers } from "./user.api";

interface LoginResponceInterface {
  status: boolean;
  message: string;
  authtoken?: string;
  user?: string;
}

// ici on envoie pass et email au back qui nous retourn un object avec data{accessToken , refreshToken} et message
export const signin = async (email: string, password: string): Promise<LoginResponceInterface> => {
  // axios.post
  //if (!data) return message: "Connexion refusée"
  //stockage des tokens dans les cookies
  const users = await getUsers();
  const user = users.find((item) => item.email === email);

  if (user && user.password == password) {
    return { status: true, message: "Connexion établie", authtoken: "fake-token", user: user.lastName };
  }
  return { status: false, message: "Connexion refusée" };
};
