import { useIsFetching } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'

const SubmitBtn: FC<{
  title: string
  loading?: boolean
  type?: 'submit' | 'reset' | 'button'
  icon?: ReactNode
}> = ({ title, type = 'submit', icon, loading, ...rest }) => {
  const isFetching = useIsFetching()

  return (
    <button
      type={type}
      disabled={isFetching > 0 || loading}
      className={clsx(
        'w-full px-4 py-2 text-lg font-semibold transition-colors duration-300 rounded-md shadow focus:outline-none focus:ring-4',
        isFetching > 0 || loading
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed focus:ring-gray-200'
          : 'bg-lightBlue text-white hover:bg-blue-600 focus:ring-blue-200'
      )}
      {...rest}
    >
      {title}
      {icon}
    </button>
  )
}

export default SubmitBtn
