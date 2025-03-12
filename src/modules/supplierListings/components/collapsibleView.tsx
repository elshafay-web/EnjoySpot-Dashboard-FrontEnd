/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { ReactNode, useState } from 'react';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import { IListing } from '@domains/IListing';
import { IList } from '@modules/lookups/core/_models';
import ToggleButton from '@components/ToggleButton';
import { DataTable } from 'primereact/datatable';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { toggleListing, useGetListingsBySupplier } from '@apis/listing/apis';

type Props = {
  onEdit: (data: IListing) => void;
  onView: (data: IListing) => void;
  suppliers: IList[];
  onSelectionChange: (listings: IListing[]) => void;
};

export default function SupplierListingsCollapsible({
  onEdit,
  onView,
  suppliers,
  onSelectionChange,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedListings, setSelectedListings] = useState<IListing[]>([]);
  const queryClient = useQueryClient();

  const { mutate: toggleListingMutation } = useMutation({
    mutationKey: ['toggleListing'],
    mutationFn: (id: number) => toggleListing(id),
    onSuccess(res) {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['getListingsBySupplier'] });
    },
  });

  const statusBodyTemplate = (data: IListing): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  );

  const reject = () => {};

  const togglePopUp = (event: any, data: IListing) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.name}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleListingMutation(data.id);
        },
        reject,
      });
    }
  };

  const actionTemplate = (rowData: IListing) => (
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
      <Button
        icon="pi pi-eye"
        rounded
        text
        raised
        aria-label="Filter"
        tooltipOptions={{ position: 'bottom' }}
        tooltip="View"
        severity="secondary"
        className="me-2"
        onClick={() => onView(rowData)}
      />
    </div>
  );

  const handleSelectionChange = (e: any) => {
    setSelectedListings(e.value);
    onSelectionChange(e.value);
  };

  const handleTabChange = (e: any) => {
    setActiveIndex(e.index);
    setSelectedListings([]);
    onSelectionChange([]);
  };

  const SupplierListingsTable = ({ supplierId }: { supplierId: number }) => {
    const { data: listings } = useGetListingsBySupplier(supplierId);

    return (
      <div className="table-container" style={{ position: 'relative' }}>
        <DataTable
          value={listings ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
          selection={selectedListings}
          onSelectionChange={handleSelectionChange}
          selectionMode="checkbox"
          dataKey="id"
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column field="name" header="Name" />
          <Column field="listingTypeName" header="Listing Type" />
          <Column field="listingCategoryName" header="Listing Category" />
          <Column
            field="price"
            header="Price"
            body={(x) => <div>{x.price} AED</div>}
          />
          <Column
            className="w-[100px]"
            field="isActive"
            header="Status"
            body={(rowData) => statusBodyTemplate(rowData)}
          />
          <Column
            field="Action"
            header="Actions"
            body={(rowData) => actionTemplate(rowData)}
            className="w-[250px]"
          />
        </DataTable>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <Accordion activeIndex={activeIndex} onTabChange={handleTabChange}>
        {suppliers.map((supplier) => (
          <AccordionTab key={supplier.id} header={supplier.name}>
            <SupplierListingsTable supplierId={supplier.id} />
          </AccordionTab>
        ))}
      </Accordion>
      <ConfirmPopup />
    </div>
  );
}
