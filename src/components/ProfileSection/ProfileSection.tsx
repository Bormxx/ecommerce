import Image from "next/image";
import avatar from "../../../public/images/initial_avatar.png";

export default function ProfileSection() {

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between max-w-[580px]">
        <div className="flex items-center space-x-4">
          <Image className="rounded-full" src={avatar} width={80} height={80} alt="Avatar" />
          <div className="text-lg font-medium leading-6 text-[#1F2937] space-y-2">
            <h2>Ярополк Иванов</h2>
            <p>ivanov@yandex.ru</p>
          </div>
        </div>
        <button className="px-[17px] py-[7px] bg-white text-[#1E40AF] rounded-[6px] border border-[#1E40AF] font-bold text-[16px] leading-6">Редактировать</button>
      </div>
    );
  };
  