import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import AuthForm from "../../components/Auth/AuthForm";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import MainBackground from "@/components/AuthFormsComponents/MainBackground";

export default function AuthPage() {
  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedAuthRoute}>
        <MainBackground>
          <AuthForm />
        </MainBackground>
      </ProtectedRoute>
    </HomeContainer>
  );
}
