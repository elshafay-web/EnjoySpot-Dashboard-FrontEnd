/* eslint-disable react/jsx-key */
import DataCard from './components/dataCard';
import DashboardDataTable from './components/datatable';

export default function DashboardPage() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {' '}
        {[{}, {}, {}, {}].map(() => (
          <DataCard />
        ))}{' '}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <DashboardDataTable />
        </div>

        <div className="col-span-1">
          {' '}
          {[{}, {}].map(() => (
            <DataCard />
          ))}{' '}
        </div>
      </div>
    </div>
  );
}
