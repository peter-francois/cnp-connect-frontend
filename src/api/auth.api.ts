import { useApi } from "../hooks/useApi";
import { getUsers } from "./user.api";

interface LoginResponceInterface {
  accessToken: string;
  refreshToken: string;
}
const api = useApi();

interface SigninInterface {
  email: string;
  password: string;
}

// ici on envoie pass et email au back qui nous retourn un object avec data{accessToken , refreshToken} et message
// export const signin = async (email: string, password: string): Promise<LoginResponceInterface> => {
//   // axios.post
//   //if (!data) return message: "Connexion refusée"
//   //stockage des tokens dans les cookies
//   const users = await getUsers();
//   const user = users.find((item) => item.email === email);

//   if (user && user.password == password) {
//     return { status: true, message: "Connexion établie", authtoken: "fake-token", user: user.lastName };
//   }
//   return { status: false, message: "Connexion refusée" };
// };

export interface AuthResponse {
  // user: {
  //   id: string;
  //   email: string;
  //   firstName: string;
  //   lastName: string;
  // };
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export const signin = async (email: string, password: string): Promise<AuthResponse> => {
  const body: SigninInterface = { email, password };

  try {
    const { data } = await api.post<AuthResponse>("/auth/signin", body);
    console.log(data);
    return data;
  } catch (error) {
    // @dev a voir si c'est ok avec un formateur
    console.log(error.response.data.message);
    throw new Error(error.message);
  }
};
