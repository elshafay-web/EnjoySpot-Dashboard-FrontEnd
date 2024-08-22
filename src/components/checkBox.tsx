/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCreateModel } from '@domains/IShardInput'
import { ErrorMessage } from '@hookform/error-message'
import { Checkbox } from 'primereact/checkbox'
import { Control, Controller } from 'react-hook-form'

type Props = {
  field: InputCreateModel
  errors: any
  control: Control<any>
}

export default function CheckBoxInput({ field, errors, control }: Props) {
  return (
    <div className="w-full">
      <div className="flex align-items-center">
        <Controller
          control={control}
          name={field.inputName}
          rules={{
            required: field.isRequired ? `${field.title} is required` : false,
          }}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              name={field.inputName}
              value={value}
              onChange={onChange}
              checked={value}
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

        <label
          htmlFor={field.inputName}
          className="w-full form-label font-bold text-secondary mx-2 text-dairection"
          style={{ fontSize: '14px' }}
        >
          {field.title}{' '}
          {field.isRequired && <span className="text-danger">*</span>}{' '}
        </label>
      </div>
    </div>
  )
}
