/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCreateModel } from '@domains/IShardInput';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { Dropdown } from 'primereact/dropdown';
import { Control, Controller } from 'react-hook-form';

type Props = {
  field: InputCreateModel;
  errors: any;
  control: Control<any>;
  options: Array<any>;
};

export default function DropDownInput({
  field,
  errors,
  control,
  options,
}: Props) {
  return (
    <div className="col-12 w-100">
      <label
        htmlFor={field.inputName}
        className="w-100 form-label fw-bold text-secondary mb-1 text-dairection"
        style={{ fontSize: '14px' }}
      >
        {field.title}{' '}
        {field.isRequired && <span className="text-danger">*</span>}{' '}
      </label>

      <Controller
        control={control}
        name={field.inputName}
        rules={{
          required: field.isRequired ? `${field.title} is required` : false,
        }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            value={options.find((option) => option.id === value) || null}
            onChange={(e) => {
              if (e.value) {
                onChange(e.value.id);
              } else {
                onChange(undefined);
              }
            }}
            filter
            showClear
            options={options}
            optionValue="id"
            optionLabel="name"
            placeholder="Select a Option"
            style={{
              border: ' 2px solid rgb(162 199 255 / 74%)',
              width: '100%',
            }}
            highlightOnSelect
            className={clsx(
              'form-control d-flex bg-transparent p-0',
              {
                'is-invalid':
                  errors[field.inputName] && errors[field.inputName],
              },
              {
                'is-valid': errors[field.inputName] && !errors[field.inputName],
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
            <p className="text-danger fs-6 pt-2" key={type}>
              {message}
            </p>
          ))
        }
      />
    </div>
  );
}
