import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'
import { checkTokenCookie, getCookie, setCookie } from '@/helpers/cookies'
import { UserToken } from '@/domains/IUser'

interface LoginState {
  userData: UserToken
  updateUserData: (token: UserToken) => void
}
let userToken: UserToken = {} as UserToken
try {
  userToken = checkTokenCookie()
    ? {
        ...jwtDecode(getCookie('token')),
      }
    : ({} as UserToken)
} catch (error) {
  setCookie('token', undefined, true)
  toast.error('خطأ ف المصادقة - invalid auth token' + error)
}

export const useUserData = create<LoginState>(set => ({
  userData: userToken,
  updateUserData: (token: UserToken) => set(() => ({ userData: token })),
}))
