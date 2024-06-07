import { create } from "zustand";

const useAuthStore: any = create((set: any) => ({
  user: null,
  setUser: (newData: any) => set({ user: newData }),
}));

export { useAuthStore };
