/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
// eslint-disable-next-line @typescript-eslint/quotes
import Input from '@components/input';
import { useEffect } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

interface TranslationFieldsProps {
  form: UseFormReturn<any>;
  detailIndex: number;
}

export const TranslationFields: React.FC<TranslationFieldsProps> = ({
  form,
  detailIndex,
}) => {
  const {
    fields: translationFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `details.${detailIndex}.translationProperties`,
  });

  useEffect(() => {
    if (translationFields.length === 0) {
      append({ languageCode: 'en', dValue: '' });
    }
  }, [translationFields.length, append]); // Run only if fields are empty

  const handleRemove = (index: number) => {
    if (translationFields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
      {translationFields.map((field, translationIndex) => (
        <div key={field.id} className="flex flex-col">
          {/* Language Code Input */}
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `details.${detailIndex}.translationProperties.${translationIndex}.languageCode`,
              title: 'Language Code',
              isRequired: true,
            }}
          />

          {/* Value Input */}
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `details.${detailIndex}.translationProperties.${translationIndex}.dValue`,
              title: 'Value',
              isRequired: true,
            }}
          />

          {/* Remove translation (only if more than 1) */}
          {translationFields.length > 1 && (
            <button
              type="button"
              className="mt-2 p-2 bg-red-500 text-white rounded"
              onClick={() => handleRemove(translationIndex)}
            >
              remove value
            </button>
          )}
        </div>
      ))}

      {/* Add new translation */}
      {translationFields.length > 0 && (
        <button
          type="button"
          className="mt-2 bg-green-500 text-white p-2 rounded"
          onClick={() => append({ languageCode: 'en', dValue: '' })}
        >
          add value
        </button>
      )}
    </>
  );
};

export default TranslationFields;
