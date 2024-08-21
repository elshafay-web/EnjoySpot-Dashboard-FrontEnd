export enum HttpPaths {
  // ************** Auth ******************
  Api_Login = '/api/v1/Authentication/Login',
  Api_Logout = '/api/v1/Authentication/Logout/',

  // ************** Auth ******************
  Api_Notification_GETALL = '/api/v1/NotiMessage/GetUserMessages?User_Id=',
  Api_Notification_MarkAll_As_Read = '/api/v1/NotiMessage/ReadAllUserNotifications',
}
