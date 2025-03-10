import HomeContainer from "@/components/HomeContainer/HomeContainer";
import OrderForm from "@/components/Order/OrderForm";
import OrderBackground from "@/components/OrderFormsComponents/OrderBackground";

export default function OrderPage() {
  return (
    <HomeContainer>
      <OrderBackground>
        <OrderForm />
      </OrderBackground>
    </HomeContainer>
  );
}