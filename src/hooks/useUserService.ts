import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, getUsersById, updateUserByIdApi } from "../api/user.api";
import type { SafeUserInterface, SafeUserWithLinesAndTrainsInterface } from "../types/interfaces/UserInterface";

export const useUserService = () => {
  const FindManyWithLinesAndTrains = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      staleTime: 1000 * 60 * 5,
    });

  const FindUserDetails = (id: string) =>
    useQuery({
      queryKey: [`user${id}`],
      queryFn: () => getUsersById(id),
      staleTime: 1000 * 60 * 5,
    });

  // @dev for update trains and/or lines
  // const UpdateOne = () =>
  //   useMutation({
  //     mutationFn: (newData: Partial<SafeUserWithLinesAndTrainsInterface>) => updateOneApi(newData),
  //   });

  const UpdateProfile = () =>
    useMutation({
      mutationFn: (newData: Partial<SafeUserInterface>) => updateUserByIdApi(newData),
    });

  return {
    findManyWithLinesAndTrains: FindManyWithLinesAndTrains,
    findUserDetails: FindUserDetails,
    updateProfile: UpdateProfile,
  };
};
