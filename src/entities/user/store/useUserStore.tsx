import { create } from "zustand"
import type { UserStoreProps } from "../model/types"


    
export const useUserStore = create<UserStoreProps>()((set) => ({
  user: null,
  isUserAuthorized: undefined,
  isLoading: false,
  error: null,
  tempEmail: null,

  setUser: (user) => set({ 
    user,
    isUserAuthorized: !!user,
  }),
  setIsUserAuthorized: (auth) => set({ isUserAuthorized: auth }),
  setIsLoading: (load) => set({ isLoading: load }),
  setError: (error) => set({ error: error }),

  clearStore: () => set({
    user: null,
    isUserAuthorized: false,
    isLoading: false,
    error: null
  }),
  setTempEmail: (email) => set({
    tempEmail: email,
  })
}))