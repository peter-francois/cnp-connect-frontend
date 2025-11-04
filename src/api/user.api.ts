import axios, { type AxiosResponse } from "axios";
import { type UserInterface } from "../types/interfaces/UserInterface";
import { UserRolesEnum } from "../types/enum/UserEnum";
import type { UseFormNewAssigmentDriverSchema } from "../types/formSchema/newAssigmentConductorSchema";
import type { UseFormAssigmentCoordinator } from "../types/formSchema/newAssigmentCoordinatorSchema";
import { useApi } from "../hooks/useApi";

const url = "/data/user.json";
const api = useApi();

export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const res = await axios.get<UserInterface[]>(url);
    return res.data;
  } catch {
    throw new Error("Not found");
  }
};

export const getUsersById = async (id: string): Promise<UserInterface> => {
  const { data } = await api.get<UserInterface>(`/users/${id}`);
  return data;
};

export const update = async (
  data: UseFormNewAssigmentDriverSchema | UseFormAssigmentCoordinator
): Promise<UserInterface> => {
  try {
    const user = await axios.patch<UserInterface>(url, data);
    return user;
  } catch {
    throw new Error("Not found");
  }
};

export const addUser = async (): Promise<UserInterface[]> => {
  const userList = await getUsers();
  const newUser: UserInterface = {
    id: 100,
    email: "supervisor1@example.com",
    password: "Password123!",
    firstName: "Claire",
    lastName: "Royer",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    hiringAt: new Date(),
    isConnected: true,
    isAvailable: true,
    isActif: false,
    role: UserRolesEnum.SUPERVISOR,
    lignesId: [1, 2],
    trainsId: 1,
  };

  userList.push(newUser);

  return userList;
};
