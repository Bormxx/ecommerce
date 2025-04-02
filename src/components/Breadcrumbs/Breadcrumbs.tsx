import { inter } from "@/styles/fonts";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { id } = router.query;
  const categoryName = id
    ? typeof id === "string"
      ? "Очки " + id.charAt(0).toUpperCase() + id.slice(1)
      : ""
    : "Каталог";
  return (
    <nav>
      <div
        className={`${inter.className} ${className} py-3 text-sm text-gray-500 md:py-8 md:text-base`}
      >
        <Link href="/" className="hover:text-blue-800">
          Главная страница
        </Link>
        <span className="m-2">/</span>
        <Link href="/" className="text-sm hover:text-blue-800">
          {categoryName}
        </Link>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
