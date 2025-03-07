import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import avatar from "../../../public/images/initial_avatar.png";

export default function Profile() {
  return (
    <HomeContainer>
        <ProfileBackground>
          <div className="flex min-h-screen p-6">
          <Sidebar>
          </Sidebar> 
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Profile Card */}
          <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between min-w-[580px]">
            <div className="flex items-center space-x-4">
              <Image className="rounded-full" src={avatar} width={80} height={80} alt="Avatar" />
              <div className="text-lg font-medium leading-6 text-[#1F2937] space-y-2">
                <h2>Ярополк Иванов</h2>
                <p>ivanov@yandex.ru</p>
              </div>
            </div>
            <button className="px-4 py-[7px] bg-white text-[#1E40AF] rounded-[6px] border border-[#1E40AF] font-bold text-[16px] leading-6">Редактировать</button>
          </div>
          
          {/* Settings */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
            <label className="block text-gray-700">Язык:</label>
            <select className="mt-1 w-full p-2 border rounded-lg">
              <option>Русский</option>
              <option>English</option>
            </select>
            
            <div className="mt-4 flex items-center space-x-2">
              <input type="checkbox" id="emailNotify" />
              <label htmlFor="emailNotify" className="text-gray-700">Уведомлять об изменении статуса заказов по email</label>
            </div>
            
            <div className="mt-4 flex items-center space-x-2">
              <label className="text-gray-700">Ночная тема</label>
              <input type="checkbox" className="toggle-checkbox" />
            </div>
          </div>
        </main>
        
        {/* Illustration */}
        <div className="hidden lg:flex items-center justify-center w-1/3">
          <img src="/illustration.png" alt="Illustration" className="max-w-full" />
        </div>
          </div>
        </ProfileBackground>  
    </HomeContainer>
  );
}