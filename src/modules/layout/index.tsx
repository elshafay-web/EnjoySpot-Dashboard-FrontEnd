/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom'
import { useIsFetching } from '@tanstack/react-query'
import Header from './header'
import Sidebar from './sidebar'

export default function MainLayout() {
  const loading = useIsFetching()
  return (
    <div className="relative flex max-h-screen min-h-screen flex-col">
      {loading ? (
        <div
          className="absolute top-0 z-[999] flex h-1 w-full overflow-hidden  bg-gray-200"
          role="progressbar"
        >
          <div className="animate-progress bg-primary flex flex-col justify-center overflow-hidden  whitespace-nowrap text-center text-xs text-white" />
        </div>
      ) : (
        ''
      )}
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main className="bg-gray-100 rounded w-full">
            <Header />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
