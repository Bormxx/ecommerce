import { useState, useEffect } from "react";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { useUserStore } from "@/shared/store/auth";
import { useMutation } from '@tanstack/react-query';
import { updateUser } from "@/shared/api/user";

export default function Profile() {
  
  const name = useUserStore((state) => state.name);
  const surname = useUserStore((state) => state.surname);
  const email = useUserStore((state) => state.email);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name, surname, email });
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      useUserStore.getState().setUserData({
        name: variables.name ?? "",
        surname: variables.surname ?? "",
        email: variables.email ?? "",
        avatar: "",
      });
  
      setIsEditing(false);
      console.log('Профиль успешно обновлён');
    },
    onError: (error) => {
      console.error('Ошибка при обновлении профиля:', error);
    },
  });

  const handleSave = (updatedData: { name: string; surname: string; email: string }) => {
    setProfileData(updatedData);
    mutation.mutate(updatedData);
    setIsEditing(false);
  };

  useEffect(() => {
    setProfileData({ name, surname, email });
  }, [name, surname, email]);

  return (
    <HomeContainer>
        <ProfileBackground imageUrl="/images/sport_meditation.svg">
          <div className="flex p-5 md:pt-10 h-[90vh]">
            <Sidebar />

            <main className="flex-1 pl-1 md:pl-5">
              <h1 className="block md:hidden mb-4 font-bold text-[24px] leading-8 text-[#1F2937]">Мой профиль</h1>

              <ProfileSection
                {...profileData}
                isEditing={isEditing} 
                onEdit={() => setIsEditing(true)} 
                onCancel={() => setIsEditing(false)}
                onSave={handleSave}
              />

              {!isEditing && (

                <div className="mt-4">
                  <label className="block font-normal text-[12px] leading-4 md:text-[14px] md:leading-5 text-[#6B7280]">Язык:</label>
                    
                  <CustomSelect/>

                  <div className="mt-4 flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="emailNotify"
                      className="w-[16px] h-[16px] rounded-full border border-[#9CA3AF] cursor-pointer bg-[#F9FAFB]" 
                    />
                    <label htmlFor="emailNotify" className="text-[#1F2937] font-normal text-[12px] leading-4 md:text-[14px] md:leading-5">
                      Уведомлять об изменении статуса заказов по email
                    </label>
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
                      className="ml-2 text-[#1F2937] font-normal text-[12px] leading-4 md:text-[14px] md:leading-5">
                        Ночная тема
                    </label>
                      
                  </div>

                    <button
                      className="w-full max-w-[720px] md:max-w-[580px] mt-4 px-8 py-[7px] bg-[#FFFFFF] text-[#1E40AF] border border-[#1E40AF] rounded-md font-[700] text-[14px] leading-5 md:text-[16px] md:leading-6 hover:bg-[#1E40AF] hover:text-white transition">
                        Выйти из аккаунта
                    </button>

                </div>
              )}
            </main>
          </div>
        </ProfileBackground>  
    </HomeContainer>
  );
}