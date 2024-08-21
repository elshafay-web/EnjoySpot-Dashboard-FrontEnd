import { useLogin } from '@apis/auth/apis'
import SubmitBtn from '@components/createButton'
import Input from '@components/input'
import { LoginRequest, UserData } from '@domains/IUser'
import { setCookie } from '@helpers/cookies'
import { useUserData } from '@store/auth'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjhhYWQ4ZTViLTI5MzMtNDI3NC04YmRhLTBlYTI5YWUxYzRmNSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInVpZCI6IjIiLCJjb21wYW55aWQiOiIzIiwiY29tcGFueUNvZGUiOiJjMDAwMSIsImJyYW5jaGlkIjoiMyIsImVtcGxveWVlaWQiOiIzIiwicm9sZXMiOiJBZG1pbiIsImV4cCI6MTcyNDI5OTkwOSwiaXNzIjoiQXR0ZW5kYW5jZU1hbmFnZW1lbnQifQ.PZU7qrdTsiJdtEeDXyu-IPzBtnSO2FYVq0T5NW8-bCI'
export default function AuthPage() {
  const { updateUserData } = useUserData()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onChange', // or 'onBlur', 'onTouched'
    criteriaMode: 'all',
  })

  const { mutate: login, isPending } = useLogin({
    onSuccess(res) {
      // const UserData: UserData = jwtDecode(res.data.token)
      // setCookie('token', res?.data.token)
      // updateUserData({ ...UserData })
      // navigate('/', {
      //   replace: true,
      // })
      // window.location.reload()
    },
  })

  const onSubmit = async (loginData: any) => {
    // login(loginData)

    const UserData: UserData = jwtDecode(token)
    setCookie('token', token)
    updateUserData({ ...UserData })
    navigate('/', {
      replace: true,
    })
    window.location.reload()
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Enjoy Spot CMS
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                    inputName: 'userName',
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
  )
}
