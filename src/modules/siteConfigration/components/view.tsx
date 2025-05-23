/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
// import { ISiteConfiguration } from '@domains/ISiteConfiguration';
// @ts-nocheck

import { useGetSiteConfigurationObject } from '@apis/siteConfiguration/apis';
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { toast } from 'sonner';
import axios from 'axios';
import { HttpPaths } from '@Enums/httpPaths';
import Input from '@components/input';
import FileUpload from '@components/FileUpload';
import { useFieldArray, useForm } from 'react-hook-form';
import { isVedioPath } from '@helpers/helpingFun';
// import { toast } from 'react-toastify';

export default function ViewSiteConfiguration({
  setSelectedItem,
  setOpen,
  selectedItem,
}: {
  setSelectedItem: (item: any) => void;
  setOpen: (open: boolean) => void;
  selectedItem: any;
}) {
  const { data, setData } = useGetSiteConfigurationObject();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'view' | 'edit'>('view');
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: {
      items: [],
      actionURl: '',
      TranslationProperties: [],
    },
  });

  const handleEdit = (item: any) => {
    // Transform the item to match the form's expected structure
    const transformedItem = {
      ...item,
      ActionUrl: item.actionURl,
      translationProperties: [
        {
          languageCode: 'en',
          title: item.title,
          description: item.description,
          button: item.button,
        },
      ],
    };

    setSelectedItem({
      id: data.slider.id,
      MovingInSecounds: data.slider.movingInSecounds,
      items: [transformedItem],
    });
    setOpen(true);
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    setSidebarMode('view');
    setIsSidebarOpen(true);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'TranslationProperties',
  });
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await axios.delete(
        HttpPaths.Api_siteConfigurations_Delete_Item,
        {
          params: { id },
        },
      );

      if (response.data.isSuccess) {
        toast.success('Item deleted successfully!');
        setData((prev: any) => ({
          ...prev,
          slider: {
            items: prev.slider.items.filter((item: any) => item.id !== id),
          },
        }));
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedItem) {
      toast.error('No item selected for update.');
      return;
    }

    const formData = new FormData();
    formData.append('Id', selectedItem.id || '');
    formData.append('ActionUrl', data.actionURl || '');

    // Add Translation Properties dynamically
    data.TranslationProperties.forEach((translation: any, index: number) => {
      formData.append(
        `TranslationProperties[${index}].languageCode`,
        translation.languageCode,
      );
      formData.append(
        `TranslationProperties[${index}].title`,
        translation.title,
      );
      formData.append(
        `TranslationProperties[${index}].description`,
        translation.description,
      );
      formData.append(
        `TranslationProperties[${index}].button`,
        translation.button,
      );
    });

    // Append image if selected
    if (files.length > 0) {
      formData.append('ImageFile', files[0]);
    }

    try {
      const response = await axios.post(
        HttpPaths.Api_siteConfigurations_Edit_Item,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      if (response.data?.isSuccess) {
        toast.success('Item updated successfully!');
        setIsSidebarOpen(false);

        // Update the state with the new data
        setData((prev: any) => ({
          ...prev,
          slider: {
            items: prev.slider.items.map((item: any) =>
              item.id === selectedItem.id
                ? {
                    ...item,
                    ...selectedItem,
                    TranslationProperties: data.TranslationProperties,
                  }
                : item,
            ),
          },
        }));
      } else {
        toast.error(response.data.message || 'Failed to update item.');
      }
    } catch (error) {
      toast.error('Failed to update item.');
      console.error(error);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.slider.items.map((item: any) => (
          <div
            key={item.id}
            className="border p-4 bg-white rounded-lg shadow-lg"
          >
            {/* Image or Video Thumbnail */}
            {isVedioPath(item.imagePath) ? (
              <div className="flex items-center justify-center w-full h-[300px] bg-gray-200 rounded-md">
                <i className="fa-solid fa-video text-6xl text-gray-400" />
              </div>
            ) : (
              <img
                src={`https://enjoyspot.premiumasp.net${item.imagePath}`}
                alt={item.title}
                width={300}
                height={200}
                className="rounded-md w-full !h-[300px]"
              />
            )}
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <button className="mt-2 px-4 py-[6px] bg-blue-500 text-white rounded-md">
              {item.button}
            </button>

            <div className="flex gap-2 mt-2">
              <button
                className="px-4 py-[6px] bg-blue-500 text-white rounded-md"
                onClick={() => handleView(item)}
              >
                View
              </button>
              <button
                className="px-4 py-[6px] bg-yellow-500 text-white rounded-md"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="px-4 py-[6px] bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Sidebar
        visible={isSidebarOpen}
        style={{ width: '60vw', fontFamily: 'Cairo' }}
        position="right"
        onHide={() => setIsSidebarOpen(false)}
      >
        {sidebarMode === 'view' && selectedItem && (
          <div>
            <h2 className="text-xl font-semibold">{selectedItem.title}</h2>
            {isVedioPath(selectedItem.imagePath) ? (
              <div className="flex items-center justify-center w-full h-[300px] bg-gray-200 rounded-md">
                <i className="fa-solid fa-video text-6xl text-gray-400" />
              </div>
            ) : (
              <img
                src={`https://enjoyspot.premiumasp.net${selectedItem.imagePath}`}
                alt={selectedItem.title}
                className="w-full rounded-md mt-2"
              />
            )}
            <p className="text-gray-600 mt-2">{selectedItem.description}</p>
            <button className="mt-2 px-4 py-[6px] bg-blue-500 text-white rounded-md">
              {selectedItem.button}
            </button>
          </div>
        )}

        {sidebarMode === 'edit' && selectedItem && (
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="flex flex-col gap-3"
          >
            <h2 className="text-xl font-semibold">Edit Item</h2>
            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() =>
                append({
                  languageCode: '',
                  title: '',
                  description: '',
                  button: '',
                })
              }
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {fields.map((field, index) => (
                <div
                  className="w-full col-span-2 grid gap-4 grid-cols-2"
                  key={field.id}
                >
                  <Input
                    register={register}
                    errors={formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].languageCode`,
                      title: 'Language Code',
                      isRequired: true,
                      isNumber: false,
                    }}
                  />
                  <Input
                    register={register}
                    errors={formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].title`,
                      title: 'Title',
                      isRequired: true,
                      isNumber: false,
                    }}
                  />
                  <Input
                    register={register}
                    errors={formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].description`,
                      title: 'Description',
                      isRequired: true,
                      isNumber: false,
                    }}
                  />
                  <Input
                    register={register}
                    errors={formState.errors}
                    field={{
                      inputName: `TranslationProperties[${index}].button`,
                      title: 'Button',
                      isRequired: true,
                      isNumber: false,
                    }}
                  />
                  <button
                    type="button"
                    className="m-2 w-10 h-10 mt-10 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                    onClick={() => remove(index)} // Remove translation
                  >
                    <i className="fa-solid fa-trash text-white" />
                  </button>
                </div>
              ))}
            </div>
            <Input
              register={register}
              errors={formState.errors}
              field={{
                inputName: 'actionURl',
                title: 'Action Url',
                isRequired: true,
                isNumber: false,
              }}
            />
            <FileUpload
              onFilesSelected={(file) => {
                if (file) setFiles([file]);
              }}
              title="Image"
              attachment={selectedItem?.imagePath}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-[6px] bg-green-500 text-white rounded-md"
            >
              Save
            </button>
          </form>
        )}
      </Sidebar>
    </div>
  );
}
