/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCreateModel } from '@domains/IShardInput'
import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import { Editor } from 'primereact/editor'
import { Control, Controller } from 'react-hook-form'

type Props = {
  field: InputCreateModel
  errors: any
  control: Control<any>
}

export default function EditorInput({ field, errors, control }: Props) {
  return (
    <div className="col-12 w-full">
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
          <Editor
            id={field.inputName}
            value={value}
            onTextChange={e => {
              onChange(e.htmlValue)
            }}
            style={{ height: '320px' }}
            name={field.inputName}
            className={clsx(
              ' w-full  transition duration-300 rounded-[6px] mt-1',
              {
                'border border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200':
                  errors[field.inputName],
              },
              {
                'border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200':
                  !errors[field.inputName],
              }
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
  )
}
