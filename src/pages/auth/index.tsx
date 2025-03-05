import AuthForm from "@/components/auth/AuthForm";
import MainBackground from "@/components/FormsComponents/MainBackground";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";
import HomeContainer from "@/components/HomeContainer/HomeContainer";

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
