/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import { UseFormRegister } from 'react-hook-form';
import { InputCreateModel } from '@domains/IShardInput';

type Props = {
  field: InputCreateModel
  errors: any
  register: UseFormRegister<any>
};

export default function TextArea({ field, errors, register }: Props) {
  return (
    <div className="col-12 w-full">
      <label
        htmlFor={field.inputName}
        className="w-full form-label font-bold text-secondary !mb-1"
      >
        {field.title}{' '}
        {field.isRequired && <span className="text-red-500 text-xl">*</span>}
      </label>
      <textarea
        id={field.inputName}
        placeholder={field.title as string}
        {...register(field.inputName, {
          required: field.isRequired ? `${field.title} is Required` : false,
        })}
        className={clsx(
          'h-[150px] w-full !py-[0.75rem] !px-[0.45rem]  transition duration-300 rounded-[6px] mt-1',
          {
            'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200':
              errors[field.inputName],
          },
          {
            'border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200':
              !errors[field.inputName],
          },
        )}
        name={field.inputName}
        autoComplete="off"
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
