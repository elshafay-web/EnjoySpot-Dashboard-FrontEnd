/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/no-array-index-key */
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
  useListOfCities1,
  useListOfComplimentaryItems,
  useListOfCrewSpeakes,
  useListOfEnteringment,
  useListOfHaborItems,
  useListOfListingAmenities,
  useListOfListingCategoriesWithListTypeId,
  useListOfListingDetailsWithListTypeId,
  useListOfListingTypes,
  useListOfLocationTypesItems,
  useListOfSuitableItems,
} from '@apis/lookups/apis';
import { toast } from 'sonner';
import FileUpload from '@components/FileUpload';
import { IListing, IListingDetails } from '@domains/IListing';
import { UpsertListing } from '@apis/listing/apis';
import { useListOfSupppliers } from '@apis/supplier/api';
import MultiSelectInput from '@components/MultiSeelct';
import MultiFileUpload from '@components/MultiFileUpload';
import YouTubeIFrame from '@components/YouTubeIFrame';
import { convertObjectToFormData } from '@helpers/helpingFun';
import GoogleMapWithSearch from '@components/googleMap/map';
import Edit1 from '@components/Edit1';
import TranslationFields from './TranslationFields';

type Props = {
  onClose: () => void;
  intialValues: IListing;
  mode: 'edit' | 'add';
  open: boolean;
};

const MANDATORY_DETAILS: { [key: number]: number[] } = {
  1: [8, 3, 7], // Category ID 1 requires details 8, 3, and 7
  2: [16, 11], // Category ID 2 requires details 8, 3, and 7
  3: [7, 11], // Category ID 3 requires details 8, 3, and 7
  4: [15, 11], // Category ID 4 requires details 8, 3, and 7
};

export default function UbsertListing({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const initialValues = {
    ...intialValues,
    TranslationProperties: intialValues.TranslationProperties || [
      {
        languageCode: '', // Set as needed
        name: intialValues.name || '',
        overview: intialValues.overview || '',
        policy: intialValues.policy || '',
        routeDetails: intialValues.routeDetails,
      },
    ],
    Details: intialValues.details || [
      {
        id: 0,
        listingCategoryDetail_Id: 3,
        isDeleted: false,
        translationProperties: [
          {
            languageCode: '',
            dValue: '',
          },
        ],
      },
      {
        id: 0,
        listingCategoryDetail_Id: 7,
        isDeleted: false,
        translationProperties: [
          {
            languageCode: '',
            dValue: '',
          },
        ],
      },
      {
        id: 0,
        listingCategoryDetail_Id: 8,
        isDeleted: false,
        translationProperties: [
          {
            languageCode: '',
            dValue: '',
          },
        ],
      },
    ],
  };
  const form = useForm<IListing>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: initialValues,
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
  type Detail = {
    id: number;
    listingCategoryDetail_Id?: number;
    isDeleted?: boolean;
  };
  const [listOfInitialDetails, setListOfInitialDetails] = useState<Detail[]>(
    [],
  );
  // const [listOfInitialAmenities, setListOfInitialAmenities] = useState([]);
  const youTubeVideoIframe = form.watch('youTubeVideoIframe');
  const cityTypeId = form.watch('city_Id');
  const listingTypeId = form.watch('listingType_Id');
  const listingCategoryId = form.watch('listingCategory_Id');
  const priceType = form.watch('priceType');
  const photographer = form.watch('photographer');
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'entertainmentPrices',
  });
  const {
    fields: translationFields,
    append: appendTranslation,
    remove: removeTranslation,
  } = useFieldArray({
    control: form.control,
    name: 'TranslationProperties',
  });
  const {
    fields: detailsFields,
    append: appendDetails,
    remove: removeDetails,
  } = useFieldArray({
    control: form.control,
    name: 'Details',
  });

  const { data: listOfSuppliers } = useListOfSupppliers();
  const { data: listOfCities } = useListOfCities1();
  const { data: listOfListingTypes } = useListOfListingTypes();
  const { data: listOfListingCategories } =
    useListOfListingCategoriesWithListTypeId(listingTypeId ?? 0);
  const { data: listOfListingCategories1 } = useListOfSuitableItems();
  const { data: listOfListingAmenities } = useListOfListingAmenities();
  const { data: listOfCrewSpeakes } = useListOfCrewSpeakes();
  const { data: listOfComplimentaryItems } = useListOfComplimentaryItems();
  const { data: listOfHaborItems } = useListOfHaborItems(
    cityTypeId ?? 0,
    listingTypeId ?? 0,
  );

  const { data: listOfHaborTypesItems } = useListOfLocationTypesItems();
  const { data: listOfListingDetails } = useListOfListingDetailsWithListTypeId(
    listingCategoryId ?? 0,
  );
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

  useEffect(() => {
    const fetchListingCategoryDetails = async () => {
      try {
        const response = await fetch(
          `https://enjoyspot.premiumasp.net/api/listings/GetProfileDetails/${initialValues.id}`,
        );
        const result = await response.json();

        if (result.isSuccess && Array.isArray(result.data)) {
          setListOfInitialDetails(result.data); // Update state

          form.setValue(
            'details',
            result.data.map((detail: any) => ({
              ...detail,
              translationProperties: detail.translationProperties?.length
                ? detail.translationProperties
                : [
                    {
                      languageCode: '',
                      dValue: detail.listingCategoryDetailValue || '',
                    },
                  ],
            })),
          );
        }
      } catch (error) {
        console.log('Error fetching listing category details:', error);
      }
    };

    if (initialValues.id) {
      fetchListingCategoryDetails();
    }
  }, [initialValues.id]);

  useEffect(() => {
    const fetchListingCategoryAmenities = async () => {
      try {
        const response = await fetch(
          `https://enjoyspot.premiumasp.net/api/listings/GetProfileAmenities/${initialValues.id}`,
        );
        const result = await response.json();

        if (result.isSuccess) {
          console.log(result.data);
          if (Array.isArray(result.data) && result.data.length > 0) {
            form.setValue(
              'listOfAmenities',
              result.data.map((x: any) => x.listingAmenity_Id),
            );
          }
        }
      } catch (error) {
        console.log('Error fetching listing category amenities:', error);
      }
    };

    if (initialValues.id) {
      fetchListingCategoryAmenities();
    }
  }, [initialValues.id]);

  const onSubmit = (values: any) => {
    const data: IListing = values;
    console.log(data);

    // Validate required fields
    if (!values.supplier_Id) {
      toast.warning('Supplier is required');
      return;
    }
    if (!values.listingCategory_Id) {
      toast.warning('Listing Category is required');
      return;
    }
    if (!values.city_Id) {
      toast.warning('City is required');
      return;
    }
    if (!values.ListingLocation_Id) {
      toast.warning(
        'Location is required. Please select a location from the dropdown.',
      );
      return;
    }
    if (!values.listingType_Id) {
      toast.warning('Listing Type is required');
      return;
    }
    if (!values.listOfAmenities?.length) {
      toast.warning('At least one Amenity is required');
      return;
    }
    if (!values.details?.length) {
      toast.warning('At least one Detail is required');
      return;
    }
    if (!values.TranslationProperties?.length) {
      toast.warning('At least one Translation Property is required');
      return;
    }

    // Validate mandatory details
    const categoryId = values.listingCategory_Id;
    const mandatoryDetails = MANDATORY_DETAILS[categoryId] || [];
    const selectedDetailIds = values.details.map((d: any) =>
      Number(d.listingCategoryDetail_Id),
    );

    const missingDetails = mandatoryDetails.filter(
      (id) => !selectedDetailIds.includes(id),
    );
    if (missingDetails.length > 0) {
      toast.warning(
        `Please add all mandatory details for this category. Missing details: ${missingDetails.join(
          ', ',
        )}`,
      );
      return;
    }

    // Add back media files validation
    if (mode === 'add' && (MediaFiles.length < 3 || MediaFiles.length > 15)) {
      toast.warning('Please upload between 3 and 15 images for the listing');
      return;
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

    data.id = initialValues.id || 0;
    data.hasEntertainment = values.entertainmentPrices.length > 0;
    data.entertainmentPrices.forEach((item) => {
      item.isDeleted =
        mode === 'add'
          ? false
          : initialValues.entertainmentPrices.find((x) => x.id === item.id)
          ? false
          : item.id > 0;
    });

    if (mode === 'edit') {
      initialValues.entertainmentPrices.forEach((item) => {
        if (!data.entertainmentPrices.map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.entertainmentPrices.push(item);
        }
      });
    }

    const initialDetails: Detail[] = listOfInitialDetails || [];

    // Fix the Details array handling
    data.Details = values.details.map((item: any) => {
      const existsInInitial = initialDetails.some((x) => x.id === item.id);
      return {
        listingCategoryDetail_Id: Number(item.listingCategoryDetail_Id),
        isDeleted: mode === 'add' ? false : !existsInInitial,
        id: mode === 'add' ? 0 : item.id || 0,
        translationProperties: item.translationProperties || [],
      };
    });

    if (mode === 'edit') {
      initialDetails.forEach((item) => {
        if (!data.Details.some((x) => x.id === item.id)) {
          data.Details.push({ ...item, isDeleted: true });
        }
      });
    }

    data.amenities = (values.listOfAmenities || []).map((item: number) => ({
      listingAmenity_Id: item,
      isDeleted:
        mode === 'add'
          ? false
          : (initialValues.Details || []).map((x) => x.id).includes(item)
          ? false
          : !!(initialValues.Details || []).map((x) => x.id).includes(item),
      id: mode === 'add' ? 0 : data.Details.find((x) => x.id === item)?.id ?? 0,
    }));

    if (mode === 'edit') {
      (initialValues.amenities || []).forEach((item) => {
        if (!(data.amenities || []).map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.amenities.push(item);
        }
      });
    }

    data.suitableFor = (values.listOfListingCategories1 || []).map(
      (item: number) => ({
        suitableFor_Id: item,
        isDeleted:
          mode === 'add'
            ? false
            : (initialValues.suitableFor || []).map((x) => x.id).includes(item)
            ? false
            : !!(initialValues.suitableFor || [])
                .map((x) => x.id)
                .includes(item),
        id:
          mode === 'add'
            ? 0
            : data.suitableFor.find((x) => x.id === item)?.id ?? 0,
      }),
    );

    if (mode === 'edit') {
      (initialValues.suitableFor || []).forEach((item) => {
        if (!(data.suitableFor || []).map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.suitableFor.push(item);
        }
      });
    }

    data.crewSpeakes = (values.listOfCrewSpeakes || []).map((item: number) => ({
      language_Id: item,
      isDeleted:
        mode === 'add'
          ? false
          : (initialValues.crewSpeakes || []).map((x) => x.id).includes(item)
          ? false
          : !!(initialValues.crewSpeakes || []).map((x) => x.id).includes(item),
      id:
        mode === 'add'
          ? 0
          : data.crewSpeakes.find((x) => x.id === item)?.id ?? 0,
    }));

    if (mode === 'edit') {
      (initialValues.crewSpeakes || []).forEach((item) => {
        if (!(data.crewSpeakes || []).map((x) => x.id).includes(item.id)) {
          item.isDeleted = true;
          data.crewSpeakes.push(item);
        }
      });
    }

    data.ComplimentaryItems = (values.listOfComplimentaryItems || []).map(
      (item: number) => ({
        listingComplimentary_Id: item,
        isDeleted:
          mode === 'add'
            ? false
            : (initialValues.ComplimentaryItems || [])
                .map((x) => x.id)
                .includes(item)
            ? false
            : !!(initialValues.ComplimentaryItems || [])
                .map((x) => x.id)
                .includes(item),
        id:
          mode === 'add'
            ? 0
            : (data.ComplimentaryItems || []).find((x) => x.id === item)?.id ??
              0,
      }),
    );

    if (mode === 'edit') {
      (initialValues.ComplimentaryItems || []).forEach((item) => {
        if (
          !(data.ComplimentaryItems || []).map((x) => x.id).includes(item.id)
        ) {
          item.isDeleted = true;
          (data.ComplimentaryItems || []).push(item);
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

    const {
      amenities,
      Details,
      entertainmentPrices,
      lat,
      long,
      TranslationProperties,
      crewSpeakes,
      ComplimentaryItems,
      suitableFor,
      ...rest
    } = data;

    const formData = convertObjectToFormData(rest);

    // Add media files if they exist (optional)
    if (MediaFiles.length > 0) {
      MediaFiles.forEach((file) => {
        formData.append('mediaImages', new Blob([file.file]), file.name);
      });
    }

    // Add routes map image if it exists (optional)
    if (RoutesMapImage.file) {
      formData.append(
        'routesMapImage',
        new Blob([RoutesMapImage.file]),
        RoutesMapImage.name,
      );
    }

    // Add all the arrays
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

    suitableFor.forEach((item, index) => {
      formData.append(`suitableFor[${index}].id`, item.id.toString());
      formData.append(
        `suitableFor[${index}].suitableFor_Id`,
        item.suitableFor_Id.toString(),
      );
      formData.append(
        `suitableFor[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });

    crewSpeakes.forEach((item, index) => {
      formData.append(`crewSpeakes[${index}].id`, item.id.toString());
      formData.append(
        `crewSpeakes[${index}].language_Id`,
        item.language_Id.toString(),
      );
      formData.append(
        `crewSpeakes[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });

    ComplimentaryItems.forEach((item, index) => {
      formData.append(`ComplimentaryItems[${index}].id`, item.id.toString());
      formData.append(
        `ComplimentaryItems[${index}].listingComplimentary_Id`,
        item.listingComplimentary_Id.toString(),
      );
      formData.append(
        `ComplimentaryItems[${index}].isDeleted`,
        item.isDeleted.toString(),
      );
    });

    if (Array.isArray(Details)) {
      Details.forEach((item, index) => {
        formData.append(`Details[${index}].id`, item.id?.toString() ?? '0');
        formData.append(
          `Details[${index}].listingCategoryDetail_Id`,
          item.listingCategoryDetail_Id?.toString() ?? '0',
        );
        formData.append(
          `Details[${index}].isDeleted`,
          item.isDeleted?.toString() ?? 'false',
        );

        (item.translationProperties || []).forEach(
          (translation, translationIndex) => {
            formData.append(
              `Details[${index}].translationProperties[${translationIndex}].languageCode`,
              translation.languageCode || '',
            );
            formData.append(
              `Details[${index}].translationProperties[${translationIndex}].dValue`,
              translation.dValue || '',
            );
          },
        );
      });
    }

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
        `TranslationProperties[${index}].policy`,
        item.policy ?? '',
      );
      formData.append(
        `TranslationProperties[${index}].routeDetails`,
        item.routeDetails ?? '',
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
          setMediaFiles((prevFiles) => {
            // Avoid duplicate files
            const uniqueFiles = filesData.filter(
              (newFile) =>
                !prevFiles.some((file) => file.name === newFile.name),
            );
            return [...prevFiles, ...uniqueFiles];
          });
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to upload files');
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
    if (initialValues && mode === 'edit') {
      const filteredObj = Object.fromEntries(
        Object.entries(initialValues).filter(([, v]) => v !== null),
      );
      form.reset(filteredObj);

      if (initialValues.crewSpeakes && initialValues.crewSpeakes.length > 0) {
        form.setValue(
          'listOfCrewSpeakes',
          initialValues.crewSpeakes?.map((x) => x.language_Id),
        );
      }
      if (initialValues.suitableFor && initialValues.suitableFor.length > 0) {
        form.setValue(
          'listOfListingCategories1',
          initialValues.suitableFor?.map((x) => x.suitableFor_Id),
        );
      }

      if (
        initialValues.ComplimentaryItems &&
        initialValues.ComplimentaryItems.length > 0
      ) {
        form.setValue(
          'listOfComplimentaryItems',
          initialValues.ComplimentaryItems?.map(
            (x) => x.listingComplimentary_Id,
          ),
        );
      }
      if (initialValues.lat && initialValues.long) {
        setSelectedPosition({
          lat: intialValues.lat,
          lng: intialValues.long,
        });
      }
      if (initialValues.attachments && initialValues.attachments.length > 0) {
        const youtubeAttachment = initialValues.attachments.find(
          (x) => x.attachmentType === 'YouTubeVideoIframe',
        );

        if (youtubeAttachment?.attachmentPath) {
          form.setValue('youTubeVideoIframe', youtubeAttachment.attachmentPath);
        }
      }
    }
  }, [mode, form]);
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
              options={listOfCrewSpeakes || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfCrewSpeakes',
                title: 'Crew Speaks',
                isRequired: false,
              }}
            />
            <MultiSelectInput
              control={form.control}
              options={listOfComplimentaryItems || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfComplimentaryItems',
                title: 'Complimentary Items',
                isRequired: false,
              }}
            />
            <MultiSelectInput
              control={form.control}
              options={listOfListingCategories1 || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listOfListingCategories1',
                title: 'Suitable For',
                isRequired: false,
              }}
            />
            {/* <DropDownInput
              control={form.control}
              options={listOfHaborTypesItems || []}
              errors={form.formState.errors}
              field={{
                inputName: 'LocationTypeId',
                title: 'Location Type Items',
                isRequired: false,
              }}
            /> */}
          </div>
          <FormHead title="Location" />
          <div className="col-md-12 mt-2">
            <div className="text-red-500 font-bold mb-2">
              * Please select a location from the dropdown below. You can use
              the map to search and find your location.
            </div>
            <div className="max-h-[700px] min-h-[700px]">
              <GoogleMapWithSearch
                zoom={12}
                selectedPosition={selectedPosition}
                setSelectedPosition={setSelectedPosition}
              />
            </div>
            {cityTypeId && listingTypeId ? (
              <DropDownInput
                control={form.control}
                options={listOfHaborItems || []}
                errors={form.formState.errors}
                field={{
                  inputName: 'ListingLocation_Id',
                  title: 'Location Items',
                  isRequired: true,
                }}
              />
            ) : (
              <div className="text-yellow-600 font-bold mt-2">
                Please select both City and Listing Type to see available
                locations
              </div>
            )}
          </div>
          <h5 className="flex items-center justify-between rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4" />
              Translation Properties
            </div>

            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                appendTranslation({
                  languageCode: 'en',
                  name: '',
                  overview: '',
                  policy: '',
                  routeDetails: '',
                });
              }}
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
          </h5>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {translationFields
              .filter((x) => !x.languageCode)
              .map((field, index) => (
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
                    <Edit1
                      control={form.control}
                      errors={form.formState.errors}
                      field={{
                        inputName: `TranslationProperties[${index}].overview`,
                        title: 'Overview',
                        isRequired: true,
                        minLength: 3,
                        maxLength: 500,
                      }}
                    />
                    <Edit1
                      control={form.control}
                      errors={form.formState.errors}
                      field={{
                        inputName: `TranslationProperties[${index}].policy`,
                        title: 'Policy',
                        isRequired: true,
                        minLength: 3,
                        maxLength: 500,
                      }}
                    />
                    <Edit1
                      control={form.control}
                      errors={form.formState.errors}
                      field={{
                        inputName: `TranslationProperties[${index}].routeDetails`,
                        title: 'Route Details',
                        isRequired: true,
                        minLength: 3,
                        maxLength: 500,
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

          <h5 className="flex items-center justify-between rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4" />
              Details Information
              {MANDATORY_DETAILS[listingCategoryId] && (
                <span className="text-red-500 text-sm ml-2">
                  (Mandatory details:{' '}
                  {MANDATORY_DETAILS[listingCategoryId].join(', ')})
                </span>
              )}
            </div>

            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                appendDetails({
                  listingCategoryDetail_Id: 0,
                  isDeleted: false,
                  id: 0,
                  translationProperties: [
                    {
                      languageCode: '',
                      dValue: '',
                    },
                  ],
                });
              }}
            >
              <i className="fa-solid fa-plus text-white text-base" />
            </button>
          </h5>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {detailsFields
              .filter((x) => !x.isDeleted)
              .map((field, index) => (
                <div className="w-full  grid  col-span-2 gap-4 " key={field.id}>
                  <DropDownInput
                    control={form.control}
                    options={listOfListingDetails || []}
                    errors={form.formState.errors}
                    field={{
                      inputName: `details[${index}].listingCategoryDetail_Id`,
                      title: 'Details',
                      isRequired: true,
                    }}
                  />

                  <TranslationFields form={form} detailIndex={index} />

                  <button
                    type="button"
                    className="mt-8 w-10 h-10 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                    onClick={() => {
                      removeDetails(index);
                    }}
                  >
                    <i className="fa-solid fa-trash text-white" />
                  </button>
                </div>
              ))}
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

          <FormHead title="Media Files" />
          <div className="w-100 mt-4">
            <div className="text-red-500 font-bold mb-2">
              * Please upload between 3 and 15 images for the listing
            </div>
            <MultiFileUpload
              attachment={
                initialValues.attachments &&
                initialValues.attachments
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
                initialValues.attachments &&
                initialValues.attachments.find(
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
              isRequired: false,
              minLength: 3,
              maxLength: 500,
              pattern: {
                value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                message: 'Please enter a valid YouTube URL',
              },
            }}
          />
          {youTubeVideoIframe && youTubeVideoIframe.length > 0 && (
            <div className="grid  gap-4 mt-4">
              <YouTubeIFrame iframeSrc={youTubeVideoIframe} />
            </div>
          )}
          {/* ////////////////////////////////////////  Submit And cancle ///////////////////////////////// */}
          <div className="flex items-center mt-4  fixed bottom-4 ">
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
