import Link from "next/link";
import Home from "@/components/Home/Home";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";

export default function Profile() {
  return (
    <Home>
        <ProfileBackground>
            <h1>Профиль</h1>
            <Link href="/">На главную</Link> 
        </ProfileBackground>  
    </Home>
  );
}