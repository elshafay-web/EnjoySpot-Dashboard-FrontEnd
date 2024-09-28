/* eslint-disable @typescript-eslint/no-explicit-any */
import FilterButton from '@components/FilterButton';
import { PageHeader } from '@components/page-header';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from 'react';
import { useGetAllTransactions } from '@apis/transactioins/apis';
import { ITransactionRequestFilter } from '@domains/ITransactions';
import TransactionsDataTable from './componnets/dataTable';
import SearchForTransactions from './componnets/search';

export default function TransactioinsPage() {
  const op = useRef<any>(null);
  const [filter, setFilter] = useState({
    ...({} as ITransactionRequestFilter),
    isActive: true,
  });
  const { data: transactions } = useGetAllTransactions(filter);
  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e);
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Transactions"
            icon="fa-solid fa-circle-dollar-to-slot"
          />
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForTransactions
                    onSearch={(data) => setFilter(data)}
                    onClear={() => {
                      setFilter({
                        ...({} as ITransactionRequestFilter),
                        isActive: true,
                      });
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
          </div>
        </div>
        <TransactionsDataTable transactions={transactions || []} />
      </div>
    </div>
  );
}
