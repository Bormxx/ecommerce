import { useState } from "react";
import ProfileBackground from "@/components/profile/ProfileComponents/ProfileBackground";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileSection from "@/components/profile/ProfileSection/ProfileSection";
import CustomSelect from "@/components/profile/CustomSelect/CustomSelect";
import ECMainLayout from "@/components/layouts/main-layout";

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

  const handleSave = (updatedData: {
    name: string;
    surname: string;
    email: string;
  }) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  return (
    <ECMainLayout>
      <ProfileBackground>
        <div className="flex h-[90vh] pt-10">
          <Sidebar />

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
                <label className="block text-[14px] font-normal leading-5 text-[#6B7280]">
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
                    className="text-[14px] font-normal leading-5 text-[#1F2937]"
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
                    className="ml-2 text-[14px] font-normal leading-5 text-[#1F2937]"
                  >
                    Ночная тема
                  </label>
                </div>
              </div>
            )}
          </main>
        </div>
      </ProfileBackground>
    </ECMainLayout>
  );
}
