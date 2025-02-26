import Link from "next/link";
import Home from "@/components/Home/Home";

export default function Profile() {
  return (
    <Home>
        <h1>Профиль</h1>
        <Link href="/">На главную</Link>   
    </Home>
  );
}