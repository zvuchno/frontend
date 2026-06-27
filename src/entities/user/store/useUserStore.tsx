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
  isUserAuthorized: boolean | undefined;
  isLoading: boolean;
  error: string | null;
  // email на этапе регистрации для модального окна о письме подтверждения
  tempEmail: string | null;
  
  setUser: (user: UserDataProps | null) => void;
  setIsUserAuthorized: (auth: boolean) => void;
  setIsLoading: (load: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
  setTempEmail: (email: string) => void;
}
    
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