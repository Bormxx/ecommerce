import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { text: "Мой профиль", href: "/profile", active: true },
    { text: "История заказов", href: "/orders" },
    { text: "Товары в избранном", href: "/favorites" },
    { text: "Корзина", href: "/cart" },
  ];

  return (
    <aside className="min-w-[264px] border-r-[1px] pr-4">
      <ul className="text-[#1F2937]">
        {menuItems.map(({ text, href, active }) => (
          <li key={text} className="mb-2">
            <Link
              href={href}
              className={`block cursor-pointer rounded-lg pb-2 pl-4 pr-4 pt-2 hover:bg-[#F3F4F6] ${
                active ? "font-medium text-[#2563EB]" : ""
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
