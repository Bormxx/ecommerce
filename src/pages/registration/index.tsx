import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/HomeContainer/HomeContainer";
import RegistrForm from "@/components/registration/RegistrForm";

export default function RegistrationPage() {
  return (
    <Home>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </Home>
  );
}
