import MainBackground from "@/components/FormsComponents/MainBackground";
import RegistrForm from "@/components/Registration/RegistrForm";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";
import HomeContainer from "../../components/HomeContainer/HomeContainer";


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
