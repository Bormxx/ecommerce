import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { OrderHistory } from "../../components/OrderHistory";

export default function OrderHistoryPage() {
  return (
    <HomeContainer>
      <div className="flex h-[90vh] p-5 md:pt-10">
        <Sidebar />

        <main className="flex-1 pl-1 md:pl-5">
          <h1 className="mb-4 block text-[24px] font-bold leading-8 text-[#1F2937] md:hidden">
            История заказов
          </h1>

          <OrderHistory />
        </main>
      </div>
    </HomeContainer>
  );
}
