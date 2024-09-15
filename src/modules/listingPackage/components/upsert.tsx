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
import { useListOfListingTypes } from '@apis/lookups/apis';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

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

    const { lat, long, ...res } = data;

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
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

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
          <FormHead title="Location" />

          <div className="col-md-12 mt-2">
            <div className="mt-4">
              <LoadScript googleMapsApiKey="AIzaSyAtKwuPnLrfrCRda600VKNGR2SFV4pAqtk">
                <GoogleMap
                  mapContainerStyle={{ height: '600px', width: '100%' }}
                  center={center}
                  zoom={7}
                  onClick={handleMapClick}
                >
                  {selectedPosition && <Marker position={selectedPosition} />}
                </GoogleMap>
              </LoadScript>
            </div>
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
