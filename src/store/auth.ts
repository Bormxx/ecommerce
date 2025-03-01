import { create } from "zustand";
import { persist } from "zustand/middleware";

type TUser = {
  name: string;
  surname: string;
  email: string;
  avatar: string;
};

type TUserStore = {
  isAuthenticated: boolean;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  isHydrated: boolean;
  setIsAuthenticated: (isTrue: boolean) => void;
  setUserData: (data: TUser) => void;
  removeUserData: () => void;
  setHydrated: (isTrue: boolean) => void;
};

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      name: "",
      surname: "",
      email: "",
      avatar: "",
      setIsAuthenticated: (isTrue) => set({ isAuthenticated: isTrue }),
      setUserData: (data) =>
        set({
          name: data.name,
          surname: data.surname,
          email: data.email,
          avatar: data.avatar,
        }),
      removeUserData: () =>
        set({
          name: "",
          surname: "",
          email: "",
          avatar: "",
        }),
      isHydrated: false,
      setHydrated: (isTrue) => set({ isHydrated: isTrue }),
    }),
    {
      name: "user-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
