export enum HttpPaths {
  // ************** Auth ******************
  Api_Login = '/api/v1/Authentication/Login',
  Api_Logout = '/api/v1/Authentication/Logout/',

  // ************** Auth ******************
  Api_Notification_GETALL = '/api/v1/NotiMessage/GetUserMessages?User_Id=',
  Api_Notification_MarkAll_As_Read = '/api/v1/NotiMessage/ReadAllUserNotifications',

    // ************** LeavesTypes ******************
    Api_LeavesTypes_GetAll = '/api/v1/LeavesTypes/GetAllLeavesTypes',
    Api_LeavesTypes_ListOf = '/api/v1/LeavesTypes/ListOfLeavesTypes',
    Api_LeavesTypes_Delete = '/api/v1/LeavesTypes/DeleteLeaveType/',
    Api_LeavesTypes_ToggleIsActive = '/api/v1/LeavesTypes/ToggleLeaveTypeActivation/',
    Api_LeavesTypes_Upsert = '/api/v1/LeavesTypes/UpsertLeaveType',
}
