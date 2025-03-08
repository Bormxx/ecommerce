import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import avatar from "../../../public/images/initial_avatar.png";

export default function Profile() {
  return (
    <HomeContainer>
        <ProfileBackground>
          <div className="flex pt-10 h-[90vh]">
          <Sidebar>
          </Sidebar> 
        {/* Main Content */}
        <main className="flex-1 pl-5">
          {/* Profile Card */}
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
          
          {/* Settings */}
          <div className="mt-4">
            <label className="block font-normal text-[14px] leading-5 text-[#6B7280]">Язык:</label>
            <select className="max-w-[180px] w-full px-[12px] py-[9px] border border-[#9CA3AF] rounded-[4px] text-[14px] font-normal leading-5 cursor-pointer">
              <option>Русский</option>
              <option>English</option>
            </select>
            
            <div className="mt-4 flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="emailNotify"
                className="w-[16px] h-[16px] rounded-full border border-[#9CA3AF] cursor-pointer bg-[#F9FAFB]" 
              />
              <label htmlFor="emailNotify" className="text-[#1F2937] font-normal text-[14px] leading-5">Уведомлять об изменении статуса заказов по email</label>
            </div>
            
            <div className="mt-4 flex items-center">
              <input type="checkbox" id="darkModeToggle" className="sr-only peer" />

              <label
                htmlFor="darkModeToggle"
                className="w-10 h-5 flex items-center bg-[#9CA3AF] rounded-full p-[2px] transition-colors peer-checked:bg-gray-600 cursor-pointer"
              >
              <span
                className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"
              ></span>
              </label>


              <label 
                htmlFor="darkModeToggle"
                className="ml-2 text-[#1F2937] font-normal text-[14px] leading-5">Ночная тема
              </label>
            </div>
          </div>
        </main>
        
          </div>
        </ProfileBackground>  
    </HomeContainer>
  );
}