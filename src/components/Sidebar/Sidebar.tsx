export default function Sidebar() {
  const menuItems = [
    { text: "Мой профиль", active: true },
    { text: "История заказов" },
    { text: "Товары в избранном" },
    { text: "Корзина" },
  ];

  return (
    <aside className="w-1/4 min-w-[264px] bg-white rounded-xl p-4 shadow-md">
        <ul className="space-y-4 text-gray-600">
          {menuItems.map(({ text, active }) => (
            <li
              key={text}
              className={`cursor-pointer hover:bg-[#F3F4F6] p-2 rounded-lg ${
                active ? "text-blue-600 font-medium" : ""
              }`}
            >
              {text}
            </li>
        ))}
        </ul>
    </aside>
  );
};
