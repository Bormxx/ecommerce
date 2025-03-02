import AuthForm from "@/components/auth/AuthForm";
import MainBackground from "@/components/FormsComponents/MainBackground";
import HomeContainer from "@/components/HomeContainer/HomeContainer";

export default function AuthPage() {
  return (
    <HomeContainer>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </HomeContainer>
  );
}
