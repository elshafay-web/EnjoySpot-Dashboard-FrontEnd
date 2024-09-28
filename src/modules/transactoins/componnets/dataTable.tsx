/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { ReactNode } from 'react';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { DataTable } from 'primereact/datatable';
import { ITransaction } from '@domains/ITransactions';
import { formatDate } from '@helpers/helpingFun';

type Props = {
  transactions: ITransaction[];
};
export default function TransactionsDataTable({ transactions }: Props) {
  const statusBodyTemplate = (data: ITransaction): ReactNode => (
    <Tag
      value={data.isDone ? 'Done' : 'Not Done'}
      severity={data.isDone ? 'success' : 'danger'}
    />
  );
  return (
    <div className="mt-4">
      <div className="table-container" style={{ position: 'relative' }}>
        <DataTable
          value={transactions ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column field="itemName" header="Item" />
          <Column field="customerName" header="Customer" />
          <Column field="supplierName" header="Supplier " />
          <Column field="listingTypeName" header="Listing Type" />
          <Column field="listingOrPackage" header="Type" />
          <Column field="hourOrPerson" header="Price Type" />
          <Column field="status" header="Transaction Status" />
          <Column
            field="startDate"
            header="Start Date"
            body={(x) => <div>{formatDate(new Date(x.startDate))}</div>}
          />
          <Column
            field="endDate"
            header="End Date"
            body={(x) => <div>{formatDate(new Date(x.endDate))}</div>}
          />
          <Column
            className="w-[100px]"
            field="isActive"
            header="Done Status"
            body={(rowData) => statusBodyTemplate(rowData)}
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  );
}
