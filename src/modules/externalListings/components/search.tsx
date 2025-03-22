/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { useListOfSupppliers } from '@apis/supplier/api';
import { useEffect } from 'react';

type Props = {
  onSearch: (data: any) => void;
  onClear?: () => void;
  defaultValues: any;
};

export default function SearchForExternalListings({
  onSearch,
  onClear,
  defaultValues,
}: Props) {
  const form = useForm({
    criteriaMode: 'all',
    defaultValues,
    mode: 'onChange',
  });
  const { data: listOfSuppliers } = useListOfSupppliers();

  // Update form values when default values change
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = (values: any) => {
    // Ensure the supplierID is set from SupplierId for API consistency
    const searchParams = {
      ...values,
      supplierID: values.SupplierId,
    };
    onSearch(searchParams);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="row align-items-center rounded p-0"
      style={{ width: '30rem' }}
    >
      <div className="grid grid-cols-1 gap-4">
        <DropDownInput
          control={form.control}
          options={listOfSuppliers || []}
          errors={form.formState.errors}
          field={{
            inputName: 'SupplierId',
            title: 'Supplier',
            isRequired: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        <Input
          register={form.register}
          errors={form.formState.errors}
          field={{
            inputName: 'Search',
            title: 'Search Listings',
            minLength: 1,
            maxLength: 20,
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
                form.reset({
                  Search: '',
                  SupplierId: defaultValues.SupplierId,
                  supplierID: defaultValues.SupplierId,
                });
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
