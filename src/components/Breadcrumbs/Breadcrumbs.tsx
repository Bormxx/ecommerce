import { inter } from "@/styles/fonts";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumbs = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { asPath, query } = router;

  const pathSegments = asPath.split("/").filter(Boolean);

  const isProductPage =
    pathSegments.length === 2 && pathSegments[0] === "products";

  return (
    <nav className="px-5">
      <div
        className={`${inter.className} ${className} py-3 text-sm text-gray-500 md:py-8 md:text-base`}
      >
        <Link
          href="/"
          className="text-[16px] font-normal leading-6 text-[#6B7280] hover:text-blue-800"
        >
          Главная страница
        </Link>

        <span className="m-1">/</span>

        {isProductPage ? (
          <>
            <Link
              href="/products"
              className="text-[16px] font-normal leading-6 text-[#6B7280] hover:text-blue-800"
            >
              Очки
            </Link>
            <span className="m-1">/</span>
            <span>{query.id}</span>
          </>
        ) : (
          <>
            <Link
              href="/category"
              className="text-[16px] font-normal leading-6 text-[#6B7280] hover:text-blue-800"
            >
              Категории
            </Link>
            <span className="m-1">/</span>
            <span>{query.id}</span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
