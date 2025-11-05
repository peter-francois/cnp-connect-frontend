import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUsers } from "../api/user.api";
import type { SafeUserResponseWithLinesAndTrainsInterface } from "../types/interfaces/UserInterface";

class UserService {
  findManyWithLinesAndTrains(): UseQueryResult<SafeUserResponseWithLinesAndTrainsInterface[], Error> {
    return useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      staleTime: 1000 * 60 * 5,
    });
  }
}

export const userService = new UserService();
