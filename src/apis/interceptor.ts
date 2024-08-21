import { useEffect } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { getCookie, setCookie } from '@/helpers/cookies'

const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (getCookie('token')) {
          config.headers.Authorization = `bearer ${getCookie('token')}`
        }
        return config
      },
      error => {
        if (error.response.status === 401) {
          setCookie('token', undefined)
          toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد')
        } else if (error.response.status === 404) {
          toast.error('هذه الصفحة غير موجودة')
        } else if (error.response.status === 400) {
          toast.error('البيانات المرسلة غير مكتملة برجاء المحاولة مرة اخرى')
        } else if (error.response.status === 403) {
          toast.error('ليس لديك صلاحية الدخول')
        } else {
          toast.error(error)
        }
        return Promise.reject(error)
      }
    )

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          setCookie('token', undefined)
          toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد')
          location.reload()
        } else if (error.response.status === 404) {
          toast.error('هذه الصفحة غير موجودة')
        } else if (error.response.status === 400) {
          toast.error('البيانات المرسلة غير مكتملة برجاء المحاولة مرة اخرى')
        } else if (error.response.status === 403) {
          toast.error('ليس لديك صلاحية الدخول')
        } else {
          console.log(error.message)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])
}

export default useAxiosInterceptors
