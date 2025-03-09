import { useUserStore } from "@/shared/store/auth";
import { useRouter } from "next/router";

import { useEffect } from "react";

export const useProtectedAuthRoute = () => {
  const { isAuthenticated } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      const path = router.query.from;
      router.replace(typeof path === "string" ? path : "/");
    }
  }, [isAuthenticated, router]);
};
