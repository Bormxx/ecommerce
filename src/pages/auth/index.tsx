import AuthForm from "@/components/auth/AuthForm";
import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/HomeContainer/HomeContainer";

export default function AuthPage() {
  return (
    <Home>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </Home>
  );
}
