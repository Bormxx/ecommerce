import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/auth";
import { checkAuth } from "@/services/auth";

export const useAuth = () => {
  const { isAuthenticated, removeUserData, setIsAuthenticated } =
    useUserStore();

  const { isError, isLoading } = useQuery({
    queryKey: [isAuthenticated],
    queryFn: () => checkAuth(isAuthenticated),
    enabled: isAuthenticated,
    retry: false,
  });

  if (isError) {
    removeUserData();
    setIsAuthenticated(false);
  }

  return { isError, isLoading };
};
