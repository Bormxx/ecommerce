import { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "../../../../public/images/initial_avatar.png";
import CameraIcon from "../../../../public/icons/camera_icon.svg";

interface ProfileSectionProps {
  name: string;
  surname: string;
  email: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (data: { name: string; surname: string; email: string }) => void;
  onCancel: () => void;
}

export default function ProfileSection({
  name,
  surname,
  email,
  isEditing = false,
  onSave,
  onCancel,
  onEdit,
}: ProfileSectionProps) {
  const [formData, setFormData] = useState({ name, surname, email });

  useEffect(() => {
    setFormData({ name, surname, email });
  }, [name, surname, email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {isEditing ? (
        <div className="max-w-[580px] rounded-xl bg-white pb-6 pl-4 pr-4 pt-6 shadow-lg">
          <div className="relative h-20 w-[100px]">
            <Image
              className="rounded-full"
              src={Avatar}
              width={80}
              height={80}
              alt="Avatar"
            />
            <div className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-[#1E40AF] p-2">
              <Image
                src={CameraIcon}
                width={24}
                height={24}
                alt="Edit avatar"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-[14px] font-normal leading-5 text-[#6B7280]">
                  Имя:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#9CA3AF] bg-[#F3F4F6] px-3 py-[7px] text-gray-800 focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-[14px] font-normal leading-5 text-[#6B7280]">
                  Фамилия:
                </label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-[#9CA3AF] bg-[#F3F4F6] px-3 py-[7px] text-gray-800 focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="mt-2">
              <label className="block text-[14px] font-normal leading-5 text-[#6B7280]">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full max-w-[258px] rounded-[4px] border border-[#9CA3AF] bg-[#F3F4F6] px-3 py-[7px] text-gray-800 focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mt-6 flex justify-start gap-2">
              <button
                className="rounded-md border border-[#1E40AF] px-4 py-[7px] text-[16px] font-[700] leading-6 text-[#1E40AF] transition hover:bg-blue-50"
                onClick={onCancel}
              >
                Отменить
              </button>
              <button
                className="rounded-md bg-[#1E40AF] px-4 py-[7px] text-[16px] font-[700] leading-6 text-white transition hover:bg-blue-700"
                onClick={() => onSave(formData)}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex max-w-[580px] items-center justify-between rounded-xl bg-white p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <Image
              className="rounded-full"
              src={Avatar}
              width={80}
              height={80}
              alt="Avatar"
            />
            <div className="space-y-2 text-lg font-medium leading-6 text-[#1F2937]">
              <h2>{`${name} ${surname}`}</h2>
              <p>{email}</p>
            </div>
          </div>
          <button
            className="rounded-[6px] border border-[#1E40AF] bg-white px-[17px] py-[7px] text-[16px] font-bold leading-6 text-[#1E40AF] transition-colors duration-200 hover:bg-[#1E40AF] hover:text-white"
            onClick={onEdit}
          >
            Редактировать
          </button>
        </div>
      )}
    </>
  );
}
