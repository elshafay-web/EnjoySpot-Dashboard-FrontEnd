/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCreateModel } from '@domains/IShardInput';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { MultiSelect } from 'primereact/multiselect';
import { Control, Controller } from 'react-hook-form';

type Props = {
  field: InputCreateModel
  errors: any
  control: Control<any>
  options: Array<any>
};

export default function MultiSelectInput({
  field,
  errors,
  control,
  options,
}: Props) {
  return (
    <div className="col-12 w-100">
      <label
        htmlFor={field.inputName}
        className="w-full form-label font-bold text-secondary !mb-1"
      >
        {field.title}{' '}
        {field.isRequired && <span className="text-red-500 text-xl">*</span>}{' '}
      </label>

      <Controller
        control={control}
        name={field.inputName}
        rules={{
          required: field.isRequired ? `${field.title} is required` : false,
        }}
        render={({ field: { onChange, value } }) => (
          <MultiSelect
            value={value || []}
            onChange={(e) => {
              if (e.value) {
                onChange(e.value);
              } else {
                onChange(undefined);
              }
            }}
            filter
            showClear
            options={options}
            optionValue="id"
            optionLabel="name"
            display="chip"
            placeholder="Select a Option"
            className={clsx(
              'h-[42px] w-full  transition duration-300 rounded-[6px] mt-1',
              {
                'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200':
                  errors[field.inputName],
              },
              {
                'border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200':
                  !errors[field.inputName],
              },
            )}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={field.inputName}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p className="text-red-500 fs-6 pt-2" key={type}>
              {message}
            </p>
          ))
        }
      />
    </div>
  );
}
