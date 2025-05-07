import { useAuth } from "@/shared/hooks/useAuth";
import { ReactNode } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

type protectedRouteProps = {
  protection: () => boolean;
  children: ReactNode;
};

export default function ProtectedRoute({
  protection,
  children,
}: protectedRouteProps) {
  const { isLoading } = useAuth();
  const isOk = protection();

  if (!isOk || isLoading) {
    return <LoadingIcon />
  }

  return children;
}
