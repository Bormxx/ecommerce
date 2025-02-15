import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Items, Users } from "../../types";
import { useUsersStore } from "../store";
import axios from "axios";




export default function Home({ items, users }: any) {
  const name = useUsersStore((state) => state.name);
  const setName = useUsersStore((state) => state.setName);
  const surname = useUsersStore((state) => state.surname);
  const setSurname = useUsersStore((state) => state.setSurname);
  const avatar = useUsersStore((state) => state.avatar);
  const setAvatar = useUsersStore((state) => state.setAvatar);
  const email = useUsersStore((state) => state.email);
  const setEmail = useUsersStore((state) => state.setEmail);
  const password = useUsersStore((state) => state.password);
  const setPassword = useUsersStore((state) => state.setPassword);
  const addUser = async (e: any) => {
    e.preventDefault();
    try {
      const responce = await axios.post('api/users', {id:Date.now(), name, surname, avatar, email, password});
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="grid">
      <div className="m-auto mt-10 flex">
        <AcademicCapIcon className="mr-5 size-10" />
        <h1 className="text-center text-3xl font-bold">Стартовая страница.</h1>
        <AcademicCapIcon className="ml-5 size-10" />
      </div>
      <div className="flex">
        <div className="m-auto mt-10 grid justify-items-end">
          <label className="m-1 text-center text-xl font-bold">
            Имя:
            <input
              className="ml-5"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="m-1 text-center text-xl font-bold">
            Фамилия:
            <input
              className="ml-5"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
          <label className="m-1 text-center text-xl font-bold">
            Аватар:
            <input
              className="ml-5"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
          <label className="m-1 text-center text-xl font-bold">
            E-mail:
            <input
              className="ml-5"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="m-1 text-center text-xl font-bold">
            Пароль:
            <input
              className="ml-5"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="flex mb-10">
        <div className="m-auto mt-5">
          <button
            className="rounded-xl border bg-orange-500 p-3 font-bold text-white uppercase"
            onClick={addUser}
          >
            push me
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="m-auto mt-5">
          {items.request.map((item: Items) => {
            let avail = "";
            if (item.availability) {
              avail = "В наличии";
            } else {
              avail = "Нет в наличии";
            }
            return (
              <div key={item.id}>
                {item.id} {item.title} {item.price} {item.description} {avail}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex">
        <div className="m-auto mt-5">
          {users.request.map((user: Users) => {
            let avail = "";
            return (
              <div key={user.id}>
                {user.id} {user.name} {user.surname} {user.avatar} {user.email}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const itemsRes = await fetch("http://127.0.0.1:3000/api/items");
  const items = await itemsRes.json();

  const usersRes = await fetch("http://127.0.0.1:3000/api/users");
  const users = await usersRes.json();

  return {
    props: { items, users },
  };
}
