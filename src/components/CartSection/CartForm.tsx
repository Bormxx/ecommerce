import Image from "next/image";
import { useRouter } from "next/navigation";
import CardInBasket from "@/components/MiniCard/CardInBasket";
import { inter, roboto } from "@/styles/fonts";
type Item = {
  id: string;
  price: number;
  title: string;
  quantity: number;
  like: boolean;
};
type CartFormProps = {
  itemList: Item[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItemList: any;
  total: number;
  quantity:number;
};
export default function CartForm({ itemList, setItemList, total, quantity }: CartFormProps) {
  const router = useRouter();

  const deleteCard = (id: string) => {
    setItemList((prevList: Item[]) =>
      prevList.filter((item) => item.id !== id),
    );
  };
  function plusQuantity(id: string) {
    setItemList((prevList: Item[]) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }
  const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

  function minusQuantity(id: string) {
    setItemList((prevList: Item[]) =>
      prevList.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }
  const clickLike = (id: string) => {
    setItemList((prevList: Item[]) =>
      prevList.map((item) =>
        item.id === id ? { ...item, like: !item.like } : item,
      ),
    );
  };
  function getProductWord(quantity: number) {
    const lastDigit = quantity % 10;
    const lastTwoDigits = quantity % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${quantity} товар`;
    } else if (
      (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
      (lastTwoDigits < 12 || lastTwoDigits > 14)
    ) {
      return `${quantity} товара`;
    } else {
      return `${quantity} товаров`;
    }
  }
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      <div className="mr-2 min-w-[580px] flex-grow">
        {itemList.map((item) => (
          <CardInBasket
            key={item.id}
            price={item.price}
            title={item.title}
            deleteCard={() => {
              deleteCard(item.id);
            }}
            id={item.id}
            minusQuantity={minusQuantity}
            plusQuantity={plusQuantity}
            //   image={item.image}
            //   deliveryTime={item.deliveryTime}
            quantity={item.quantity}
            like={item.like}
            clickLike={clickLike}
          />
        ))}
      </div>
      <div>
        <div className="fixed bottom-[65px] left-0 flex w-full min-w-[280px] flex-col gap-2 bg-white p-4 shadow-lg md:static md:h-[165px] md:w-60 md:rounded-xl">
          <div className="flex justify-between md:hidden">
            <span className="text-xl font-bold text-green-500">
              {formattedTotal} &#8381;
            </span>
            <span
              className={`${inter.className} flex items-center text-sm text-slate-400`}
            >
              {getProductWord(quantity)}
            </span>
          </div>
          <div className="hidden flex-col gap-4 md:flex">
            <div className="flex justify-between">
              <p className={`${roboto.className} text-xl font-bold`}>
                Ваша корзина
              </p>
              <span className={`${inter.className} text-xs text-slate-400`}>
                {getProductWord(quantity)}
              </span>
            </div>
            <div className="mb-2 flex items-end justify-between">
              <p className={`${inter.className} text-xs text-gray-500`}>
                Сумма заказа
              </p>
              <span
                className={`${roboto.className} text-3xl font-bold text-green-500`}
              >
                {formattedTotal} &#8381;
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`w-full rounded-lg bg-blue-800 p-2 font-bold ${
              total === 0 ? "text-slate-400" : "text-white"
            }`}
            disabled={total === 0}
            onClick={()=>router.push("/order")}
          >
            Оформить заказ
          </button>
        </div>
        <div className="mt-[47px]">
          <Image
            src="/images/chick-with-books.svg"
            alt="Женщина с книгой"
            width={288}
            height={396}
            priority
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
