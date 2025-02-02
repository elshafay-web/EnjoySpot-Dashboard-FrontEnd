/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import { ISiteConfiguration } from '@domains/ISiteConfiguration';
import { updateSiteConfigurationObject } from '@apis/siteConfiguration/apis';
import FileUpload from '@components/FileUpload';
import { TranslationFields } from './TranslationFields';

type Props = {
  onClose: () => void;
  initialValues?: ISiteConfiguration;
  open: boolean;
};

export default function UpdateSiteConfiguration({
  onClose,
  initialValues,
  open,
}: Props) {
  const form = useForm<ISiteConfiguration>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: initialValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const [files, setFiles] = useState<File[]>([]);
  const { mutate, isPending } = useMutation({
    mutationFn: (req: FormData) => updateSiteConfigurationObject(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onClose();
    },
  });

  const onSubmit = (values: any) => {
    const formData = new FormData();
    formData.append(
      'Slider.Id',
      (initialValues && initialValues?.id?.toString()) || '0',
    );
    formData.append('Slider.MovingInSecounds', values.MovingInSecounds);
    values.items.forEach((item: any, index: number) => {
      (item.translationProperties || []).forEach(
        (
          translation: {
            title: string | Blob;
            description: string | Blob;
            button: string | Blob;
            languageCode: string | Blob;
          },
          translationIndex: any,
        ) => {
          formData.append(
            `Slider.items[${index}].translationProperties[${translationIndex}].title`,
            translation.title,
          );
          formData.append(
            `Slider.items[${index}].translationProperties[${translationIndex}].description`,
            translation.description,
          );
          formData.append(
            `Slider.items[${index}].translationProperties[${translationIndex}].button`,
            translation.button,
          );
          formData.append(
            `Slider.items[${index}].translationProperties[${translationIndex}].languageCode`,
            translation.languageCode,
          );
        },
      );
      formData.append(`Slider.items[${index}].imageFile`, files[index]);
      formData.append(`Slider.items[${index}].ActionUrl`, item.ActionUrl);
    });
    mutate(formData);
  };

  useEffect(() => {
    if (initialValues) {
      const filteredObj = Object.fromEntries(
        Object.entries(initialValues).filter(([, v]) => v !== null),
      );
      form.reset(filteredObj);
    }
  }, [initialValues]);

  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">Update Site Configuration</span>
    </div>
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '60vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        form.reset();
        onClose();
      }}
      header={customHeader}
    >
      <div className="w-100">
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20">
          <FormHead title="Basic Information" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'MovingInSecounds',
                title: 'Moving In Seconds ',
                isRequired: true,
                isNumber: true,
              }}
            />
          </div>

          <h5 className=" flex items-center justify-between  rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4" />
              Slider Images
            </div>

            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                append({
                  id: 0,
                  imageFile: undefined,
                  ActionUrl: '',
                  translationProperties: [
                    {
                      languageCode: '',
                      title: '',
                      description: '',
                      button: '',
                    },
                  ],
                });
              }}
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
          </h5>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {fields.map((field, index) => (
              <div
                className="w-full col-span-2 grid gap-4 grid-cols-2"
                key={field.id}
              >
                <TranslationFields form={form} detailIndex={index} />
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: `items[${index}].ActionUrl`,
                    title: 'Button Url ',
                    isRequired: true,
                    isNumber: false,
                  }}
                />

                <FileUpload
                  onFilesSelected={(file) => {
                    if (file) {
                      setFiles((prev) => {
                        const updatedFiles = [...prev];
                        updatedFiles[index] = file; // Update file at index
                        return updatedFiles;
                      });
                    }
                  }}
                  title="Image"
                  attachment={undefined}
                />
                <button
                  type="button"
                  className="m-2 w-10 h-10 mt-10 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                  onClick={() => {
                    remove(index); // Remove from useFieldArray
                    setFiles((prev) => prev.filter((_, i) => i !== index)); // Update files
                  }}
                >
                  <i className="fa-solid fa-trash text-white" />
                </button>
              </div>
            ))}
          </div>
          {/* ////////////////////////////////////////  Submit And cancel ///////////////////////////////// */}
          <div className="flex items-center mt-4 grid  fixed bottom-4 ">
            <div className="col-12 ">
              <Button
                label="Submit"
                raised
                type="submit"
                className="rounded p-2"
                style={{ width: '100px' }}
                disabled={isPending}
              />

              <Button
                label="Cancel"
                raised
                severity="secondary"
                type="button"
                className="rounded p-2 ms-4"
                style={{ width: '100px' }}
                onClick={handleClose}
              />
            </div>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}
