import HomeContainer from "@/components/HomeContainer/HomeContainer";
import OrderForm from "@/components/Order/OrderForm";
import OrderBackground from "@/components/OrderFormsComponents/OrderBackground";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../../shared/hooks/useProtectedRoute";

export default function OrderPage() {
  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedRoute}>
        <OrderBackground>
          <OrderForm />
        </OrderBackground>
      </ProtectedRoute>
    </HomeContainer>
  );
}