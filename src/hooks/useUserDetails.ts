import { useQuery } from "@tanstack/react-query";
import { getUsersById } from "../api/user.api";

export const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: [`user${id}`],
    queryFn: () => getUsersById(id),
    staleTime: 1000 * 60 * 5,
  });
};
