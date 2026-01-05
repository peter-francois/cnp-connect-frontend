import {
  type SafeUserWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type CreateUserRequestInterface,
} from "../types/interfaces/UserInterface";
import { axiosClient } from "../utils/axiosClient";
import type { ResponseInterface } from "../types/interfaces/responseInterface.types";

const api = axiosClient();

export const getUsersApi = async (): Promise<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>> => {
  const { data } = await api.get<ResponseInterface<SafeUserWithLinesAndTrainsInterface[]>>("/api/users");
  return data;
};

export const getUsersByIdApi = async (id: string): Promise<SafeUserWithLinesAndTrainsInterface> => {
  const { data } = await api.get<SafeUserWithLinesAndTrainsInterface>(`/api/users/${id}`);
  return data;
};

export const updateUserByIdApi = async (
  dataToUpdate: Partial<SafeUserInterface>
): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.patch<ResponseInterface<SafeUserInterface>>(`/api/users/${dataToUpdate.id}`);
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

export const addUserApi = async (body: CreateUserRequestInterface): Promise<ResponseInterface<SafeUserInterface>> => {
  const { data } = await api.post<ResponseInterface<SafeUserInterface>>("/api/users", body);
  return data;
};
