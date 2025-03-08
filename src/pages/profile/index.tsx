import { useState } from "react";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import CustomSelect from "@/components/CustomSelect/CustomSelect";

interface ProfileProps {
  name?: string;
  surname?: string;
  email?: string;
}

export default function Profile({
  name = "Ярополк",
  surname = "Иванов",
  email = "ivanov@yandex.ru",
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name,
    surname,
    email,
  });

  const handleSave = (updatedData: { name: string; surname: string; email: string }) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  return (
    <HomeContainer>
        <ProfileBackground>
          <div className="flex pt-10 h-[90vh]">
            <Sidebar/>

            <main className="flex-1 pl-5">

              <ProfileSection
                {...profileData}
                isEditing={isEditing} 
                onEdit={() => setIsEditing(true)} 
                onCancel={() => setIsEditing(false)}
                onSave={handleSave}
              />

              {!isEditing && (

                <div className="mt-4">
                  <label className="block font-normal text-[14px] leading-5 text-[#6B7280]">Язык:</label>
                    
                  <CustomSelect/>

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
              )}
            </main>
          </div>
        </ProfileBackground>  
    </HomeContainer>
  );
}