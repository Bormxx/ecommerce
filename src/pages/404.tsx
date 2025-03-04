import Head from "next/head";
import P404Background from "../components/FormsComponents/p404Background";
import HomeContainer from "../components/HomeContainer/HomeContainer";

export default function p404() {
  return (
    <>
      <Head>
        {/* <meta keywords="error 404, нет такой страницы"></meta> */}
        <meta name="description" content="Ошибка 404"></meta>
        <title>Ошибка 404</title>
      </Head>
      <HomeContainer>
        <P404Background>
          <p className="text-xl font-bold">
            Индус Ярополк Иванов, как и данная страница не существует.
          </p>
        </P404Background>
      </HomeContainer>
    </>
  );
}
