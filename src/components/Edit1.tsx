/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit1 = ({
  control,
  errors,
  field,
}: {
  control: any;
  errors: any;
  field: any;
}) => {
  const { inputName, title, isRequired, minLength, maxLength } = field;

  return (
    <div className="mb-4">
      {/* Label */}
      <label htmlFor={inputName} className="block font-medium mb-2">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </label>

      {/* Rich Text Editor */}
      <Controller
        name={inputName}
        control={control}
        rules={{
          required: isRequired ? `${title} is required` : false,
          minLength: minLength
            ? {
                value: minLength,
                message: `Minimum length is ${minLength} characters`,
              }
            : undefined,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `Maximum length is ${maxLength} characters`,
              }
            : undefined,
        }}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            onChange={(value) => field.onChange(value)} // Quill value handling
            placeholder={`Enter ${title.toLowerCase()}...`}
          />
        )}
      />

      {/* Validation Errors */}
      {errors[inputName] && (
        <p className="text-red-500 text-sm mt-1">{errors[inputName].message}</p>
      )}
    </div>
  );
};

export default Edit1;
