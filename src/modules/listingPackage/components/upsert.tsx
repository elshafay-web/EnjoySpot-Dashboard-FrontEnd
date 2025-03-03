/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import FileUpload from '@components/FileUpload';
import { useListOfSupppliers } from '@apis/supplier/api';
import MultiFileUpload from '@components/MultiFileUpload';
import YouTubeIFrame from '@components/YouTubeIFrame';
import TextArea from '@components/textArea';
import { convertObjectToFormData } from '@helpers/helpingFun';
import { IListingPackages } from '@domains/IListingPackage';
import { UpsertListingPackages } from '@apis/listingPackage/apis';
import EditorInput from '@components/editor';
import { useListOfCities1, useListOfListingTypes } from '@apis/lookups/apis';
import GoogleMapWithSearch from '@components/googleMap/map';
import { useMutation } from '@tanstack/react-query';

type Props = {
  onClose: () => void;
  intialValues: IListingPackages;
  mode: 'edit' | 'add';
  open: boolean;
};

export default function UbsertListingPackage({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<IListingPackages>({
    criteriaMode: 'all',
    mode: 'onChange',
    defaultValues: {
      ...intialValues,
      TranslationProperties: intialValues.TranslationProperties || [],
    },
  });

  const [MediaFiles, setMediaFiles] = useState<
    {
      file: ArrayBuffer;
      name: string;
    }[]
  >([]);
  const [RoutesMapImage, setRoutesMapImage] = useState<{
    file: ArrayBuffer;
    name: string;
  }>({} as any);

  const {
    fields: translationFields,
    append: appendTranslation,
    remove: removeTranslation,
  } = useFieldArray({
    control: form.control,
    name: 'TranslationProperties',
  });

  const youTubeVideoIframe = form.watch('youTubeVideoIframe');
  const { data: listOfSuppliers } = useListOfSupppliers();
  const { data: listOfCities } = useListOfCities1();
  const { data: listOfListingType } = useListOfListingTypes();
  const center = {
    lat: 24.4666667,
    lng: 54.3666667,
  };
  const [selectedPosition, setSelectedPosition] = useState(center);

  const { mutate, isPending } = useMutation({
    mutationFn: (req: FormData) => UpsertListingPackages(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onClose();
    },
  });

  const onSubmit = (values: any) => {
    const data: IListingPackages = values;
    if (mode === 'add') {
      if (MediaFiles.length < 3 || MediaFiles.length > 15) {
        toast.warning(
          'You can not add less than 3 images and more than 15 images',
        );
        return;
      }
    }
    data.id = intialValues.id || 0;
    data.TranslationProperties = (data.TranslationProperties || []).map(
      (item) => {
        const matchingInitialItem = (
          intialValues.TranslationProperties || []
        ).find((x) => x.languageCode === item.languageCode);
        return {
          ...item,
          ...(mode === 'edit' && matchingInitialItem
            ? matchingInitialItem
            : {}),
        };
      },
    );
    if (mode === 'edit') {
      (intialValues.TranslationProperties || []).forEach((item) => {
        if (
          !(data.TranslationProperties || []).some(
            (x) => x.languageCode === item.languageCode,
          )
        ) {
          data.TranslationProperties.push(item);
        }
      });
    }

    const { lat, long, TranslationProperties, ...res } = data;

    const formData = convertObjectToFormData(res);
    if (MediaFiles.length > 0) {
      MediaFiles.forEach((file) => {
        formData.append('mediaImages', new Blob([file.file]), file.name);
      });
    }
    if (RoutesMapImage.file) {
      formData.append(
        'routesMapImage',
        new Blob([RoutesMapImage.file]),
        RoutesMapImage.name,
      );
    }
    formData.append('lat', selectedPosition.lat.toString());
    formData.append('long', selectedPosition.lng.toString());
    TranslationProperties.forEach((item, index) => {
      formData.append(
        `TranslationProperties[${index}].languageCode`,
        item.languageCode?.toString() ?? 'en',
      );
      formData.append(
        `TranslationProperties[${index}].name`,
        item.name?.toString() ?? '0',
      );
      formData.append(
        `TranslationProperties[${index}].overview`,
        item.overview?.toString() ?? '0',
      );
      formData.append(
        `TranslationProperties[${index}].summary`,
        item.overview?.toString() ?? '0',
      );
    });

    mutate(formData);
  };

  const handelUploadMediaFiles = useCallback((files?: File[]) => {
    if (files) {
      const promises = files.map(
        (file) =>
          new Promise<{ file: ArrayBuffer; name: string }>(
            (resolve, reject) => {
              const reader = new FileReader();
              reader.readAsArrayBuffer(file);
              reader.onload = () => {
                const data = reader.result as ArrayBuffer;
                if (data) {
                  resolve({
                    file: data,
                    name: file.name,
                  });
                }
              };
              reader.onerror = reject;
            },
          ),
      );

      Promise.all(promises)
        .then((filesData) => {
          setMediaFiles(filesData);
        })
        .catch((error) => {
          toast.error(`Error reading files:${error}`);
        });
    }
  }, []);

  const handelUploadRoutesMapImage = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const data = reader.result as ArrayBuffer;
        if (data) {
          setRoutesMapImage({
            file: data,
            name: file.name,
          });
        }
      };
    }
  }, []);

  useEffect(() => {
    if (intialValues) {
      const filteredObj = Object.fromEntries(
        Object.entries(intialValues).filter(([, v]) => v !== null),
      );
      form.reset(filteredObj);
      if (intialValues.attachments && intialValues.attachments.length > 0) {
        form.setValue(
          'youTubeVideoIframe',
          intialValues.attachments?.find(
            (x) => x.attachmentType === 'YouTubeVideoIframe',
          )?.attachmentPath ?? '',
        );
      }

      if (intialValues.lat && intialValues.long) {
        setSelectedPosition({
          lat: intialValues.lat,
          lng: intialValues.long,
        });
      }
    }
  }, [intialValues]);

  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">
        {mode === 'add' ? 'Add Listing Package' : 'Edit Listing Package'}
      </span>
    </div>
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '50vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        form.reset();
        onClose();
      }}
      header={customHeader}
      dismissable={false}
    >
      <div className="w-100">
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20">
          <h5 className="flex items-center justify-between rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4" />
              Translation Properties
            </div>
            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                console.log('Appending new translation');
                appendTranslation({
                  languageCode: 'en',
                  name: '',
                  overview: '',
                  summary: '',
                });
              }}
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
          </h5>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {translationFields.map((field, index) => (
              <div
                className="w-full col-span-2 grid gap-4 grid-cols-2"
                key={field.id}
              >
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: `TranslationProperties[${index}].languageCode`,
                    title: 'Language Code',
                    isRequired: true,
                  }}
                />

                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: `TranslationProperties[${index}].name`,
                    title: 'Name',
                    isRequired: true,
                    minLength: 3,
                    maxLength: 100,
                  }}
                />
                <div className="col-span-2">
                  <EditorInput
                    control={form.control}
                    errors={form.formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].overview`,
                      title: 'Overview',
                      isRequired: true,
                      minLength: 3,
                      maxLength: 100,
                    }}
                  />
                  <TextArea
                    register={form.register}
                    errors={form.formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].summary`,
                      title: 'Summary',
                      isRequired: true,
                      minLength: 3,
                      maxLength: 100,
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="m-2 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                  onClick={() => {
                    removeTranslation(index);
                  }}
                >
                  <i className="fa-solid fa-trash text-white" />
                </button>
              </div>
            ))}
          </div>
          <FormHead title="Basic Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DropDownInput
              control={form.control}
              options={listOfSuppliers || []}
              errors={form.formState.errors}
              field={{
                inputName: 'supplier_Id',
                title: 'Supplier',
                isRequired: true,
              }}
            />
            <DropDownInput
              control={form.control}
              options={listOfListingType || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listingType_Id',
                title: 'Listing Type',
                isRequired: true,
              }}
            />
            <DropDownInput
              control={form.control}
              options={listOfCities || []}
              errors={form.formState.errors}
              field={{
                inputName: 'city_Id',
                title: 'City',
                isRequired: true,
              }}
            />
          </div>

          <FormHead title="Price Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'originalPriceAED',
                title: 'Price',
                isRequired: true,
                isNumber: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'salePrice',
                title: 'Sale Price ',
                isRequired: true,
                isNumber: true,
              }}
            />
          </div>
          <FormHead title="Location" />

          <div className="col-md-12 mt-2 max-h-[700px] min-h-[700px] ">
            <GoogleMapWithSearch
              zoom={12}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
            />
          </div>

          <FormHead title="Media Files" />
          <div className="w-100 mt-4">
            <MultiFileUpload
              attachment={
                intialValues.attachments &&
                intialValues.attachments
                  .filter((x) => x.attachmentType === 'media')
                  .map((x) => x.attachmentPath)
              }
              onFilesSelected={handelUploadMediaFiles}
              title="Media Image"
            />
          </div>
          <FormHead title="Routes Map Image" />
          <div className="w-100 mt-4">
            <FileUpload
              attachment={
                intialValues.attachments &&
                intialValues.attachments.find(
                  (x) => x.attachmentType === 'RoutesMap',
                )?.attachmentPath
              }
              onFilesSelected={handelUploadRoutesMapImage}
              title="Routes Map Image"
            />
          </div>

          <FormHead title="YouTube Video" />
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: 'youTubeVideoIframe',
              title: 'YouTubeVideoLink',
              isRequired: true,
              minLength: 3,
              maxLength: 100,
            }}
          />
          {youTubeVideoIframe && youTubeVideoIframe.length > 0 && (
            <div className="grid  gap-4 mt-4">
              <YouTubeIFrame iframeSrc={youTubeVideoIframe} />
            </div>
          )}

          {/* ////////////////////////////////////////  Submit And cancle ///////////////////////////////// */}
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
                label="Cancle"
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
