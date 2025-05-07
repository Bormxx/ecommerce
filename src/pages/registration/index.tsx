
import MainBackground from "@/components/AuthFormsComponents/MainBackground";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import RegisterForm from "@/components/Registration/RegisterForm";
import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";

export default function RegistrationPage() {
  useProtectedAuthRoute();
  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedAuthRoute}>
        <MainBackground>
          <RegisterForm />
        </MainBackground>
      </ProtectedRoute>
    </HomeContainer>
  );
}
