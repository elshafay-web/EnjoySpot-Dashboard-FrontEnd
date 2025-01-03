/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import Input from '@components/input';
import { ICustomerGetRequestFilter } from '@domains/ICustomer';
import DropDownInput from '@components/Dropdown';

type Props = {
  onSearch: (data: any) => void;
  onClear?: () => void;
  defualtValues: ICustomerGetRequestFilter;
};

export default function SearchForCustomers({
  onSearch,
  onClear,
  defualtValues,
}: Props) {
  const form = useForm<ICustomerGetRequestFilter>({
    criteriaMode: 'all',
    defaultValues: defualtValues,
    mode: 'onChange', // or 'onBlur', 'onTouched'
  });
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
            inputName: 'Search',
            title: 'searchHere',
            minLength: 1,
            maxLength: 20,
          }}
        />

        <DropDownInput
          control={form.control}
          errors={form.formState.errors}
          options={[
            { name: 'Active', id: true },
            { name: 'Not Active', id: false },
          ]}
          field={{
            inputName: 'IsLead',
            title: 'Active Leads',
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
