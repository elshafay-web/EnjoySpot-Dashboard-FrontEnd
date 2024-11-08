import { create } from 'zustand';
import { toast } from 'sonner';
import { UserData } from '@domains/IUser';

interface LoginState {
  userData: UserData;
  updateUserData: (token: UserData) => void;
}
let userToken: UserData = {} as UserData;
try {
  userToken = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('UserData') ?? '')
    : ({} as UserData);
} catch (e) {
  localStorage.clear();
  toast.error('خطأ ف المصادقة - invalid auth token');
}

export const useUserData = create<LoginState>((set) => ({
  userData: userToken,
  updateUserData: (data: UserData) => set(() => ({ userData: data })),
}));
