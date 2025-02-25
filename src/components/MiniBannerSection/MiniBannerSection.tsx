import Image from "next/image";
// import productImg from "../../images/Product.jpg";
import { inter, roboto } from "@/app/fonts";
import { TypeRequest } from "@/pages";

export default function MiniBannerSection({ items, photos }: TypeRequest) {
  if (!items || !items.request || !photos || !photos.request) {
    return <div>Данные не загружены</div>;
  }

  return (
    <div className="mt-5 flex flex-col gap-4 lg:flex-row">
      <div className="min-w-44 flex-grow rounded-lg bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] px-6 py-4 text-white">
        <h2 className={`${roboto.className} text-l font-bold md:text-2xl`}>
          Заголовок баннера
        </h2>
        <h3 className={`${inter.className} text-sm md:text-base`}>
          Подзаголовок
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex">
        {items.request.map((item) => {
          // Для каждого товара, проверяем, есть ли фото, и возвращаем JSX
          return photos.request.map((photo) => {
            if (item.id === photo.itemId) {
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
                >
                  <p
                    className={`${roboto.className} text-xl font-bold md:text-2xl`}
                  >
                    {item.price} &#8381;
                  </p>
                  <Image
                    src={photo.photoLink}
                    className="h-32 w-32 rounded-md bg-white object-cover"
                    alt="продукт"
                    width={128}
                    height={128}
                  />
                </div>
              );
            }
            return null; // Обеспечиваем, что в случае отсутствия фото ничего не возвращается
          });
        })}
      </div>
    </div>
  );
}
