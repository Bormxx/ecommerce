import MainBackground from "@/components/FormsComponents/MainBackground";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import RegistrForm from "@/components/registration/RegistrForm";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";

export default function RegistrationPage() {
  useProtectedAuthRoute();
  return (
    <HomeContainer>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </HomeContainer>
  );
}
