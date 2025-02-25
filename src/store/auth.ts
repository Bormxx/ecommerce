import { create } from "zustand"

export type TUser = {
  name: string,
  surname: string,
  email: string,
  avatar: string,
}

type TUserStore = {
  isAuthenticated: boolean,
  userData: TUser,
  setIsAuthenticated: (isTrue: boolean) => void,
  setUserData: (data: TUser) => void,
};

export const useUserStore = create<TUserStore>(set => ({
    isAuthenticated: false,
    userData: {
      name: '',
      surname: '',
      email: '',
      avatar: '',
    },
    setIsAuthenticated: isAuthenticated => set({isAuthenticated}),
    setUserData: userData => set({userData}),
  }),
);