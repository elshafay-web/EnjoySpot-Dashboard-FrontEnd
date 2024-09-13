/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { Button } from 'primereact/button';
import { useListOfListingCategories } from '@apis/lookups/apis';
import { toast } from 'sonner';
import FileUpload from '@components/FileUpload';
import { useListOfSupppliers } from '@apis/supplier/api';
import MultiSelectInput from '@components/MultiSeelct';
import MultiFileUpload from '@components/MultiFileUpload';
import YouTubeIFrame from '@components/YouTubeIFrame';
import TextArea from '@components/textArea';
import { convertObjectToFormData } from '@helpers/helpingFun';
import { IListingPackages } from '@domains/IListingPackage';
import { UpsertListingPackages } from '@apis/listingPackage/apis';
import EditorInput from '@components/editor';

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

  const { data: listOfSuppliers } = useListOfSupppliers();
  const { data: ListingCategories } = useListOfListingCategories();

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
    data.packageCategories = values.listOfPackageCategories.map(
      (item: number) => ({
          listingCategory_Id: item,
          isDeleted:
            mode === 'add'
              ? false
              : intialValues.packageCategories.map((x) => x.id).includes(item)
              ? false
              : !!intialValues.packageCategories.map((x) => x.id).includes(item),
          id:
            mode === 'add'
              ? 0
              : data.packageCategories?.find((x) => x.id === item)?.id ?? 0,
        }),
    );
    if (mode === 'edit') {
      intialValues.packageCategories.forEach((item) => {
        if (!data.packageCategories.map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.packageCategories.push(item);
        }
      });
    }

    const { packageCategories, ...rest } = data;

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
    packageCategories.forEach((item, index) => {
      formData.append(`packageCategories[${index}].id`, item.id.toString());
      formData.append(
        `packageCategories[${index}].listingCategory_Id`,
        item.listingCategory_Id.toString(),
      );
      formData.append(
        `packageCategories[${index}].listingCategoryName`,
        item.listingCategoryName ?? '',
      );
      formData.append(
        `packageCategories[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });

    mutate(formData);
  };
  const handelUploadMediaFiles = useCallback((files?: File[]) => {
    if (files) {
      const promises = files.map((file) => new Promise<{ file: ArrayBuffer; name: string }>(
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
        ));

      Promise.all(promises)
        .then((filesData) => {
          setMediaFiles(filesData);
        })
        .catch((error) => {
          console.error('Error reading files:', error);
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
      intialValues.packageCategories = intialValues.categories;
      if (
        intialValues.packageCategories &&
        intialValues.packageCategories.length > 0
      ) {
        form.setValue(
          'listOfPackageCategories',
          intialValues.packageCategories?.map((x) => x.listingCategory_Id),
        );
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
          <FormHead title="Basic Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'name',
                title: 'Name',
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

            <MultiSelectInput
              control={form.control}
              options={ListingCategories || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfPackageCategories',
                title: 'Listing Package Category',
                isRequired: true,
              }}
            />
            <div className="col-span-2">
              <TextArea
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'summary',
                  title: 'Summary',
                  isRequired: true,
                  minLength: 3,
                  maxLength: 100,
                }}
              />
            </div>
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
