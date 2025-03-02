import MainBackground from "@/components/FormsComponents/MainBackground";
import RegistrForm from "@/components/Registration/RegistrForm";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";


export default function RegistrationPage() {
  useProtectedAuthRoute();
  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedAuthRoute}>
        <MainBackground>
          <RegistrForm />
        </MainBackground>
      </ProtectedRoute>
    </HomeContainer>
  );
}
