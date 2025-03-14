import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CartSection from "@/components/CartSection/CartSection";

export default function Cart() {
  return (
    <HomeContainer>
        <div className="flex pt-10 h-[90vh]">
          <Sidebar/>
          <CartSection/>
        </div>
    </HomeContainer>
  );
}
