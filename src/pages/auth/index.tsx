import MainBackground from "@/components/FormsComponents/MainBackground";
import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  useProtectedAuthRoute();
  return (
    <HomeContainer>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </HomeContainer>
  );
}
