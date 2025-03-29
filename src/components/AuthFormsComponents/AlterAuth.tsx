import { getYandexUrl } from "@/shared/services/auth";
import { inter } from "@/styles/fonts";
import { useRouter } from "next/router";

type AlterAuthProp = {
  text: string;
};

export default function AlterAuth(prop: AlterAuthProp) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-2">
      <p className={`${inter.className} text-base text-gray-500`}>
        {prop.text}
      </p>
      <div
        onClick={async () => {
          const url = await getYandexUrl();
          if (url) {
            router.push(url);
          }
        }}
        className="group cursor-pointer rounded border border-transparent p-1 hover:border-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 62.33 62.33"
          className="size-8"
        >
          <circle
            cx="31.16"
            cy="31.16"
            r="31.16"
            className="fill-red-400 group-hover:fill-red-500"
          />
          <path
            fill="#FFF"
            d="M35.07 18.11h-2.78c-5.1 0-7.79 2.58-7.79 6.39 0 4.31 1.86 6.33 5.67 8.92l3.15 2.12-9.05 13.52h-6.76l8.12-12.1c-4.67-3.34-7.29-6.59-7.29-12.09 0-6.89 4.81-11.6 13.92-11.6h9.04v35.75h-6.23V18.11Z"
          />
        </svg>
      </div>
    </div>
  );
}
