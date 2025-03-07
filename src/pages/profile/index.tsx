import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import avatar from "../../../public/images/initial_avatar.png";

export default function Profile() {
  return (
    <HomeContainer>
        <ProfileBackground>
          <div className="flex min-h-screen bg-gray-100 p-6">
          <Sidebar>
          </Sidebar> 
        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image className="w-12 h-12 rounded-full" src={avatar} width={80} height={80} alt="Avatar" />
              <div>
                <h2 className="text-lg font-medium">Ярополк Иванов</h2>
                <p className="text-gray-500">ivanov@yandex.ru</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Редактировать</button>
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