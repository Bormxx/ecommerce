import { useState, useEffect  } from "react";
import Image from "next/image";
import Avatar from "../../../public/images/initial_avatar.png";
import CameraIcon from "../../../public/icons/camera_icon.svg";

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

                <div className="bg-white pt-6 pb-6 pl-4 pr-4 rounded-xl shadow-lg max-w-[580px]">

                    <div className="relative w-[100px] h-20">
                        <Image className="rounded-full" src={Avatar} width={80} height={80} alt="Avatar" />
                        <div className="absolute bottom-0 right-0 bg-[#1E40AF] p-2 rounded-full cursor-pointer">
                            <Image src={CameraIcon} width={24} height={24} alt="Edit avatar" />
                        </div>
                    </div>  

                    <div className="mt-4">
                        <div className="flex gap-4">

                            <div className="w-1/2">
                                <label className="block font-normal text-[14px] leading-5 text-[#6B7280]">Имя:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-[7px] border border-[#9CA3AF] bg-[#F3F4F6] rounded-[4px] text-gray-800 focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div className="w-1/2">
                                <label className="block font-normal text-[14px] leading-5 text-[#6B7280]">Фамилия:</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className="w-full px-3 py-[7px] border border-[#9CA3AF] bg-[#F3F4F6] rounded-[4px] text-gray-800 focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="block font-normal text-[14px] leading-5 text-[#6B7280]">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full max-w-[258px] px-3 py-[7px] border border-[#9CA3AF] bg-[#F3F4F6] rounded-[4px] text-gray-800 focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="flex justify-start gap-2 mt-6">
                            <button
                                className="px-4 py-[7px] border border-[#1E40AF] text-[#1E40AF] rounded-md font-[700] text-[16px] leading-6 hover:bg-blue-50 transition"
                                onClick={onCancel}
                            >
                                Отменить
                            </button>
                            <button
                                className="px-4 py-[7px] bg-[#1E40AF] text-white rounded-md font-[700] text-[16px] leading-6 hover:bg-blue-700 transition"
                                onClick={() => onSave(formData)}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>

                </div>

              ) : (

                <div className="bg-white p-4 rounded-xl shadow-lg flex items-center justify-between max-w-[580px]">
                    <div className="flex items-center space-x-4">
                        <Image className="rounded-full" src={Avatar} width={80} height={80} alt="Avatar" />
                        <div className="text-lg font-medium leading-6 text-[#1F2937] space-y-2">
                        <h2>{`${name} ${surname}`}</h2>
                            <p>{email}</p>
                        </div>
                    </div>
                    <button 
                        className="px-[17px] py-[7px] bg-white text-[#1E40AF] rounded-[6px] border border-[#1E40AF] font-bold text-[16px] leading-6 transition-colors duration-200 hover:bg-[#1E40AF] hover:text-white"
                        onClick={onEdit}
                        >Редактировать
                    </button>
                </div>
        
              )}
        </>
    );
  };
  