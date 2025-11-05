import axios from "axios";
import {
  type SafeUserWithLinesAndTrainsInterface,
  type SafeUserInterface,
  type createUserInterface,
} from "../types/interfaces/UserInterface";
import { UserRolesEnum } from "../types/enum/UserEnum";
import type { UseFormAssigmentCoordinator } from "../types/formSchema/newAssigmentCoordinatorSchema";
import { axiosClient } from "../utils/axiosClient";

const url = "/data/user.json";
const api = axiosClient();

export const getUsers = async (): Promise<SafeUserWithLinesAndTrainsInterface[]> => {
  try {
    const res = await axios.get<SafeUserWithLinesAndTrainsInterface[]>(url);
    return res.data;
  } catch {
    throw new Error("Not found");
  }
};

export const getUsersById = async (id: string): Promise<SafeUserWithLinesAndTrainsInterface> => {
  const { data } = await api.get<SafeUserWithLinesAndTrainsInterface>(`/users/${id}`);
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
