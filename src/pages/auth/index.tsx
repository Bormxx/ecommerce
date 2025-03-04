import AuthForm from "@/components/Auth/AuthForm";
import MainBackground from "@/components/AuthFormsComponents/MainBackground";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

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
