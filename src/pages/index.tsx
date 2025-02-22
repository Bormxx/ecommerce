import Main from "@/components/Main/Main";
import Header from "../components/Header/Header";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      fetch('/api/users')
    }, [])
  return (
    <div className="mx-auto max-w-[1180px]">
      <Header />
      <Main />
    </div>
  );
}
