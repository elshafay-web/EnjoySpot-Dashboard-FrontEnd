/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { Button } from 'primereact/button';
import {
  useListOfEnteringment,
  useListOfListingAmenities,
  useListOfListingCategoriesWithListTypeId,
  useListOfListingDetails,
  useListOfListingTypes,
} from '@apis/lookups/apis';
import { toast } from 'sonner';
import FileUpload from '@components/FileUpload';
import { IListing } from '@domains/IListing';
import { UpsertListing } from '@apis/listing/apis';
import { useListOfSupppliers } from '@apis/supplier/api';
import MultiSelectInput from '@components/MultiSeelct';
import MultiFileUpload from '@components/MultiFileUpload';
import YouTubeIFrame from '@components/YouTubeIFrame';
import { convertObjectToFormData } from '@helpers/helpingFun';
import EditorInput from '@components/editor';
import GoogleMapWithSearch from '@components/googleMap/map';

type Props = {
  onClose: () => void;
  intialValues: IListing;
  mode: 'edit' | 'add';
  open: boolean;
};

export default function UbsertListing({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<IListing>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: intialValues,
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

  const youTubeVideoIframe = form.watch('youTubeVideoIframe');
  const listingTypeId = form.watch('listingType_Id');
  const priceType = form.watch('priceType');
  const photographer = form.watch('photographer');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'entertainmentPrices',
  });
  const { data: listOfSuppliers } = useListOfSupppliers();
  const { data: listOfListingTypes } = useListOfListingTypes();
  const { data: listOfListingCategories } =
    useListOfListingCategoriesWithListTypeId(listingTypeId ?? 0);
  const { data: listOfListingAmenities } = useListOfListingAmenities();
  const { data: listOfListingDetails } = useListOfListingDetails();
  const { data: listOfEnteringment } = useListOfEnteringment();
  const center = { lat: 25.276987, lng: 55.296249 };
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  }>(center);

  const { mutate, isPending } = useMutation({
    mutationFn: (req: FormData) => UpsertListing(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onClose();
    },
  });

  const onSubmit = (values: any) => {
    const data: IListing = values;
    if (mode === 'add') {
      if (MediaFiles.length < 3 || MediaFiles.length > 15) {
        toast.warning(
          'You can not add less than 3 images and more than 15 images',
        );
        return;
      }
    }
    if (
      data.priceDiscountPercentage &&
      data.priceDiscountPercentage > 0 &&
      data.priceDiscountValue &&
      data.priceDiscountValue > 0
    ) {
      toast.warning(
        'You can not set both price discount value and price discount percentage',
      );
      return;
    }
    data.id = intialValues.id || 0;
    data.hasEntertainment = values.entertainmentPrices.length > 0;
    data.entertainmentPrices.forEach((item) => {
      item.isDeleted =
        mode === 'add'
          ? false
          : intialValues.entertainmentPrices.find((x) => x.id === item.id)
          ? false
          : item.id > 0;
    });
    if (mode === 'edit') {
      intialValues.entertainmentPrices.forEach((item) => {
        if (!data.entertainmentPrices.map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.entertainmentPrices.push(item);
        }
      });
    }

    data.details = values.listOfDetails.map((item: number) => ({
      listingCategoryDetail_Id: item,
      isDeleted:
        mode === 'add'
          ? false
          : intialValues.details.map((x) => x.id).includes(item)
          ? false
          : !!intialValues.details.map((x) => x.id).includes(item),
      id: mode === 'add' ? 0 : data.details.find((x) => x.id === item)?.id ?? 0,
    }));
    if (mode === 'edit') {
      intialValues.details.forEach((item) => {
        if (!data.details.map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.details.push(item);
        }
      });
    }
    data.amenities = values.listOfAmenities.map((item: number) => ({
      listingAmenity_Id: item,
      isDeleted:
        mode === 'add'
          ? false
          : intialValues.details.map((x) => x.id).includes(item)
          ? false
          : !!intialValues.details.map((x) => x.id).includes(item),
      id: mode === 'add' ? 0 : data.details.find((x) => x.id === item)?.id ?? 0,
    }));
    if (mode === 'edit') {
      intialValues.amenities.forEach((item) => {
        if (!data.amenities.map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.amenities.push(item);
        }
      });
    }

    if (data.priceDiscountPercentage && data.priceDiscountPercentage > 0) {
      data.priceDiscountValue = 0;
      data.extraHours = 0;
    }
    if (data.priceDiscountValue && data.priceDiscountValue > 0) {
      data.priceDiscountPercentage = 0;
      data.extraHours = 0;
    }
    if (data.extraHours && data.extraHours > 0) {
      data.priceDiscountPercentage = 0;
      data.priceDiscountValue = 0;
    }
    const { amenities, details, entertainmentPrices, lat, long, ...rest } =
      data;
    const formData = convertObjectToFormData(rest);
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
    amenities.forEach((item, index) => {
      formData.append(`amenities[${index}].id`, item.id.toString());
      formData.append(
        `amenities[${index}].listingAmenity_Id`,
        item.listingAmenity_Id.toString(),
      );
      formData.append(
        `amenities[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });

    details.forEach((item, index) => {
      formData.append(`details[${index}].id`, item.id.toString());
      formData.append(
        `details[${index}].listingCategoryDetail_Id`,
        item.listingCategoryDetail_Id.toString(),
      );
      formData.append(`details[${index}].isDeleted`, item.isDeleted.toString());
    });

    entertainmentPrices.forEach((item, index) => {
      formData.append(
        `entertainmentPrices[${index}].id`,
        item.id?.toString() ?? '0',
      );
      formData.append(
        `entertainmentPrices[${index}].listingEntertainment_Id`,
        item.listingEntertainment_Id?.toString() ?? '0',
      );
      formData.append(
        `entertainmentPrices[${index}].price`,
        item.price?.toString() ?? '0',
      );
      formData.append(
        `entertainmentPrices[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });
    formData.append('lat', selectedPosition?.lat.toString() ?? '0');
    formData.append('long', selectedPosition?.lng.toString() ?? '0');

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
          toast.error(error);
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
    if (intialValues && mode === 'edit') {
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
      if (intialValues.amenities && intialValues.amenities.length > 0) {
        form.setValue(
          'listOfAmenities',
          intialValues.amenities?.map((x) => x.listingAmenity_Id),
        );
      }
      if (intialValues.details && intialValues.details.length > 0) {
        form.setValue(
          'listOfDetails',
          intialValues.details?.map((x) => x.listingCategoryDetail_Id),
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
        {mode === 'add' ? 'Add Listing' : 'Edit Listing'}
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
      style={{ width: '60vw', fontFamily: 'Cairo' }}
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
          <FormHead title="Basic Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'nameAr',
                title: 'Name In Arabic',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'nameEn',
                title: 'Name In English',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

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
              options={listOfListingTypes || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listingType_Id',
                title: 'Listing Type',
                isRequired: true,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfListingCategories || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listingCategory_Id',
                title: 'Listing Category',
                isRequired: true,
              }}
            />

            <MultiSelectInput
              control={form.control}
              options={listOfListingAmenities || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfAmenities',
                title: 'Amenities',
                isRequired: true,
              }}
            />

            <MultiSelectInput
              control={form.control}
              options={listOfListingDetails || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfDetails',
                title: 'Details',
                isRequired: true,
              }}
            />

            <div className="col-span-2">
              <EditorInput
                control={form.control}
                errors={form.formState.errors}
                field={{
                  inputName: 'overview',
                  title: 'Overview',
                  isRequired: true,
                  minLength: 3,
                  maxLength: 100,
                }}
              />
            </div>
          </div>

          <FormHead title="Price Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DropDownInput
              control={form.control}
              options={[
                { name: 'Person', id: 'Person' },
                { name: 'Hour', id: 'Hour' },
              ]}
              errors={form.formState.errors}
              field={{
                inputName: 'priceType',
                title: 'Price Type',
                isRequired: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'price',
                title: 'Price',
                isRequired: true,
                isNumber: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'minimumValue',
                title: 'Minimum Value',
                isRequired: true,
                isNumber: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'maximumValue',
                title: 'Maximum Value',
                isRequired: true,
                isNumber: true,
              }}
            />
          </div>
          {priceType && <FormHead title="Offer Infromation" />}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {priceType === 'Person' && (
              <>
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'priceDiscountValue',
                    title: 'Price Discount Value',
                    isNumber: true,
                  }}
                />

                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'priceDiscountPercentage',
                    title: 'Price Discount Percentage',
                    isNumber: true,
                  }}
                />
              </>
            )}

            {priceType === 'Hour' && (
              <>
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'minimumBookingHours',
                    title: 'Minimum Booking Hours',
                    isNumber: true,
                  }}
                />
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'extraHours',
                    title: 'Extra Hours',
                    isNumber: true,
                  }}
                />
              </>
            )}
          </div>

          <FormHead title="Photographer Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DropDownInput
              control={form.control}
              options={[
                { name: 'Yes', id: true },
                { name: 'No', id: false },
              ]}
              errors={form.formState.errors}
              field={{
                inputName: 'photographer',
                title: 'Photographer',
              }}
            />

            {photographer && (
              <Input
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'photographerPrice',
                  title: 'Photographer Price',
                  isNumber: true,
                }}
              />
            )}
          </div>

          <h5 className=" flex items-center justify-between  rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4" />
              Entertainment Infromation
            </div>

            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                append({
                  listingEntertainment_Id: null,
                  price: 0,
                  isDeleted: false,
                  id: 0,
                });
              }}
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
          </h5>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {fields
              .filter((x) => !x.isDeleted)
              .map((field, index) => (
                <div
                  className="w-full col-span-2 grid gap-4 grid-cols-2"
                  key={field.id}
                >
                  <DropDownInput
                    control={form.control}
                    options={listOfEnteringment || []}
                    errors={form.formState.errors}
                    field={{
                      inputName: `entertainmentPrices[${index}].listingEntertainment_Id`,
                      title: 'Entertainment',
                      isRequired: true,
                    }}
                  />

                  <div className="flex justify-between items-end">
                    <Input
                      register={form.register}
                      errors={form.formState.errors}
                      field={{
                        inputName: `entertainmentPrices[${index}].price`,
                        title: 'Price',
                        isNumber: true,
                        isRequired: true,
                      }}
                    />

                    <button
                      type="button"
                      className="m-2 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <i className="fa-solid fa-trash text-white" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <FormHead title="Location" />

          <div className="col-md-12 mt-2 max-h-[700px] min-h-[700px] ">
            <GoogleMapWithSearch
              zoom={12}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
            />
          </div>

          {mode === 'add' && (
            <>
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
            </>
          )}

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
