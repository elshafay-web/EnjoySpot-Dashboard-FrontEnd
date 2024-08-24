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

  // ************** Supplier ******************

  Api_Supplier_GetAll = '/api/suppliers/getAll',
  Api_Supplier_ListOf = '/api/suppliers/listOf=',
  Api_Supplier_Delete = '/api/suppliers/delete/',
  Api_Supplier_ToggleIsActive = '/api/suppliers/toggelActive/',
  Api_Supplier_Upsert = '/api/suppliers/upsert',
  Api_Supplier_Profile = '/api/suppliers/getProfile?id=',
}
