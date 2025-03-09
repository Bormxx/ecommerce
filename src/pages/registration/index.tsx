import MainBackground from "@/components/FormsComponents/MainBackground";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";
import RegistrForm from "../../components/Registration/RegistrForm";

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
