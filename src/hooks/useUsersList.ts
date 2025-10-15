import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user.api";


export const useUsersList = () => {
    return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, 
  })
}