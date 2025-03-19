import MainBackground from "@/components/ui/FormsComponents/MainBackground";
import { useProtectedAuthRoute } from "@/shared/hooks/useProtectedAuthRoute";
import RegistrForm from "@/components/forms/Registration/RegistrForm";
import ECMainLayout from "@/components/layouts/main-layout";

export default function RegistrationPage() {
  useProtectedAuthRoute();
  return (
    <ECMainLayout>
      <MainBackground>
        <RegistrForm />
      </MainBackground>
    </ECMainLayout>
  );
}
