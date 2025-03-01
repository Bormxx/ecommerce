import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/Home/Home";
import RegistrForm from "@/components/Registration/RegistrForm";
import { useProtectedAuthRoute } from "@/hooks/useProtectedAuthRoute";

export default function RegistrationPage() {
  useProtectedAuthRoute();
  return (
    <Home>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </Home>
  );
}
