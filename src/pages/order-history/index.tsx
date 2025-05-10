import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { OrderHistory } from "../../components/OrderHistory";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../../shared/hooks/useProtectedRoute";

export default function OrderHistoryPage() {
  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedRoute}>
        <div className="flex h-[90vh] p-5 md:pt-10">
          <Sidebar />

          <main className="flex-1 pl-1 md:pl-5">
            <h1 className="mb-4 block text-[24px] font-bold leading-8 text-[#1F2937] md:hidden">
              История заказов
            </h1>

            <OrderHistory />
          </main>
        </div>
      </ProtectedRoute>
    </HomeContainer>
  );
}
