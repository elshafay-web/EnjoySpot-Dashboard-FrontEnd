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
import { IUser } from '@domains/IUser';
import { toggleUser } from '@apis/user/api';

type Props = {
  onEdit: (data: IUser) => void;
  Users: IUser[];
};

export default function UsersDataTable({ onEdit, Users }: Props) {
  const queryClient = useQueryClient();
  const { mutate: toggleUserMutation } = useMutation({
    mutationKey: ['toggleUser'],
    mutationFn: (id: string) => toggleUser(id),
    onSuccess(res) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
    },
  });

  const statusBodyTemplate = (data: IUser): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  );

  const reject = () => {};

  const togglePopUp = (event: any, data: IUser) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.firstName}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleUserMutation(data.id);
        },
        reject,
      });
    }
  };

  const actionTemplate = (rowData: IUser) => (
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
          value={Users ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
          <Column field="userName" header="User Name" />
          <Column field="email" header="Email" />
          <Column field="phoneNumber" header="Phone Number" />
          <Column field="roleName" header="Role" />
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
