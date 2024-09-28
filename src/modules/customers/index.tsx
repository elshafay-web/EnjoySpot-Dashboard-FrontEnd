/* eslint-disable @typescript-eslint/no-explicit-any */
import FilterButton from '@components/FilterButton';
import { PageHeader } from '@components/page-header';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useRef, useState } from 'react';
import AddButton from '@components/AddButton';
import { ICustomer, ICustomerGetRequestFilter } from '@domains/ICustomer';
import { useGetAllCustomers } from '@apis/customer/apis';
import CustomersDataTable from './components/dataTable';
import SearchForCustomers from './components/search';
import UbsertCustomers from './components/upsert';

export default function CustomerPage() {
  const op = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [customerObj, setCustomerObj] = useState<ICustomer>({} as ICustomer);
  const [filter, setFilter] = useState({
    ...({} as ICustomerGetRequestFilter),
    PageNumber: 1,
    PageSize: 1000,
    isActive: true,
    IsLead: true,
  });
  const { data: customers } = useGetAllCustomers(filter);
  const queryClient = useQueryClient();

  const onEdit = (profile: ICustomer) => {
    if (profile && profile.id > 0) {
      setCustomerObj(profile);
      setOpen(true);
    }
  };

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e);
  };

  const handleAddButton = () => {
    setCustomerObj({} as ICustomer);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Customers"
            icon="fa-solid fa-person-circle-check"
          />
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
                  <SearchForCustomers
                    onSearch={(data) => setFilter(data)}
                    onClear={() => {
                      setFilter({
                        ...({} as ICustomerGetRequestFilter),
                        PageNumber: 1,
                        PageSize: 1000,
                        isActive: true,
                        IsLead: false,
                      });
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton onClick={handleAddButton} buttonText="Add Customer" />
          </div>
        </div>
        <CustomersDataTable onEdit={onEdit} Customers={customers || []} />
      </div>

      <UbsertCustomers
        open={open}
        intialValues={customerObj || ({} as ICustomer)}
        mode={Object.keys(customerObj ?? {}).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setCustomerObj({} as ICustomer);
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
        }}
      />
    </div>
  );
}
