/* eslint-disable jsx-a11y/control-has-associated-label */
import { Outlet } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';
import { ProgressBar } from 'primereact/progressbar';
import Header from './header';
import Sidebar from './sidebar';

export default function MainLayout() {
  const loading = useIsFetching();
  return (
    <div className="relative flex max-h-screen min-h-screen flex-col">
      {loading > 0 && (
        <div className="w-full p-0 m-0">
          <ProgressBar
            mode="indeterminate"
            style={{ height: '4px' }}
          />
        </div>
      )}

      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <Sidebar />
          <main className="bg-gray-100 rounded w-full flex-grow">
            {' '}
            {/* Add flex-grow class */}
            <Header />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
