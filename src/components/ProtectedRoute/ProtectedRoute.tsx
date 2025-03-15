import { useAuth } from "@/shared/hooks/useAuth";
import { useUserStore } from "@/shared/store/auth";

import { ReactNode } from "react";

type protectedRouteProps = {
  protection: () => void;
  children: ReactNode;
};

export default function ProtectedRoute({
  protection,
  children,
}: protectedRouteProps) {
  const { isLoading } = useAuth();
  const { isAuthenticated } = useUserStore();
  protection();

  if (!isAuthenticated || isLoading) {
    return (
      <div className="grow place-content-center place-items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-8 border-blue-200 border-t-blue-500"></div>
      </div>
    );
  }

  return children;
}
