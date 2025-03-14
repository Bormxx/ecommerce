"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { text: "Мой профиль", href: "/profile" },
    { text: "История заказов", href: "/orders" },
    { text: "Товары в избранном", href: "/favorites" },
    { text: "Корзина", href: "/cart" },
  ];

  return (
    <aside className="min-w-[264px] pr-4 border-r-[1px] hidden md:block">
        <ul className="text-[#1F2937]">
          {menuItems.map(({ text, href }) => {
            const isActive = pathname === href;

            return (
              <li key={text} className="mb-2">
                <Link
                  href={href}
                  className={`block pl-4 pr-4 pb-2 pt-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F3F4F6] ${
                    isActive ? "text-[#2563EB] font-medium" : ""
                  }`}
                >
                  {text}
                </Link>
            </li>
          );
        })}
        </ul>
    </aside>
  );
};
