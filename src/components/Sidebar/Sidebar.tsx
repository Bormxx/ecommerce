export default function Sidebar() {

  return (
    <aside className="w-1/4 bg-white rounded-xl p-4 shadow-md">
        <ul className="space-y-4 text-gray-600">
            <li className="text-blue-600 font-medium">Мой профиль</li>
            <li>История заказов</li>
            <li>Товары в избранном</li>
            <li>Корзина</li>
        </ul>
    </aside>
  );
};
