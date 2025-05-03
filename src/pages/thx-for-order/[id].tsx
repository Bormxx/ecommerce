import { GetServerSideProps } from "next";
import HomeContainer from "../../components/HomeContainer/HomeContainer";
import { OrderInfo } from "../../components/OrderInfo";

type Props = {
  orderId: number;
};

export default function ThanksForOrderPage(props: Props) {
  const { orderId } = props;

  return (
    <HomeContainer>
      <OrderInfo ordeId={orderId} />
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
