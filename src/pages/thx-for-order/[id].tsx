import { GetServerSideProps } from "next";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import { OrderInfo } from "../../components/OrderInfo";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../../shared/hooks/useProtectedRoute";

type Props = {
  orderId: number;
};

export default function ThanksForOrderPage(props: Props) {
  const { orderId } = props;

  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedRoute}>
        <OrderInfo ordeId={orderId} />
      </ProtectedRoute>
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const orderId = parseInt(id as string, 10);

  if (isNaN(orderId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      orderId,
    },
  };
};
