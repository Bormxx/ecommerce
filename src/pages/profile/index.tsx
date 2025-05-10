import { useState } from "react";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProfileBackground from "@/components/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "@/components/ProfileSection/ProfileSection";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../../shared/hooks/useProtectedRoute";

interface ProfileProps {
  name?: string;
  surname?: string;
  email?: string;
}

export default function Profile({
  name = "Ярополк",
  surname = "Иванов",
  email = "",
}: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name, surname, email });
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleSave = (updatedData: { name: string; surname: string; email: string }) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedRoute}>
        <ProfileBackground imageUrl="/images/sport_meditation.svg">
          <div className="flex h-[90vh] p-5 md:pt-10">
            <Sidebar />

            <main className="flex-1 pl-1 md:pl-5">
              <h1 className="mb-4 block text-[24px] font-bold leading-8 text-[#1F2937] md:hidden">
                Мой профиль
              </h1>

              <ProfileSection
                {...profileData}
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onCancel={() => setIsEditing(false)}
                onSave={handleSave}
              />

              {!isEditing && (
                <div className="mt-4">
                  <label className="block text-[12px] font-normal leading-4 text-[#6B7280] md:text-[14px] md:leading-5">
                    Язык:
                  </label>

                  <CustomSelect />

                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailNotify"
                      className="h-[16px] w-[16px] cursor-pointer rounded-full border border-[#9CA3AF] bg-[#F9FAFB]"
                    />
                    <label
                      htmlFor="emailNotify"
                      className="text-[12px] font-normal leading-4 text-[#1F2937] md:text-[14px] md:leading-5"
                    >
                      Уведомлять об изменении статуса заказов по email
                    </label>
                  </div>

                  <div className="mt-4 flex items-center">
                    <input
                      type="checkbox"
                      id="darkModeToggle"
                      className="peer sr-only"
                    />

                    <label
                      htmlFor="darkModeToggle"
                      className="flex h-5 w-10 cursor-pointer items-center rounded-full bg-[#9CA3AF] p-[2px] transition-colors peer-checked:bg-gray-600"
                    >
                      <span className="h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-5"></span>
                    </label>

                    <label
                      htmlFor="darkModeToggle"
                      className="ml-2 text-[12px] font-normal leading-4 text-[#1F2937] md:text-[14px] md:leading-5"
                    >
                      Ночная тема
                    </label>
                  </div>
                </div>
              )}
            </main>
          </div>
        </ProfileBackground>
      </ProtectedRoute>
    </HomeContainer>
  );
}