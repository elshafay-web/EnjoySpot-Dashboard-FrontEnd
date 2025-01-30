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
    name: `items.${detailIndex}.translationProperties`,
  });

  useEffect(() => {
    if (translationFields.length === 0) {
      append({ languageCode: 'en', title: '', description: '', button: '' });
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
        <div key={field.id} className="grid grid-cols-1 gap-4 mt-4">
          {/* Language Code Input */}
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `items.${detailIndex}.translationProperties.${translationIndex}.languageCode`,
              title: 'Language Code',
              isRequired: true,
            }}
          />

          {/* Value Input */}
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `items.${detailIndex}.translationProperties.${translationIndex}.title`,
              title: 'Title',
              isRequired: true,
            }}
          />
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `items.${detailIndex}.translationProperties.${translationIndex}.description`,
              title: 'Description',
              isRequired: true,
            }}
          />
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: `items.${detailIndex}.translationProperties.${translationIndex}.button`,
              title: 'Button',
              isRequired: true,
            }}
          />

          {/* Remove translation (only if more than 1) */}
          {translationFields.length > 1 && (
            <button
              type="button"
              className="mt-2 p-2 bg-red-500 w-fit h-fit text-white rounded"
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
          className="mt-2 w-fit h-fit bg-green-500 text-white p-2 rounded"
          onClick={() =>
            append({
              languageCode: 'en',
              title: '',
              description: '',
              button: '',
            })
          }
        >
          add value
        </button>
      )}
    </>
  );
};

export default TranslationFields;
