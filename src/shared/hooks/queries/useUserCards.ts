import { UserCards } from "@/shared/types/";
import { useQuery } from "@tanstack/react-query";
import { getUserCards } from "../../api/user";

export const useUserCards = () => {
  const {
    data: cards,
    isPending: isPendingCards,
    isError: isErrorCards,
    error: errorCards,
  } = useQuery<UserCards[], Error>({
    queryKey: ["cards"],
    queryFn: getUserCards,
  });

  return {
    cards,
    isPendingCards,
    isErrorCards,
    errorCards,
  };
};
