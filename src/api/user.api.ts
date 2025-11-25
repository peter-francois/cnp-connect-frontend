import {
  type SafeUserWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type createUserInterface,
} from "../types/interfaces/UserInterface";
import { UserRolesEnum } from "../types/enum/UserEnum";
import { axiosClient } from "../utils/axiosClient";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";

const url = "/data/user.json";
const api = axiosClient();

export const getUsers = async (): Promise<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>> => {
  const { data } = await api.get<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>>("users");
  return data;
};

export const getUsersById = async (id: string): Promise<SafeUserWithLinesAndTrainsInterface> => {
  const { data } = await api.get<SafeUserWithLinesAndTrainsInterface>(`/users/${id}`);
  return data;
};

export const updateUserByIdApi = async (
  dataToUpdate: Partial<SafeUserInterface>
): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.patch<ResponseInterface<SafeUserInterface>>(`/users/${dataToUpdate.id}`);
  return data;
};

// export const assigneLineOrTrainToUser = async (
//   data: UseFormNewAssigmentDriverSchema | UseFormAssigmentCoordinator
// ): Promise<SafeUserInterface> => {
//   try {
//     const user = await axios.patch<SafeUserInterface>(url, data);
//     return user;
//   } catch {
//     throw new Error("Not found");
//   }
// };

export const addUser = async (): Promise<SafeUserInterface[]> => {
  const userList = await getUsers();
  const newUser: createUserInterface = {
    id: 100,
    email: "supervisor1@example.com",
    password: "Password123!",
    firstName: "Claire",
    lastName: "Royer",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    hiredAt: new Date(),
    isConnected: true,
    isAvailable: true,
    isActif: false,
    role: UserRolesEnum.SUPERVISOR,
  };

  // userList.push(newUser);

  return userList;
};
