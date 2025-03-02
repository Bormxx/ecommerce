import MainBackground from "@/components/FormsComponents/MainBackground";
import RegisterForm from "@/components/Registration/RegisterForm";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";


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
