/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { ISupplierListGetRequestFilter } from '@domains/ISupplier';
import { useListOfCities, useListOfCountries } from '@apis/lookups/apis';

type Props = {
  onSearch: (data: any) => void;
  onClear?: () => void;
  defualtValues: ISupplierListGetRequestFilter;
};

export default function SearchForSupplier({
  onSearch,
  onClear,
  defualtValues,
}: Props) {
  const form = useForm<ISupplierListGetRequestFilter>({
    criteriaMode: 'all',
    defaultValues: defualtValues,
    mode: 'onChange', // or 'onBlur', 'onTouched'
  });
  const country_Id = form.watch('country_Id');
  const { data: listOfCountries } = useListOfCountries();
  const { data: listOfCities } = useListOfCities(country_Id ?? 0);

  const onSubmit = (values: any) => {
    onSearch(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="row align-items-center rounded p-0"
      style={{ width: '30rem' }}
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          register={form.register}
          errors={form.formState.errors}
          field={{
            inputName: 'search',
            title: 'searchHere',
            minLength: 1,
            maxLength: 20,
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <Input
          register={form.register}
          errors={form.formState.errors}
          field={{
            inputName: 'LicenseNumber',
            title: 'License Number',
            minLength: 1,
            maxLength: 20,
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <DropDownInput
          control={form.control}
          options={listOfCountries || []}
          errors={form.formState.errors}
          field={{
            inputName: 'country_Id',
            title: 'country',
          }}
        />

        <DropDownInput
          control={form.control}
          options={listOfCities || []}
          errors={form.formState.errors}
          field={{
            inputName: 'CityId',
            title: 'City',
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
            //   disabled={isPendingUpload || isPending}
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
                  cityId: undefined,
                  country_Id: undefined,
                  search: '',
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
