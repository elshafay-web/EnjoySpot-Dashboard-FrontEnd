export enum HttpPaths {
  // ************** Auth ******************

  Api_Login = '/api/auth/token',
  Api_Logout = '/api/v1/Authentication/Logout/',

  // ************** Notification ******************

  Api_Notification_GETALL = '/api/v1/NotiMessage/GetUserMessages?User_Id=',
  Api_Notification_MarkAll_As_Read = '/api/v1/NotiMessage/ReadAllUserNotifications',

  // ************** City ******************

  Api_City_GetAll = '/api/cities/getAll',
  Api_City_ListOf = '/api/cities/listOf?countryId=',
  Api_City_Delete = '/api/cities/delete/',
  Api_City_ToggleIsActive = '/api/cities/toggelActive/',
  Api_City_Upsert = '/api/cities/upsert',

  // ************** Country ******************

  Api_Country_GetAll = '/api/countries/getAll',
  Api_Country_ListOf = '/api/countries/listOf',
  Api_Country_Delete = '/api/countries/delete/',
  Api_Country_ToggleIsActive = '/api/countries/toggelActive/',
  Api_Country_Upsert = '/api/countries/upsert',

  // ************** listingType ******************

  Api_listingType_GetAll = '/api/listingTypes/getAll',
  Api_listingType_ListOf = '/api/listingTypes/listOf',
  Api_listingType_Delete = '/api/listingTypes/delete/',
  Api_listingType_ToggleIsActive = '/api/listingTypes/toggelActive/',
  Api_listingType_Upsert = '/api/listingTypes/upsert',

  // ************** listingCategories ******************

  Api_listingCategories_GetAll = '/api/listingCategories/getAll',
  Api_listingCategories_ListOf = '/api/listingCategories/listOf',
  Api_listingCategories_ListOf_WithListTypeId  = '/api/listingCategories/listOf?listingTypeId=',
  Api_listingCategories_Delete = '/api/listingCategories/delete/',
  Api_listingCategories_ToggleIsActive = '/api/listingCategories/toggelActive/',
  Api_listingCategories_Upsert = '/api/listingCategories/upsert',

  // ************** listingAmenities ******************

  Api_listingAmenities_GetAll = '/api/listingAmenities/getAll',
  Api_listingAmenities_ListOf = '/api/listingAmenities/listOf',
  Api_listingAmenities_Delete = '/api/listingAmenities/delete/',
  Api_listingAmenities_ToggleIsActive = '/api/listingAmenities/toggelActive/',
  Api_listingAmenities_Upsert = '/api/listingAmenities/upsert',

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
  Api_listingCategoryDetails_Delete = '/api/listingCategoryDetails/delete/',
  Api_listingCategoryDetails_ToggleIsActive = '/api/listingCategoryDetails/toggelActive/',
  Api_listingCategoryDetails_Upsert = '/api/listingCategoryDetails/upsert',

  // ************** emailTypes ******************

  Api_emailTypes_GetAll = '/api/emailTypes/getAll',
  Api_emailTypes_ListOf = '/api/emailTypes/listOf',
  Api_emailTypes_Delete = '/api/emailTypes/delete/',
  Api_emailTypes_ToggleIsActive = '/api/emailTypes/toggelActive/',
  Api_emailTypes_Upsert = '/api/emailTypes/upsert',

  // ************** emailTemplates ******************

  Api_emailTemplates_GetAll = '/api/emailTemplates/getAll',
  Api_emailTemplates_ListOf = '/api/emailTemplates/listOf',
  Api_emailTemplates_Delete = '/api/emailTemplates/delete/',
  Api_emailTemplates_ToggleIsActive = '/api/emailTemplates/toggelActive/',
  Api_emailTemplates_Upsert = '/api/emailTemplates/upsert',
}
