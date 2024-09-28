/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import DropDownInput from '@components/Dropdown';
import { ITransactionRequestFilter } from '@domains/ITransactions';
import { useListOfCustomers } from '@apis/customer/apis';
import { useListOfListings } from '@apis/listing/apis';
import { useListOfListingPackages } from '@apis/listingPackage/apis';
import CalendarInput from '@components/calendar';

type Props = {
  onSearch: (data: any) => void;
  onClear?: () => void;
  defualtValues: ITransactionRequestFilter;
};

export default function SearchForTransactions({
  onSearch,
  onClear,
  defualtValues,
}: Props) {
  const form = useForm<ITransactionRequestFilter>({
    criteriaMode: 'all',
    defaultValues: defualtValues,
    mode: 'onChange', // or 'onBlur', 'onTouched'
  });
  const { data: customers } = useListOfCustomers();
  const { data: listings } = useListOfListings();
  const { data: listingPackages } = useListOfListingPackages();

  const onSubmit = (values: any) => {
    onSearch(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="row align-items-center rounded p-0"
      style={{ width: '30rem' }}
    >
      <div className="grid grid-cols-2 gap-4 mt-4">
        <DropDownInput
          control={form.control}
          options={customers || []}
          errors={form.formState.errors}
          field={{
            inputName: 'Customer_Id',
            title: 'Customer',
          }}
        />
        <DropDownInput
          control={form.control}
          options={listings || []}
          errors={form.formState.errors}
          field={{
            inputName: 'Listing_Id',
            title: 'Listing',
          }}
        />
        <DropDownInput
          control={form.control}
          options={listingPackages || []}
          errors={form.formState.errors}
          field={{
            inputName: 'ListingPackage_Id',
            title: 'Listing Package',
          }}
        />
        <CalendarInput
          control={form.control}
          errors={form.formState.errors}
          field={{
            inputName: 'StartDate',
            title: 'Start Date',
          }}
        />
        <CalendarInput
          control={form.control}
          errors={form.formState.errors}
          field={{
            inputName: 'EndDate',
            title: 'End Date',
          }}
        />
      </div>
      <div className="col-12 d-flex justify-content-end align-items-end mt-4">
        <div className="col-12 ">
          <Button
            label="Search"
            raised
            type="submit"
            className="rounded p-2"
            style={{ width: '100px' }}
          />

          {Object.values(form.getValues()).some((value) => value) && (
            <Button
              label="Clear"
              raised
              severity="secondary"
              type="button"
              className="rounded p-2 ms-4"
              style={{ width: '100px' }}
              onClick={() => {
                form.reset();
                if (onClear) {
                  onClear();
                }
              }}
            />
          )}
        </div>
      </div>
    </form>
  );
}
