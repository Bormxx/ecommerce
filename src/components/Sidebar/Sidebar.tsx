export default function Sidebar() {
  const menuItems = [
    { text: "Мой профиль", active: true },
    { text: "История заказов" },
    { text: "Товары в избранном" },
    { text: "Корзина" },
  ];

  return (
    <aside className="min-w-[264px] pr-4 border-r-[1px]">
        <ul className="text-gray-600">
          {menuItems.map(({ text, active }) => (
            <li
              key={text}
              className={`cursor-pointer hover:bg-[#F3F4F6] mb-2 pl-4 pr-4 pb-2 pt-2 rounded-lg ${
                active ? "text-[#2563EB] font-medium" : ""
              }`}
            >
              {text}
            </li>
        ))}
        </ul>
    </aside>
  );
};
