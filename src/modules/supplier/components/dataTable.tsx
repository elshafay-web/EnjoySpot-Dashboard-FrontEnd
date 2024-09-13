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
import { ISupplier } from '@domains/ISupplier';
import ToggleButton from '@components/ToggleButton';
import { DataTable } from 'primereact/datatable';
import { toggleSupplier } from '@apis/supplier/api';
import { formatDate } from '@helpers/helpingFun';

type Props = {
  onEdit: (data: ISupplier) => void;
  suppliers: ISupplier[];
};

export default function SuppliersDataTable({ onEdit, suppliers }: Props) {
  const queryClient = useQueryClient();
  const { mutate: toggleSupplierMutation } = useMutation({
    mutationKey: ['toggleSupplier'],
    mutationFn: (id: number) => toggleSupplier(id),
    onSuccess(res) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['getAllSupppliers'] });
    },
  });

  const statusBodyTemplate = (data: ISupplier): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  );

  const reject = () => {};

  const togglePopUp = (event: any, data: ISupplier) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.name}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleSupplierMutation(data.id);
        },
        reject,
      });
    }
  };

  const actionTemplate = (rowData: ISupplier) => (
    <div className="flex justify-start w-[150px]">
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
          value={suppliers ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column header="Name" field="name" />
          <Column field="officeAddress" header="Office Address" />
          <Column field="landlineOrMobile" header="Phone" />
          <Column field="manager" header="Manger" />
          <Column field="managerContactNumber" header="Manger Number" />
          <Column
            field="attachment_Agreement_ExpireDate"
            header="Agreement ExpireDate"
            body={(rowData) =>
              formatDate(rowData?.attachment_Agreement_ExpireDate)
            }
          />
          <Column
            field="attachment_License_ExpireDate"
            header="License ExpireDate"
            body={(rowData) => formatDate(rowData?.attachment_License_ExpireDate)}
          />
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
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  );
}
