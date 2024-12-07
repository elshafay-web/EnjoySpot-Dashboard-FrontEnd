/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        config.headers['Accept-Language'] = 'en-US';
        return config;
      },
      (error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد');
          window.location.reload();
        } else if (error.response.status === 404) {
          toast.error('هذه الصفحة غير موجودة');
        } else if (error.response.status === 400) {
          toast.error('البيانات المرسلة غير مكتملة برجاء المحاولة مرة اخرى');
        } else if (error.response.status === 403) {
          navigate('/error-403');
        } else {
          toast.error(error);
        }
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          toast.error('انتهت الجلسة الخاصة بك برجاء تسجيل الدخول من جديد');
          window.location.reload();
        } else if (error.response.status === 404) {
          toast.error('هذه الصفحة غير موجودة');
        } else if (error.response.status === 400) {
          toast.error('البيانات المرسلة غير مكتملة برجاء المحاولة مرة اخرى');
        } else if (error.response.status === 403) {
          navigate('/error-403');
        } else {
          toast.error(error);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptors;
