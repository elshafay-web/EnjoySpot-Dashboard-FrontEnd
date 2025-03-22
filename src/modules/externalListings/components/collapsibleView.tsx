/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { ReactNode, useState } from 'react';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import { IListing } from '@domains/IListing';
import { IList } from '@modules/lookups/core/_models';
import { DataTable } from 'primereact/datatable';
import { Accordion, AccordionTab } from 'primereact/accordion';

type Props = {
  suppliers: IList[];
  onSelectionChange: (listings: IListing[]) => void;
  externalListings?: IListing[];
  onView?: (listing: IListing) => void;
};

export default function ExternalListingsCollapsible({
  suppliers,
  onSelectionChange,
  externalListings = [],
  onView,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedListings, setSelectedListings] = useState<IListing[]>([]);

  const syncStatusTemplate = (data: IListing): ReactNode => (
    <Tag
      value={data.isPublished ? 'Published' : 'Not Published'}
      severity={data.isPublished ? 'success' : 'warning'}
    />
  );

  const actionTemplate = (rowData: IListing) => (
    <div className="flex justify-start w-full">
      <Button
        icon="pi pi-eye"
        rounded
        text
        raised
        aria-label="View"
        tooltipOptions={{ position: 'bottom' }}
        tooltip="View"
        severity="secondary"
        className="me-2"
        onClick={() => onView && onView(rowData)}
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

  const ExternalListingsTable = ({
    supplierName,
  }: {
    supplierName: string;
  }) => {
    const filteredExternalListings = externalListings.filter(
      (listing) => listing.supplierName === supplierName,
    );

    return (
      <div className="table-container" style={{ position: 'relative' }}>
        <DataTable
          value={filteredExternalListings ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
          selection={selectedListings}
          onSelectionChange={handleSelectionChange}
          selectionMode="checkbox"
          dataKey="id"
          emptyMessage="No external listings found for this supplier"
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
            field="isPublished"
            header="Sync Status"
            body={(rowData) => syncStatusTemplate(rowData)}
          />
          <Column
            field="Action"
            header="Actions"
            body={(rowData) => actionTemplate(rowData)}
            className="w-[150px]"
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
            <ExternalListingsTable supplierName={supplier.name} />
          </AccordionTab>
        ))}
      </Accordion>
      <ConfirmPopup />
    </div>
  );
}
