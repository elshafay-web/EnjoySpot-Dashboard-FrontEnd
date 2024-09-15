/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { PageHeader } from '@components/page-header';
import FilterButton from '@components/FilterButton';
import AddButton from '@components/AddButton';
import { useQueryClient } from '@tanstack/react-query';
import {
  IListingPackageGetRequestFilter,
  IListingPackages,
} from '@domains/IListingPackage';
import {
  useGetAllListingPackages,
  useGetListingPackageProfile,
} from '@apis/listingPackage/apis';
import { Button } from 'primereact/button';
import SearchForListingPackage from './components/search';
import ListingsPackageDataTable from './components/dataTable';
import UbsertListingPackage from './components/upsert';
import ViewListingPackage from './components/view';

export default function ListingPackagePage() {
  const op = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);

  const [ListingPackageObj, setListingPackageObj] = useState<IListingPackages>(
    {} as IListingPackages,
  );
  const [filter, setFilter] = useState({
    ...({} as IListingPackageGetRequestFilter),
    isActive: true,
  });
  const { data: listingsPackages } = useGetAllListingPackages(filter);
  const { data: ListingPackageProfile } = useGetListingPackageProfile(
    ListingPackageObj.id,
  );
  const queryClient = useQueryClient();

  const onEdit = (profile: IListingPackages) => {
    if (profile && profile.id > 0) {
      setListingPackageObj(profile);
      setOpen(true);
    }
  };

  const onView = (profile: IListingPackages) => {
    if (profile && profile.id > 0) {
      setListingPackageObj(profile);
      setView(true);
    }
  };

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e);
  };

  const handleAddButton = () => {
    setListingPackageObj({} as IListingPackages);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Listing Packages" icon={'fa-solid fa-box-open'} />
          <div className="flex items-center justify-start">
            <Button
              onClick={() => setFilter({ ...filter, isActive: true })}
              label="Active"
              severity={`${filter.isActive ? 'success' : 'secondary'}`}
              className="w-[150px] mx-2"
            />

            <Button
              onClick={() => setFilter({ ...filter, isActive: false })}
              label="Not Active"
              severity={`${filter.isActive === false ? 'danger' : 'secondary'}`}
              className="w-[150px]"
            />
          </div>
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForListingPackage
                    onSearch={(data) => setFilter(data)}
                    onClear={() => {
                      setFilter({
                        ...({} as IListingPackageGetRequestFilter),
                        isActive: true,
                      });
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton
              onClick={handleAddButton}
              buttonText={'Add Listing Package'}
            />
          </div>
        </div>
        <ListingsPackageDataTable
          onEdit={onEdit}
          onView={onView}
          listings={listingsPackages || []}
        />
      </div>

      <UbsertListingPackage
        open={open}
        intialValues={ListingPackageProfile || ({} as IListingPackages)}
        mode={
          Object.keys(ListingPackageProfile || {}).length > 0 ? 'edit' : 'add'
        }
        onClose={() => {
          setListingPackageObj({} as IListingPackages);
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['getAllListingPackages'],
          });
        }}
      />
      <ViewListingPackage
        open={view}
        profile={ListingPackageProfile || ({} as IListingPackages)}
        onClose={() => {
          setListingPackageObj({} as IListingPackages);
          setView(false);
        }}
      />
    </div>
  );
}
