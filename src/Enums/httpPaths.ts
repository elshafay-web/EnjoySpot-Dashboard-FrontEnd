export enum HttpPaths {
  // ************** Auth ******************

  Api_Login = '/api/dashboard/auth/token',
  Api_Logout = '/api/v1/Authentication/Logout/',

  // ************** users ******************

  Api_users_GetAll = '/api/users/getAll',
  Api_users_ListOf = '/api/users/listOf',
  Api_users_Delete = '/api/users/delete/',
  Api_users_ToggleIsActive = '/api/users/toggelActive/',
  Api_users_Upsert = '/api/users/upsert',
  Api_users_Profile = '/api/users/GetProfile/',

  // ************** roles ******************

  Api_permissions_ListOf = '/api/roles/getPermissions',
  Api_roles_ListOf = '/api/roles/listOf',
  Api_roles_GetAll = '/api/roles/getAll',
  Api_roles_Delete = '/api/roles/delete/',
  Api_roles_ToggleIsActive = '/api/roles/toggelActive/',
  Api_roles_Upsert = '/api/roles/upsert',
  Api_roles_Profile = '/api/roles/GetProfile/',

  // ************** Notification ******************

  Api_Notification_GETALL = '/api/v1/NotiMessage/GetUserMessages?User_Id=',
  Api_Notification_MarkAll_As_Read = '/api/v1/NotiMessage/ReadAllUserNotifications',

  // ************** City ******************

  Api_City_GetAll = '/api/cities/getAll',
  Api_City_ListOf = '/api/cities/listOf?countryId=',
  Api_City_Delete = '/api/cities/delete/',
  Api_City_ToggleIsActive = '/api/cities/toggelActive/',
  Api_City_Upsert = '/api/cities/upsert',
  Api_City_Profile = '/api/cities/getProfile/',

  // ************** Country ******************

  Api_Country_GetAll = '/api/countries/getAll',
  Api_Country_ListOf = '/api/countries/listOf',
  Api_Country_Delete = '/api/countries/delete/',
  Api_Country_ToggleIsActive = '/api/countries/toggelActive/',
  Api_Country_Upsert = '/api/countries/upsert',
  Api_Country_Profile = '/api/countries/getProfile/',

  // ************** suitableFor ******************

  Api_Suitable_GetAll = '/api/listingSuitableFor/getAll',
  Api_Suitable_ListOf = '/api/listingSuitableFor/listOf',
  Api_Suitable_Delete = '/api/listingSuitableFor/delete/',
  Api_Suitable_ToggleIsActive = '/api/listingSuitableFor/toggelActive/',
  Api_Suitable_Upsert = '/api/listingSuitableFor/upsert',
  Api_Suitable_Profile = '/api/listingSuitableFor/getProfile/',

  // ************** listingType ******************

  Api_listingType_GetAll = '/api/listingTypes/getAll',
  Api_listingType_Profile = '/api/listingTypes/getProfile/',
  Api_listingType_ListOf = '/api/listingTypes/listOf',
  Api_listingType_Delete = '/api/listingTypes/delete/',
  Api_listingType_ToggleIsActive = '/api/listingTypes/toggelActive/',
  Api_listingType_Upsert = '/api/listingTypes/upsert',

  // ************** listingCategories ******************

  Api_listingCategories_GetAll = '/api/listingCategories/getAll',
  Api_listingCategories_ListOf = '/api/listingCategories/listOf',
  Api_listingCategories_ListOf_WithListTypeId = '/api/listingCategories/listOf?listingTypeId=',
  Api_listingCategories_Delete = '/api/listingCategories/delete/',
  Api_listingCategories_ToggleIsActive = '/api/listingCategories/toggelActive/',
  Api_listingCategories_Upsert = '/api/listingCategories/upsert',
  Api_listingCategories_Profile = '/api/listingCategories/GetProfile/',

  // ************** ListingComplimentary ******************

  Api_ListingComplimentary_GetAll = '/api/listingComplimentary/getAll',
  Api_ListingComplimentary_ListOf = '/api/listingComplimentary/listOf',
  Api_ListingComplimentary_Delete = '/api/listingComplimentary/delete/',
  Api_ListingComplimentary_ToggleIsActive = '/api/listingComplimentary/toggelActive/',
  Api_ListingComplimentary_Upsert = '/api/listingComplimentary/upsert',
  Api_ListingComplimentary_Profile = '/api/listingComplimentary/GetProfile/',

  // ************** listingHabor ******************

  Api_listingHabor_GetAll = '/api/listingLocation/getAll',
  Api_listingHabor_ListOf = '/api/listingLocation/listOf',
  Api_listingHaborTypes_ListOf = '/api/listingLocationType/listOf',
  Api_listingHabor_Delete = '/api/listingLocation/delete/',
  Api_listingHabor_ToggleIsActive = '/api/listingLocation/toggelActive/',
  Api_listingHabor_Upsert = '/api/listingLocation/upsert',
  Api_listingHabor_Profile = '/api/listingLocation/GetProfile/',

  // ************** listingAmenities ******************

  Api_listingAmenities_GetAll = '/api/listingAmenities/getAll',
  Api_listingAmenities_ListOf = '/api/listingAmenities/listOf',
  Api_listingAmenities_Delete = '/api/listingAmenities/delete/',
  Api_listingAmenities_ToggleIsActive = '/api/listingAmenities/toggelActive/',
  Api_listingAmenities_Upsert = '/api/listingAmenities/upsert',
  Api_listingAmenities_Profile = '/api/listingAmenities/GetProfile/',

  // ************** listingAmenityTypes ******************

  Api_listingAmenityTypes_GetAll = '/api/listingAmenityTypes/getAll',
  Api_listingAmenityTypes_ListOf = '/api/listingAmenityTypes/listOf',
  Api_listingAmenityTypes_Delete = '/api/listingAmenityTypes/delete/',
  Api_listingAmenityTypes_ToggleIsActive = '/api/listingAmenityTypes/toggelActive/',
  Api_listingAmenityTypes_Upsert = '/api/listingAmenityTypes/upsert',
  Api_listingAmenityTypes_Profile = '/api/listingAmenityTypes/GetProfile/',

  // ************** listingEntertainments ******************

  Api_listingEntertainments_GetAll = '/api/listingEntertainments/getAll',
  Api_listingEntertainments_ListOf = '/api/listingEntertainments/listOf',
  Api_listingEntertainments_Delete = '/api/listingEntertainments/delete/',
  Api_listingEntertainments_ToggleIsActive = '/api/listingEntertainments/toggelActive/',
  Api_listingEntertainments_Upsert = '/api/listingEntertainments/upsert',

  // ************** Supplier ******************

  Api_Supplier_GetAll = '/api/suppliers/getAll',
  Api_Supplier_ListOf = '/api/suppliers/listOf',
  Api_Supplier_Delete = '/api/suppliers/delete/',
  Api_Supplier_ToggleIsActive = '/api/suppliers/toggelActive/',
  Api_Supplier_Upsert = '/api/suppliers/upsert',
  Api_Supplier_Profile = '/api/suppliers/getProfile?id=',

  // ************** Listing ******************

  Api_Listing_GetAll = '/api/listings/getAll',
  Api_Listing_ListOf = '/api/Listings/listOf',
  Api_Listing_Delete = '/api/Listings/delete/',
  Api_Listing_Delete_Attachment = '/api/listings/deleteAttachment/',
  Api_Listing_ToggleIsActive = '/api/Listings/toggelActive/',
  Api_Listing_Upsert = '/api/Listings/upsert',
  Api_Listing_addAttachment = '/api/listings/addAttachment',
  Api_Listing_Profile = '/api/Listings/GetProfile/',
  Api_Listing_ToggleIsCash = '/api/listings/ToggleCashPayment/',

  // ************** ListingPackage ******************

  Api_listingPackages_GetAll = '/api/listingPackages/getAll',
  Api_listingPackages_ListOf = '/api/listingPackages/listOf',
  Api_listingPackages_Delete = '/api/listingPackages/delete/',
  Api_listingPackages_ToggleIsActive = '/api/listingPackages/toggelActive/',
  Api_listingPackages_Upsert = '/api/listingPackages/upsert',
  Api_listingPackages_Profile = '/api/listingPackages/GetProfile/',
  Api_listingPackages_Delete_Attachment = '/api/listingPackages/deleteAttachment/',
  Api_listingPackages_addAttachment = '/api/listingPackages/addAttachment',

  // ************** listingCategoriesDetails ******************

  Api_listingCategoryDetails_GetAll = '/api/listingCategoryDetails/getAll',
  Api_listingCategoryDetails_ListOf = '/api/listingCategoryDetails/listOf',
  Api_listingCategoryDetails_ListOf_withListingTypeId = '/api/listingCategoryDetails/listOf?listingCategoryId=',
  Api_listingCategoryDetails_Delete = '/api/listingCategoryDetails/delete/',
  Api_listingCategoryDetails_ToggleIsActive = '/api/listingCategoryDetails/toggelActive/',
  Api_listingCategoryDetails_Upsert = '/api/listingCategoryDetails/upsert',
  Api_listingCategoryDetails_Profile = '/api/listingCategoryDetails/GetProfile/',

  // ************** emailTypes ******************

  Api_emailTypes_GetAll = '/api/emailTypes/getAll',
  Api_emailTypes_ListOf = '/api/emailTypes/listOf',
  Api_emailTypes_Delete = '/api/emailTypes/delete/',
  Api_emailTypes_ToggleIsActive = '/api/emailTypes/toggelActive/',
  Api_emailTypes_Upsert = '/api/emailTypes/upsert',

  // ************** emailMessageKeywords ******************

  Api_emailMessageKeywords_GetAll = '/api/emailMessageKeywords/getAll',
  Api_emailMessageKeywords_ListOf = '/api/emailMessageKeywords/listOf',
  Api_emailMessageKeywords_Delete = '/api/emailMessageKeywords/delete/',
  Api_emailMessageKeywords_ToggleIsActive = '/api/emailMessageKeywords/toggelActive/',
  Api_emailMessageKeywords_Upsert = '/api/emailMessageKeywords/upsert',

  // ************** emailTemplates ******************

  Api_emailTemplates_GetAll = '/api/emailTemplates/getAll',
  Api_emailTemplates_ListOf = '/api/emailTemplates/listOf',
  Api_emailTemplates_Delete = '/api/emailTemplates/delete/',
  Api_emailTemplates_ToggleIsActive = '/api/emailTemplates/toggelActive/',
  Api_emailTemplates_Upsert = '/api/emailTemplates/upsert',

  // ************** nationalities ******************

  Api_nationalities_GetAll = '/api/nationalities/getAll',
  Api_nationalities_ListOf = '/api/nationalities/listOf',
  Api_nationalities_Delete = '/api/nationalities/delete/',
  Api_nationalities_ToggleIsActive = '/api/nationalities/toggelActive/',
  Api_nationalities_Upsert = '/api/nationalities/upsert',
  Api_nationalities_Profile = '/api/nationalities/getProfile/',

  // ************** currencies ******************

  Api_currencies_GetAll = '/api/currencies/getAll',
  Api_currencies_ListOf = '/api/currencies/listOf',
  Api_currencies_Delete = '/api/currencies/delete/',
  Api_currencies_ToggleIsActive = '/api/currencies/toggelActive/',
  Api_currencies_Upsert = '/api/currencies/upsert',
  Api_currencies_Profile = '/api/currencies/getProfile/',

  // ************** configuration payment ******************

  Api_PaymentConfigurations_GetAll = '/api/PaymentConfigurations/getAll',
  Api_PaymentConfigurations_ListOf = '/api/PaymentConfigurations/listOf',
  Api_PaymentConfigurations_Delete = '/api/PaymentConfigurations/delete/',
  Api_PaymentConfigurations_ToggleIsActive = '/api/PaymentConfigurations/toggelActive/',
  Api_PaymentConfigurations_Upsert = '/api/PaymentConfigurations/upsert',
  Api_PaymentConfigurations_Profile = '/api/PaymentConfigurations/getProfile/',

  // ************** customers ******************

  Api_customers_GetAll = '/api/customers/getAll',
  Api_customers_ListOf = '/api/customers/listOf',
  Api_customers_Delete = '/api/customers/delete/',
  Api_customers_ToggleIsActive = '/api/customers/toggelActive/',
  Api_customers_Upsert = '/api/customers/upsert',

  // ************** transactions ******************

  Api_transactions_GetAll = '/api/transactions/getAll',
  Api_transactions_Refund = '/api/transactions/Refund',
  Api_transactions_Add = '/api/transactions/Add',

  // ************** site Configuration ******************

  Api_siteConfigurations_Get = '/api/siteConfigurations/getSiteConfigurationDetails',
  Api_siteConfigurations_Update = '/api/siteConfigurations/update',
  Api_siteConfigurations_Delete_Item = '/api/SliderItem/delete',
  Api_siteConfigurations_Edit_Item = '/api/SliderItem/upsert',

  // ************** External Listings ******************
  Api_External_GetAll = '/api/external/getAll',
  Api_External_Sync = '/api/external/sync/',
  Api_External_Publish = '/api/external/publish',

  // ************** shared ******************
  Api_Language_ListOf = '/api/Language/listOf',
  Api_Language_GetAll = '/api/Language/getAll',
  Api_Language_Upsert = '/api/Language/upsert',
  Api_Language_Delete = '/api/Language/delete/',
  Api_Language_ToggleIsActive = '/api/Language/toggelActive/',
  Api_Language_Profile = '/api/Language/getProfile/',
}
