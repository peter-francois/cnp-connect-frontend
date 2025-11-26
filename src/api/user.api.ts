import {
  type SafeUserWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type CreateUserRequestInterface,
} from "../types/interfaces/UserInterface";
import { axiosClient } from "../utils/axiosClient";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";

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

export const addUser = async (body: CreateUserRequestInterface): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.post<ResponseInterface<SafeUserInterface>>("/users", body);
  return data;
};
