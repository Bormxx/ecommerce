import { create } from "zustand"
import { Product, Users } from "../types"

export const useUsersStore = create<Users>((set) => ({
  id: Date.now(),
  name: '',
  setName: (name: string) => set({ name }),
  surname: '',
  setSurname: (surname: string) => set({ surname }),
  avatar: '',
  setAvatar: (avatar: string) => set({ avatar }),
  email: '',
  setEmail: (email: string) => set({ email }),
  password: '',
  setPassword: (password: string) => set({ password }),
}))

export const useItemsStore = create<Product>((set) => ({
  id: Date.now(),
  title: '',
  price: 0,
  description: '',
  availability: false,
}))