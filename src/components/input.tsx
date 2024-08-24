/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import clsx from 'clsx'
import { ErrorMessage } from '@hookform/error-message'
import { UseFormRegister } from 'react-hook-form'
import { InputCreateModel } from '@domains/IShardInput'

type Props = {
  field: InputCreateModel
  errors: any
  register: UseFormRegister<any>
}

export default function Input({ field, errors, register }: Props) {
  return (
    <div className="col-12 w-full">
      <label
        htmlFor={field.inputName}
        className="w-full form-label font-bold text-secondary !mb-1"
      >
        {field.title}{' '}
        {field.isRequired && <span className="text-red-500">*</span>}
      </label>
      {field.isNumber ? (
        <input
          id={field.inputName}
          placeholder={field.title as string} 
          {...register(field.inputName, {
            required: field.isRequired ? `${field.title} is Required` : false,
            max: field.maxLength && {
              value: field.maxLength,
              message: `${field.title} can't be more than ${field.maxLength} `,
            },
            min: field.minLength && {
              value: field.minLength,
              message: `${field.title} can't be less than ${field.minLength} `,
            },
            valueAsNumber: true,
          })}
          className={clsx(
            'h-[42px] w-full !py-[0.75rem] !px-[0.45rem]  transition duration-300 rounded-[6px] mt-1',
            {
              'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200': errors[field.inputName],
            },
            {
              'border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200': !errors[field.inputName],
            }
          )}
          name={field.inputName}
          autoComplete="off"
          type="number"
        />
      ) : (
        <input
          id={field.inputName}
          placeholder={field.title as string} 
          {...register(field.inputName, {
            required: field.isRequired ? `${field.title} is Required` : false,
            maxLength: field.maxLength && {
              value: field.maxLength,
              message: `${field.title} exceeds max length`,
            },
            minLength: field.minLength && {
              value: field.minLength,
              message: `${field.title} does not meet min length`,
            },
          })}
          className={clsx(
            'h-[42px] w-full !py-[0.75rem] !px-[0.45rem] transition duration-300 rounded-[6px] mt-1',
            {
              'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200': errors[field.inputName],
            },
            {
              'border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200': !errors[field.inputName],
            }
          )}
          name={field.inputName}
          autoComplete="off"
          type={field.isPassword ? 'password' : 'text'}
        />
      )}

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
  )
}
