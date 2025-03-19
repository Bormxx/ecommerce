import MainBackground from "@/components/ui/FormsComponents/MainBackground";
import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";
import AuthForm from "@/components/forms/Auth/AuthForm";
import ECMainLayout from "@/components/layouts/main-layout";

export default function AuthPage() {
  useProtectedAuthRoute();
  return (
    <ECMainLayout>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </ECMainLayout>
  );
}
