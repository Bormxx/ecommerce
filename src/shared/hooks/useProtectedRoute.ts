import { useRouter } from "next/router";

import { useEffect } from "react";
import { useUserStore } from "../store/auth";

export const useProtectedRoute = () => {
  const { isAuthenticated, isHydrated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isHydrated) {
      router.replace({
        pathname: "/auth",
        query: { from: router.asPath },
      });
    }
  }, [isAuthenticated, isHydrated, router]);
};
