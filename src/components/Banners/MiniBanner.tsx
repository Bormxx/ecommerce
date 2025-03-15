import { inter, roboto } from "@/styles/fonts";

export default function MiniBanner(){
    return (
      <div className="min-w-44 flex-grow rounded-lg bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] px-6 py-4 text-white">
        <h2 className={`${roboto.className} text-l font-bold md:text-2xl`}>
          Заголовок баннера
        </h2>
        <h3 className={`${inter.className} text-sm md:text-base`}>
          Подзаголовок
        </h3>
      </div>
    );
}