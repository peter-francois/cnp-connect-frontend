import { useQuery } from "@tanstack/react-query";
import { getTrains } from "../api/train.api";

export const useTrainsList = () => {
  return useQuery({
    queryKey: ["trains"],
    queryFn: getTrains,
    staleTime: 1000 * 60 * 100,
  });
};
