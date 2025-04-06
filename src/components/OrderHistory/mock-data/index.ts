export type OrderMock = {
  id: number;
  date: string;
  status: string;
  price: number;
  paymentMethod: string;
  isCorier: boolean;
  isSelfDelivery: boolean;
  items: OrderProductCardMock[];
};

export type OrderProductCardMock = {
  id: number;
  title: string;
  params: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export const initialStateMock: OrderMock[] = [
  {
    id: 1,
    date: "12.10.2023",
    status: "Выполнен",
    price: 1500,
    paymentMethod: "Картой",
    isCorier: true,
    isSelfDelivery: false,
    items: [
      {
        id: 1,
        title: "Товар 1",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 2,
        title: "Товар 2",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 3,
        title: "Товар 3",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 4,
        title: "Товар 4",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 1,
        title: "Товар 1",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 2,
        title: "Товар 2",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 3,
        title: "Товар 3",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 4,
        title: "Товар 4",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 1,
        title: "Товар 1",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 2,
        title: "Товар 2",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 3,
        title: "Товар 3",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 4,
        title: "Товар 4",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    date: "13.10.2023",
    status: "Выполнен",
    price: 2000,
    paymentMethod: "Картой",
    isCorier: true,
    isSelfDelivery: false,
    items: [
      {
        id: 1,
        title: "Товар 1",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 2,
        title: "Товар 2",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 3,
        title: "Товар 3",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
      {
        id: 4,
        title: "Товар 4",
        params: "Солнцезащитные очки",
        price: 500,
        imageUrl: "/images/Product-with-shadow.png",
        quantity: 1,
      },
    ],
  },
];
