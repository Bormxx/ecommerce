import AuthForm from "@/components/auth/AuthForm";
import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/Home/Home";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";

export default function AuthPage() {
  useProtectedAuthRoute();
  return (
    <Home>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </Home>
  );
}
