import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { UserData } from '@domains/IUser';
import { checkTokenCookie, getCookie, setCookie } from '@/helpers/cookies';

interface LoginState {
  userData: UserData;
  updateUserData: (token: UserData) => void;
}
let userToken: UserData = {} as UserData;
try {
  userToken = checkTokenCookie()
    ? {
        ...jwtDecode(getCookie('token')),
      }
    : ({} as UserData);
} catch (error) {
  setCookie('token', undefined, true);
  toast.error(`خطأ ف المصادقة - invalid auth token${error}`);
}

export const useUserData = create<LoginState>((set) => ({
  userData: userToken,
  updateUserData: (token: UserData) => set(() => ({ userData: token })),
}));
