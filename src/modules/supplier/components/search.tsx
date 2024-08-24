/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import Input from '@components/input'
import DropDownInput from '@components/Dropdown'
import { ISupplierListGetRequestFilter } from '@domains/ISupplier'

type Props = {
  onSearch: (data: any) => void
  onClear?: () => void
  defualtValues: ISupplierListGetRequestFilter
}

export default function SearchForSupplier({
  onSearch,
  onClear,
  defualtValues,
}: Props) {
  const form = useForm({
    criteriaMode: 'all',
    defaultValues: defualtValues,
    mode: 'onChange', // or 'onBlur', 'onTouched'

  })

  const onSubmit = (values: any) => {
    onSearch(values)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="row align-items-center rounded p-0"
      style={{ width: '30rem' }}
    >
      <div className="col-md-12 col-12">
        <Input
          register={form.register}
          errors={form.formState.errors}
          field={{
            inputName: 'Search',
            title: 'searchHere',
            minLength: 3,
            maxLength: 20,
          }}
        />
      </div>
      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'locationId',
            title: 'location',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'CountryId',
            title: 'country',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'StateId',
            title: 'state',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'CityId',
            title: 'city',
          }}
        />
      </div>
      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'AreaId',
            title: 'area',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'Nationality_Id',
            title: 'nationality',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'ReligionId',
            title: 'religion',
          }}
        />
      </div>
      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'MaritalStatus_Id',
            title: 'maritalStatus',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'GenderId',
            title: 'gender',
          }}
        />
      </div>
      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'DepartmentId',
            title: 'department',
          }}
        />
      </div>

      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'SectionId',
            title: 'section',
          }}
        />
      </div>
      <div className="col-md-6 col-12 mt-2">
        <DropDownInput
          control={form.control}
          options={[]}
          errors={form.formState.errors}
          field={{
            inputName: 'JobSectionId',
            title: 'jobSection',
          }}
        />
      </div>

      <div className="col-12 d-flex justify-content-end align-items-end">
        <div className="col-12 ">
          <Button
            label={'Submit'}
            raised
            type="submit"
            className="rounded p-2"
            style={{ width: '100px' }}
            //   disabled={isPendingUpload || isPending}
          />

          <Button
            label={'Cancle'}
            raised
            severity="secondary"
            type="button"
            className="rounded p-2 ms-4"
            style={{ width: '100px' }}
            // onClick={handleClose}
          />
        </div>
      </div>
    </form>
  )
}
