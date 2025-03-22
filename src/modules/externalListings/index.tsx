/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { PageHeader } from '@components/page-header';
import FilterButton from '@components/FilterButton';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { IListing } from '@domains/IListing';
import { useListOfSupppliers } from '@apis/supplier/api';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { toast } from 'sonner';
import {
  useGetExternalListings,
  syncExternalListings,
  publishExternalListings,
} from '@apis/external/apis';
import ViewListing from '../listing/components/view';
import ExternalListingsDataTable from './components/dataTable';
import ExternalListingsCollapsible from './components/collapsibleView';
import SearchForExternalListings from './components/search';

export default function ExternalListingsPage() {
  const op = useRef<any>(null);
  const [view, setView] = useState<boolean>(false);
  const [ListingObj, setListingObj] = useState<IListing>({} as IListing);
  const [selectedSupplier, setSelectedSupplier] = useState<number>(0);
  const [viewMode, setViewMode] = useState<string>('collapsible');
  const [selectedListings, setSelectedListings] = useState<IListing[]>([]);
  const [filter, setFilter] = useState({
    SupplierId: 0,
    supplierID: 0,
    Search: '',
    PageNumber: 1,
    PageSize: 10,
    isActive: true,
  });

  const { data: suppliers } = useListOfSupppliers();
  const { data: externalListings } = useGetExternalListings({
    supplierID: filter.supplierID || selectedSupplier,
    PageNumber: filter.PageNumber,
    PageSize: filter.PageSize,
    Search: filter.Search,
  });
  const queryClient = useQueryClient();

  // Set the first supplier as default when suppliers data is loaded
  useEffect(() => {
    if (suppliers && suppliers.length > 0 && selectedSupplier === 0) {
      setSelectedSupplier(suppliers[0].id);
      setFilter((prev) => ({
        ...prev,
        SupplierId: suppliers[0].id,
        supplierID: suppliers[0].id,
      }));
    }
  }, [suppliers, selectedSupplier]);

  const { mutate: syncMutation, isPending: isSyncing } = useMutation({
    mutationFn: syncExternalListings,
    onSuccess: (res) => {
      toast.success(res.message || 'External listings synced successfully');
      queryClient.invalidateQueries({ queryKey: ['getExternalListings'] });
    },
    onError: (error) => {
      toast.error('Failed to sync external listings');
      console.error(error);
    },
  });

  const { mutate: publishMutation, isPending: isPublishing } = useMutation({
    mutationFn: publishExternalListings,
    onSuccess: (res) => {
      toast.success(res.message || 'Listings published successfully');
      queryClient.invalidateQueries({ queryKey: ['getExternalListings'] });
      setSelectedListings([]);
    },
    onError: (error) => {
      toast.error('Failed to publish listings');
      console.error(error);
    },
  });

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

  const confirmSync = (event: React.MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to sync listings for this supplier?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        syncMutation(selectedSupplier);
      },
      reject: () => {},
    });
  };

  const confirmPublish = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedListings.length === 0) {
      toast.error('Please select at least one listing to publish');
      return;
    }

    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to publish ${selectedListings.length} selected listing(s)?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const listingIds = selectedListings.map((listing) => listing.id);
        publishMutation(listingIds);
      },
      reject: () => {},
    });
  };

  const handleBulkAction = (
    action: 'sync' | 'publish',
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (action === 'sync' && event) {
      confirmSync(event);
    } else if (action === 'publish' && event) {
      confirmPublish(event);
    }
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader
            title="External Listings"
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
            <Button
              label="Sync Listings"
              icon="pi pi-sync"
              className="p-button-sm"
              loading={isSyncing}
              onClick={(e) => handleBulkAction('sync', e)}
            />
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForExternalListings
                    onSearch={(searchData: any) => {
                      setFilter(searchData);
                      setSelectedSupplier(searchData.SupplierId);
                    }}
                    onClear={() => {
                      if (suppliers && suppliers.length > 0) {
                        setSelectedSupplier(suppliers[0].id);
                        setFilter({
                          SupplierId: suppliers[0].id,
                          supplierID: suppliers[0].id,
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
              label="Publish"
              icon="pi pi-upload"
              className="p-button-sm p-button-primary"
              loading={isPublishing}
              onClick={(e) => handleBulkAction('publish', e)}
            />
          </div>
        )}

        {viewMode === 'collapsible' ? (
          <ExternalListingsCollapsible
            suppliers={suppliers || []}
            onSelectionChange={handleSelectionChange}
            externalListings={externalListings || []}
            onView={onView}
          />
        ) : (
          <ExternalListingsDataTable
            externalListings={externalListings || []}
            onSelectionChange={handleSelectionChange}
            onView={onView}
          />
        )}
      </div>

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
