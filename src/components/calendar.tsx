/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCreateModel } from '@domains/IShardInput';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import { Calendar } from 'primereact/calendar';
import { Control, Controller } from 'react-hook-form';

type Props = {
  field: InputCreateModel
  errors: any
  control: Control<any>
  showTime?: boolean
  min?: Date
  max?: Date
};

export default function CalendarInput({
  field,
  errors,
  control,
  showTime,
  min,
  max,
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
          <Calendar
            name={field.inputName}
            onChange={onChange}
            value={value}
            placeholder="Select a Date"
            showTime={showTime}
            minDate={min}
            maxDate={max}
            className={clsx(
              'w-full transition duration-300 rounded mt-1 ',
              {
                'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200':
                  errors[field.inputName],
              },
              {
                '': !errors[field.inputName],
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
