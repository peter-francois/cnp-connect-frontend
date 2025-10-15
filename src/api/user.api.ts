import axios from "axios";
import { type UserInterface } from "../types/interfaces/UserInterface";
import { UserRolesEnum } from "../types/enum/UserEnum";

const url = "/data/user.json";

export const getUsers = async (): Promise<UserInterface[]> => {
  try {
    const res = await axios.get<UserInterface[]>(url);
    return res.data;
  } catch {
    throw new Error("Not found");
  }
};

export const getUsersById = async (id: number): Promise<UserInterface> => {
  try {
    const users = await getUsers();
    const user = users.find((item) => item.id === id)!; // The ! is to force to return UserInterface
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
    avatar_url: "https://randomuser.me/api/portraits/women/1.jpg",
    hiringAt: new Date(),
    isConnected: true,
    isAvailable: true,
    isActif: false,
    role: UserRolesEnum.supervisor,
    lignesId: [1, 2],
    trainsId: 1,
  };

  userList.push(newUser);

  return userList;
};
