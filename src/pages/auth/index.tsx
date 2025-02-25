import AuthForm from "@/components/Auth/AuthForm";
import MainBackground from "@/components/FormsComponents/MainBackground";
import Home from "@/components/Home/Home";

export default function AuthPage() {
  return (
    <Home>
      <MainBackground>
        <AuthForm />
      </MainBackground>
    </Home>
  );
}
