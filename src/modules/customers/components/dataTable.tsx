/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { ReactNode } from 'react';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import ToggleButton from '@components/ToggleButton';
import { DataTable } from 'primereact/datatable';
import { toggleCustomer } from '@apis/customer/apis';
import { ICustomer } from '@domains/ICustomer';
import { formatDate } from '@helpers/helpingFun';

type Props = {
  onEdit: (data: ICustomer) => void;
  Customers: ICustomer[];
};

export default function CustomersDataTable({ onEdit, Customers }: Props) {
  const queryClient = useQueryClient();
  const { mutate: toggleCustomerMutation } = useMutation({
    mutationKey: ['toggleCustomer'],
    mutationFn: (id: number) => toggleCustomer(id),
    onSuccess(res) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
    },
  });

  const statusBodyTemplate = (data: ICustomer): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  );

  const reject = () => {};

  const togglePopUp = (event: any, data: ICustomer) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.name}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleCustomerMutation(data.id);
        },
        reject,
      });
    }
  };

  const actionTemplate = (rowData: ICustomer) => (
    <div className="flex justify-start w-full">
      <ToggleButton
        isActive={rowData.isActive}
        onClick={(e) => togglePopUp(e, rowData)}
      />
      <Button
        icon="pi pi-pencil"
        rounded
        text
        raised
        aria-label="Filter"
        tooltipOptions={{ position: 'bottom' }}
        tooltip="Edit"
        severity="info"
        className="me-2"
        onClick={() => onEdit(rowData)}
      />
    </div>
  );

  return (
    <div className="mt-4">
      <div className="table-container" style={{ position: 'relative' }}>
        <DataTable
          value={Customers ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column field="name" header="Name" />
          <Column field="landlineOrMobile" header="Mobile" />
          <Column field="userName" header="User Name" />
          <Column field="email" header="Email" />
          <Column
            field="dateOfBirth"
            header="Birth Date"
            body={(x) => formatDate(new Date(x.dateOfBirth))}
          />
          <Column field="source" header="Source" />
          <Column field="nationalityName" header="Nationality" />
          <Column
            className="w-[100px]"
            field="isActive"
            header="Status"
            body={(rowData) => statusBodyTemplate(rowData)}
          />
          <Column
            field="Action"
            header="actions"
            body={(rowData) => actionTemplate(rowData)}
            className="w-[250px]"
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  );
}
