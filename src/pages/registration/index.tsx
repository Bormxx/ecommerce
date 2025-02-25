import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/Home/Home";
import RegistrForm from "@/components/Registration/RegistrForm";

export default function RegistrationPage() {
  return (
    <Home>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </Home>
  );
}
