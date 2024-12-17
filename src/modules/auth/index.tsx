/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogin } from '@apis/auth/apis';
import SubmitBtn from '@components/createButton';
import Input from '@components/input';
import { LoginRequest } from '@domains/IUser';
import { useUserData } from '@store/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function AuthPage() {
  const { updateUserData } = useUserData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onChange', // or 'onBlur', 'onTouched'
    criteriaMode: 'all',
  });

  const { mutate: login, isPending } = useLogin({
    onSuccess(res) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('UserData', JSON.stringify(res.data));
      updateUserData({ ...res.data });
      navigate('/', {
        replace: true,
      });
      window.location.reload();
    },
  });

  const onSubmit = async (loginData: any) => {
    login(loginData);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-3xl font-meduim text-gray-900 ">
          <img className="w-8 h-8 mr-2" src="EnjoySpot_Icon.svg" alt="logo" />
          Enjoy Spot CMS
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <Input
                  register={register}
                  errors={errors}
                  field={{
                    inputName: 'UserNameOrEmail',
                    title: 'User Name',
                    isRequired: true,
                    minLength: 3,
                    maxLength: 20,
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  register={register}
                  errors={errors}
                  field={{
                    inputName: 'password',
                    title: 'Password',
                    isRequired: true,
                    minLength: 3,
                    maxLength: 20,
                    isPassword: true,
                  }}
                />
              </div>
              <div className="w-full flex items-center justify-between">
                <div className="flex items-start w-full">
                  <div className="flex items-center w-full">
                    <SubmitBtn title="Log In" loading={isPending} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
