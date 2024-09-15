/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsers } from '@apis/user/api';
import FilterButton from '@components/FilterButton';
import { PageHeader } from '@components/page-header';
import { IUser, IUserGetRequestFilter } from '@domains/IUser';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useRef, useState } from 'react';
import AddButton from '@components/AddButton';
import SearchForUsers from './components/search';
import UsersDataTable from './components/dataTable';
import UbsertUsers from './components/upsert';

export default function UserPage() {
  const op = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [ListingObj, setListingObj] = useState<IUser>({} as IUser);
  const [filter, setFilter] = useState({
    ...({} as IUserGetRequestFilter),
    isActive: true,
  });
  const { data: Users } = useGetAllUsers(filter);
  const queryClient = useQueryClient();

  const onEdit = (profile: IUser) => {
    if (profile && profile.id.length > 0) {
      setListingObj(profile);
      setOpen(true);
    }
  };

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e);
  };

  const handleAddButton = () => {
    setListingObj({} as IUser);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Users" icon="fa-solid fa-people-group" />
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
                  <SearchForUsers
                    onSearch={(data) => setFilter(data)}
                    onClear={() => {
                      setFilter({
                        ...({} as IUserGetRequestFilter),
                        isActive: true,
                      });
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton onClick={handleAddButton} buttonText="Add Listing" />
          </div>
        </div>
        <UsersDataTable onEdit={onEdit} Users={Users || []} />
      </div>

      <UbsertUsers
        open={open}
        intialValues={ListingObj || ({} as IUser)}
        mode={Object.keys(ListingObj ?? {}).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setListingObj({} as IUser);
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
        }}
      />
    </div>
  );
}
