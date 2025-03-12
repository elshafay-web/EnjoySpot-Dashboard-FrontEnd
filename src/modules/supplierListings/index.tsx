/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { PageHeader } from '@components/page-header';
import FilterButton from '@components/FilterButton';
import { useQueryClient } from '@tanstack/react-query';
import { IListing } from '@domains/IListing';
import { useListOfSupppliers } from '@apis/supplier/api';
import { useGetListingsBySupplier } from '@apis/listing/apis';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { ConfirmPopup } from 'primereact/confirmpopup';
import UpsertListing from '../listing/components/upsert';
import ViewListing from '../listing/components/view';
import SupplierListingsDataTable from './components/dataTable';
import SupplierListingsCollapsible from './components/collapsibleView';
import SearchForSupplierListings from './components/search';

export default function SupplierListingsPage() {
  const op = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [ListingObj, setListingObj] = useState<IListing>({} as IListing);
  const [selectedSupplier, setSelectedSupplier] = useState<number>(0);
  const [viewMode, setViewMode] = useState<string>('collapsible');
  const [selectedListings, setSelectedListings] = useState<IListing[]>([]);
  const [filter, setFilter] = useState({
    SupplierId: 0,
    Search: '',
    PageNumber: 1,
    PageSize: 10,
    isActive: true,
  });

  const { data: suppliers } = useListOfSupppliers();
  const { data: listings } = useGetListingsBySupplier(selectedSupplier);
  const queryClient = useQueryClient();

  // Set the first supplier as default when suppliers data is loaded
  useEffect(() => {
    if (suppliers && suppliers.length > 0 && selectedSupplier === 0) {
      setSelectedSupplier(suppliers[0].id);
      setFilter((prev) => ({ ...prev, SupplierId: suppliers[0].id }));
    }
  }, [suppliers, selectedSupplier]);

  const onEdit = (profile: IListing) => {
    if (profile && profile.id > 0) {
      setListingObj(profile);
      setOpen(true);
    }
  };

  const onView = (profile: IListing) => {
    if (profile && profile.id > 0) {
      setListingObj(profile);
      setView(true);
    }
  };

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e);
  };

  const viewOptions = [
    { label: 'Collapsible View', value: 'collapsible' },
    { label: 'Table View', value: 'table' },
  ];

  const handleSelectionChange = (selectedItems: IListing[]) => {
    setSelectedListings(selectedItems);
  };

  const handleBulkAction = (action: 'sync' | 'update' | 'delete') => {
    if (selectedListings.length === 0) return;

    // Implement bulk actions based on the selected action
    switch (action) {
      case 'sync':
        // Implement sync logic
        console.log('Syncing listings:', selectedListings);
        break;
      case 'update':
        // Implement update logic
        console.log('Updating listings:', selectedListings);
        break;
      case 'delete':
        // Implement delete logic
        console.log('Deleting listings:', selectedListings);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Supplier Listings"
            icon="fa-solid fa-building-user"
          />
          <div className="flex items-center justify-start">
            <SelectButton
              value={viewMode}
              options={viewOptions}
              onChange={(e) => setViewMode(e.value)}
              className="mx-2"
            />
          </div>
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForSupplierListings
                    onSearch={(searchData: any) => {
                      setFilter(searchData);
                      setSelectedSupplier(searchData.SupplierId);
                    }}
                    onClear={() => {
                      if (suppliers && suppliers.length > 0) {
                        setSelectedSupplier(suppliers[0].id);
                        setFilter({
                          SupplierId: suppliers[0].id,
                          Search: '',
                          PageNumber: 1,
                          PageSize: 10,
                          isActive: true,
                        });
                      }
                    }}
                    defaultValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
          </div>
        </div>

        {/* Show bulk action buttons when listings are selected */}
        {selectedListings.length > 0 && (
          <div className="flex gap-2 my-3 p-3 bg-blue-50 rounded">
            <span className="font-bold flex items-center">
              {selectedListings.length} listings selected
            </span>
            <Button
              label="Sync"
              icon="pi pi-sync"
              className="p-button-sm"
              onClick={() => handleBulkAction('sync')}
            />
            <Button
              label="Update"
              icon="pi pi-pencil"
              className="p-button-sm p-button-success"
              onClick={() => handleBulkAction('update')}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              className="p-button-sm p-button-danger"
              onClick={() => handleBulkAction('delete')}
            />
          </div>
        )}

        {viewMode === 'collapsible' ? (
          <SupplierListingsCollapsible
            onEdit={onEdit}
            onView={onView}
            suppliers={suppliers || []}
            onSelectionChange={handleSelectionChange}
          />
        ) : (
          <SupplierListingsDataTable
            onEdit={onEdit}
            onView={onView}
            listings={listings || []}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </div>

      <UpsertListing
        open={open}
        intialValues={ListingObj || ({} as IListing)}
        mode={Object.keys(ListingObj).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setListingObj({} as IListing);
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['getListingsBySupplier'],
          });
        }}
      />

      <ViewListing
        open={view}
        profile={ListingObj || ({} as IListing)}
        onClose={() => {
          setListingObj({} as IListing);
          setView(false);
        }}
      />
      <ConfirmPopup />
    </div>
  );
}
