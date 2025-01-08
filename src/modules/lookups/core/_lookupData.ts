import { HttpPaths } from '@/Enums/httpPaths';
import { ILookups } from './_models';

const LookupsData: Array<ILookups> = [
  {
    addApi: HttpPaths.Api_listingType_Upsert,
    deleteApi: HttpPaths.Api_listingType_Delete,
    getApi: HttpPaths.Api_listingType_GetAll,
    toggleApi: HttpPaths.Api_listingType_ToggleIsActive,
    profileApi: HttpPaths.Api_listingType_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listingType',
    menuRouting: '/lookups/listingType',
    title: 'Listing Type',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'webIcon',
        title: 'Web Icon',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_listingCategories_Upsert,
    deleteApi: HttpPaths.Api_listingCategories_Delete,
    getApi: HttpPaths.Api_listingCategories_GetAll,
    toggleApi: HttpPaths.Api_listingCategories_ToggleIsActive,
    profileApi: HttpPaths.Api_listingCategories_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listingCategories',
    menuRouting: '/lookups/listingCategories',
    title: 'Listing Categories',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'listingTypeName', header: 'Listing Type' },
    ],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'webIcon',
        title: 'Web Icon',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'listingType_Id',
        title: 'Listing Type',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: true,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: HttpPaths.Api_listingType_ListOf,
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_listingCategoryDetails_Upsert,
    deleteApi: HttpPaths.Api_listingCategoryDetails_Delete,
    getApi: HttpPaths.Api_listingCategoryDetails_GetAll,
    toggleApi: HttpPaths.Api_listingCategoryDetails_ToggleIsActive,
    profileApi: HttpPaths.Api_listingCategoryDetails_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listing-category-details',
    menuRouting: '/lookups/listing-category-details',
    title: 'Category Details',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'propertyDataType', header: 'Type' },
    ],
    inputs: [
      {
        name: 'webIcon',
        title: 'Web Icon',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'propertyDataType',
        title: 'Type',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: true,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [
          {
            name: 'String',
            id: 'String',
          },
          {
            name: 'Number',
            id: 'Number',
          },
          {
            name: 'Boolean',
            id: 'Boolean',
          },
        ],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'categoriesIds',
        title: 'Listing Categories',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: true,
        isTextArea: false,
        supplayDataURL: HttpPaths.Api_listingCategories_ListOf_WithListTypeId,
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_listingAmenities_Upsert,
    deleteApi: HttpPaths.Api_listingAmenities_Delete,
    getApi: HttpPaths.Api_listingAmenities_GetAll,
    toggleApi: HttpPaths.Api_listingAmenities_ToggleIsActive,
    profileApi: HttpPaths.Api_listingAmenities_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listingAmenities',
    menuRouting: '/lookups/listingAmenities',
    title: 'Amenities',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'listingAmenityTypeName', header: 'Type' },
    ],
    inputs: [
      {
        name: 'webIcon',
        title: 'Web Icon',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'listingAmenityType_Id',
        title: 'Listing Amenity Type',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: true,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: HttpPaths.Api_listingAmenityTypes_ListOf,
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_listingAmenityTypes_Upsert,
    deleteApi: HttpPaths.Api_listingAmenityTypes_Delete,
    getApi: HttpPaths.Api_listingAmenityTypes_GetAll,
    toggleApi: HttpPaths.Api_listingAmenityTypes_ToggleIsActive,
    profileApi: HttpPaths.Api_listingAmenityTypes_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listingAmenityTypes',
    menuRouting: '/lookups/listingAmenityTypes',
    title: 'Amenities Type',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'webIcon',
        title: 'Web Icon',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_listingEntertainments_Upsert,
    deleteApi: HttpPaths.Api_listingEntertainments_Delete,
    getApi: HttpPaths.Api_listingEntertainments_GetAll,
    toggleApi: HttpPaths.Api_listingEntertainments_ToggleIsActive,
    profileApi: HttpPaths.Api_listingType_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/listingEntertainments',
    menuRouting: '/lookups/listingEntertainments',
    title: 'Entertainments',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_Country_Upsert,
    deleteApi: HttpPaths.Api_Country_Delete,
    getApi: HttpPaths.Api_Country_GetAll,
    toggleApi: HttpPaths.Api_Country_ToggleIsActive,
    profileApi: HttpPaths.Api_Country_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/country',
    menuRouting: '/lookups/country',
    title: 'Country',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_City_Upsert,
    deleteApi: HttpPaths.Api_City_Delete,
    getApi: HttpPaths.Api_City_GetAll,
    toggleApi: HttpPaths.Api_City_ToggleIsActive,
    profileApi: HttpPaths.Api_City_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/city',
    menuRouting: '/lookups/city',
    title: 'City',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'countryName', header: 'Country Name' },
    ],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'country_Id',
        title: 'Country Name',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: true,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: HttpPaths.Api_Country_ListOf,
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_emailTypes_Upsert,
    deleteApi: HttpPaths.Api_emailTypes_Delete,
    getApi: HttpPaths.Api_emailTypes_GetAll,
    toggleApi: HttpPaths.Api_emailTypes_ToggleIsActive,
    profileApi: HttpPaths.Api_listingType_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/email-types',
    menuRouting: '/lookups/email-types',
    title: 'Email Types',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_emailTemplates_Upsert,
    deleteApi: HttpPaths.Api_emailTemplates_Delete,
    getApi: HttpPaths.Api_emailTemplates_GetAll,
    toggleApi: HttpPaths.Api_emailTemplates_ToggleIsActive,
    profileApi: HttpPaths.Api_listingType_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/email-template',
    menuRouting: '/lookups/email-template',
    title: 'Email Templates',
    columns: [
      { field: 'subject', header: 'Subject' },
      { field: 'emailTypeName', header: 'Email Type' },
    ],
    inputs: [
      {
        name: 'subject',
        title: 'Subject',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'emailType_Id',
        title: 'Email Type',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: true,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: HttpPaths.Api_emailTypes_ListOf,
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'message',
        title: 'Message',
        value: null,
        isInput: false,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        isHtml: true,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_emailMessageKeywords_Upsert,
    deleteApi: HttpPaths.Api_emailMessageKeywords_Delete,
    getApi: HttpPaths.Api_emailMessageKeywords_GetAll,
    toggleApi: HttpPaths.Api_emailMessageKeywords_ToggleIsActive,
    profileApi: HttpPaths.Api_listingType_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/email-message-keywords',
    menuRouting: '/lookups/email-message-keywords',
    title: 'Email Keywords',
    columns: [
      { field: 'key', header: 'Key' },
      { field: 'value', header: 'Value' },
    ],
    inputs: [
      {
        name: 'key',
        title: 'Key',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
      {
        name: 'value',
        title: 'Value',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_nationalities_Upsert,
    deleteApi: HttpPaths.Api_nationalities_Delete,
    getApi: HttpPaths.Api_nationalities_GetAll,
    toggleApi: HttpPaths.Api_nationalities_ToggleIsActive,
    profileApi: HttpPaths.Api_nationalities_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/nationalities',
    menuRouting: '/lookups/nationalities',
    title: 'Nationalities',
    columns: [{ field: 'name', header: 'Name' }],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
  {
    addApi: HttpPaths.Api_currencies_Upsert,
    deleteApi: HttpPaths.Api_currencies_Delete,
    getApi: HttpPaths.Api_currencies_GetAll,
    toggleApi: HttpPaths.Api_currencies_ToggleIsActive,
    profileApi: HttpPaths.Api_currencies_Profile,
    icon: 'fa-solid fa-circle text-sm w-[22px]',
    moduleName: 'Shared',
    routing: '/lookups/currencies',
    menuRouting: '/lookups/currencies',
    title: 'Currencies',
    columns: [
      { field: 'name', header: 'Name' },
      { field: 'exchangeRate', header: 'Exchange Rate' },
    ],
    inputs: [
      {
        name: 'name',
        title: 'Name',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: true,
      },
      {
        name: 'exchangeRate',
        title: 'Exchange Rate',
        value: null,
        isInput: true,
        isCheckBox: false,
        isDropDown: false,
        isMultiSelect: false,
        isTextArea: false,
        supplayDataURL: '',
        supplayData: [],
        isRequired: true,
        maxLength: 500000,
        minLength: 1,
        isRequiredSupportedLanguages: false,
      },
    ],
    className: 'col-6',
    requireCompanyId: false,
    isRequiredSupportedLanguages: true,
  },
];

export default LookupsData;
