import MainBackground from "@/components/FormsComponents/MainBackground";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import RegistrForm from "@/components/registration/RegistrForm";

export default function RegistrationPage() {
  return (
    <HomeContainer>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </HomeContainer>
  );
}
