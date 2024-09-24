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
import { IRole } from '@domains/IRole';
import { toggleRole } from '@apis/roles/apis';

type Props = {
  onEdit: (data: IRole) => void;
  Users: IRole[];
};

export default function RolesDataTable({ onEdit, Users }: Props) {
  const queryClient = useQueryClient();
  const { mutate: toggleRoleMutation } = useMutation({
    mutationKey: ['toggleRole'],
    mutationFn: (id: string) => toggleRole(id),
    onSuccess(res) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['getAllRoles'] });
    },
  });

  const statusBodyTemplate = (data: IRole): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  );

  const reject = () => {};

  const togglePopUp = (event: any, data: IRole) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.name}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleRoleMutation(data.id);
        },
        reject,
      });
    }
  };

  const actionTemplate = (rowData: IRole) => (
    <div className="flex justify-center w-full">
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
          <Column field="name" header="Role Name" />
          <Column
            field="isActive"
            header="Status"
            body={(rowData) => statusBodyTemplate(rowData)}
          />
          <Column
            field="Action"
            header="actions"
            body={(rowData) => actionTemplate(rowData)}
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  );
}
