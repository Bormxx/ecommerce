import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { text: "Мой профиль", href: "/profile", active: true },
    { text: "История заказов", href: "/orders" },
    { text: "Товары в избранном", href: "/favorites" },
    { text: "Корзина", href: "/cart" },
  ];

  return (
    <aside className="min-w-[264px] pr-4 border-r-[1px]">
        <ul className="text-[#1F2937]">
          {menuItems.map(({ text, href, active }) => (
            <li key={text} className="mb-2">
            <Link
              href={href}
              className={`block pl-4 pr-4 pb-2 pt-2 rounded-lg cursor-pointer hover:bg-[#F3F4F6] ${
                active ? "text-[#2563EB] font-medium" : ""
              }`}
            >
              {text}
            </Link>
          </li>
        ))}
        </ul>
    </aside>
  );
};
