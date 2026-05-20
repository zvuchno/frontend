import { create } from "zustand"

export interface UserDataProps {
  id: number | null;
  userName: string | null;
  email: string | null;
  phone: string | null;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isListener: boolean;
  isArtist: boolean;
  artistName?: string | null;
  accessToken?: string;
}

export interface UserStoreProps {
  user: UserDataProps | null;
  isUserAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: UserDataProps | null) => void;
  setIsUserAuthorized: (auth: boolean) => void;
  setIsLoading: (load: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}
    
export const useUserStore = create<UserStoreProps>()((set) => ({
  user: null,
  isUserAuthorized: false,
  isLoading: false,
  error: null,

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
  })
}))