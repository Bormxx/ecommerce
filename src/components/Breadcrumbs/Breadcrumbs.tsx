import { inter } from "@/appxxx/fonts";
import Link from "next/link";

const Breadcrumbs = () => {
  return (
    <nav>
      <div
        className={`${inter.className} py-3 text-sm text-gray-500 md:py-8 md:text-base`}
      >
        <Link href="/" className="hover:text-blue-800">
          Главная страница
        </Link>
        <span className="m-2">/</span>
        <Link href="/" className="text-sm hover:text-blue-800">
          Очки Fendy
        </Link>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
