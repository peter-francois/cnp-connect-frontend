import axios from "axios";
import {
  type SafeUserResponseWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type createUserInterface,
} from "../types/interfaces/UserInterface";
import { UserRolesEnum } from "../types/enum/UserEnum";

import type { UseFormAssigmentCoordinator } from "../types/formSchema/newAssigmentCoordinatorSchema";
import { useApi } from "../hooks/useApi";
import type { UseFormNewAssigmentDriverSchema } from "../types/formSchema/newAssigmentDriverSchema";

const url = "/data/user.json";
const api = useApi();

export const getUsers = async (): Promise<SafeUserResponseWithLinesAndTrainsInterface[]> => {
  try {
    const res = await axios.get<SafeUserResponseWithLinesAndTrainsInterface[]>(url);
    return res.data;
  } catch {
    throw new Error("Not found");
  }
};

export const getUsersById = async (id: string): Promise<SafeUserInterface> => {
  const { data } = await api.get<SafeUserInterface>(`/users/${id}`);
  return data;
};

export const update = async (
  data: UseFormNewAssigmentDriverSchema | UseFormAssigmentCoordinator
): Promise<SafeUserInterface> => {
  try {
    const user = await axios.patch<SafeUserInterface>(url, data);
    return user;
  } catch {
    throw new Error("Not found");
  }
};

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
