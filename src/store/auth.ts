import { create } from 'zustand';

type TUser = {
  name: string;
  surname: string;
  email: string;
  avatar: string;
}

type TUserStore = {
  isAuthenticated: boolean;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  setIsAuthenticated: (isTrue: boolean) => void;
  setUserData: (data: TUser) => void;
  removeUserData: () => void;
};

export const useUserStore = create<TUserStore>(set => ({
      isAuthenticated: false,
      name: '',
      surname: '',
      email: '',
      avatar: '',
      setIsAuthenticated: isTrue => set({ isAuthenticated: isTrue }),
      setUserData: data => set({
        name: data.name,
        surname: data.surname,
        email: data.email, 
        avatar: data.avatar,
      }),
      removeUserData: () => set({
        name: '',
        surname: '',
        email: '', 
        avatar: '',
      })
}));