export enum HttpPaths {
  // ************** Auth ******************
  Api_Login = '/api/v1/Authentication/Login',
  Api_Logout = '/api/v1/Authentication/Logout/',

  // ************** Auth ******************
  Api_Notification_GETALL = '/api/v1/NotiMessage/GetUserMessages?User_Id=',
  Api_Notification_MarkAll_As_Read = '/api/v1/NotiMessage/ReadAllUserNotifications',

  // ************** AttendanceLogs ******************
  Api_AttendanceLogs_GetAll = '/api/v1/AttendanceLogs/ListAttendAttendanceLogs',
  Api_AttendanceMethods_ListOf = '/api/v1/AttendanceMethods/GetSelectListOfAttendanceMethod',
  Api_AttendanceLogs_SudenAttendanceLog_GetAll = '/api/v1/AttendanceLogs/GetSudenAttendanceLog',
  Api_AttendanceLogs_SudenAttendanceLog_Add = '/api/v1/AttendanceLogs/AddSuddenAttendance',

  // ************** LeavesRequest ******************
  Api_LeavesRequest_GetAll = '/api/v1/LeavesRequest/GetAllLeavesRequests',
  Api_LeavesRequest_Upsert = '/api/v1/LeavesRequest/UpsertLeavesRequest',
  Api_LeavesRequest_AddLeavesRequestAttachments = '/api/v1/LeavesRequest/AddLeavesRequestAttachments?RequestId=',
  Api_LeavesRequest_Delete = '/api/v1/LeavesRequest/DeleteLeavesRequest/',
  Api_LeavesRequest_AcceptOrRefuseLeavesRequest = '/api/v1/LeavesRequest/AcceptOrRefuseLeavesRequest/',

  // ************** LeavesTypes ******************
  Api_LeavesTypes_GetAll = '/api/v1/LeavesTypes/GetAllLeavesTypes',
  Api_LeavesTypes_ListOf = '/api/v1/LeavesTypes/ListOfLeavesTypes',
  Api_LeavesTypes_Delete = '/api/v1/LeavesTypes/DeleteLeaveType/',
  Api_LeavesTypes_ToggleIsActive = '/api/v1/LeavesTypes/ToggleLeaveTypeActivation/',
  Api_LeavesTypes_Upsert = '/api/v1/LeavesTypes/UpsertLeaveType',

  // ************** Period ******************
  Api_Period_GetAll = '/api/v1/Period/ListPeriods',
  Api_Period_ListOf = '/api/v1/Period/ListOfPeriods',
  Api_Period_Delete = '/api/v1/Period/DeletePeriod/',
  Api_Period_ToggleIsActive = '/api/v1/Period/ToggleIsActivePeriod/',
  Api_Period_Upsert = '/api/v1/Period/UpsertPeriod',

  // ************** LeavesPolicyPeriods ******************
  Api_LeavesPolicyPeriods_GetAll = '/api/v1/LeavesPolicyPeriods/ListLeavesPolicyPeriods',
  Api_LeavesPolicyPeriods_GetAllLeaveBalances_GetAll = '/api/v1/LeavesPolicyPeriods/GetAllLeaveBalances',
  Api_LeavesPolicyPeriods_Add = '/api/v1/LeavesPolicyPeriods/AddLeavesPolicyPeriod',

  // ************** RegistrationRequest ******************
  Api_RegistrationRequest_GetAll = '/api/v1/RegistrationRequest/GetAllRegistrationRequests',
  GetAllRegistrationRequestsAttachments = '/api/v1/RegistrationRequest/GetAllRegistrationRequestsAttachments/',
  Api_RegistrationRequest_Add = '/api/v1/RegistrationRequest/AddRegistrationRequest',
  Api_RegistrationRequest_AcceptORefuseRegistrationRequestAttachment = '/api/v1/RegistrationRequest/AcceptORefuseRegistrationRequestAttachment',
  Api_RegistrationRequest_AcceptOrRefuseRegistrationRequest = '/api/v1/RegistrationRequest/AcceptOrRefuseRegistrationRequest',

  // ************** SharCompanies ******************
  Api_SharCompanies_ListOf = '/api/v1/SharCompanies/ListOfCompanies',

  // ************** Departments ******************
  Api_Departments_GetAll = '/api/v1/Departments/ListDepartments',
  Api_Departments_ListOf = '/api/v1/Departments/ListOfDepartments',
  Api_Departments_Profile = '/api/v1/Departments/GetDepartmentProfile?DepartmentId=',
  Api_Departments_Add = '/api/v1/Departments/AddDepartment',
  Api_Departments_Update = '/api/v1/Departments/UpdateDepartment',
  Api_Departments_Delete = '/api/v1/Departments/DeleteDepartment/',

  // ************** Employees ******************
  Api_Employees_GetAll = '/api/v1/Employees/ListEmployees',
  Api_Employees_ListOf = '/api/v1/Employees/ListOfEmployees',
  Api_Employees_ChangeHrEmployeeImage = '/api/v1/Employees/ChangeHrEmployeeImage',
  Api_Employees_Upsert = '/api/v1/Employees/UpsertEmployee',
  Api_Employees_Delete = '/api/v1/Employees/DeleteEmployee/',
  Api_Employees_Toggle = '/api/v1/Employees/ToggleIsActiveEmployee/',
  Api_Employees_Profile = '/api/v1/Employees/GetEmployeeProfile?EmployeeId=',

  // ************** Jobs ******************
  Api_Jobs_GetAll = '/api/v1/Jobs/ListJobs',
  Api_Jobs_ListOf = '/api/v1/Jobs/ListOfJobs',
  Api_Jobs_Profile = '/api/v1/Jobs/GetJobProfile?JobId=',
  Api_Jobs_add = '/api/v1/Jobs/AddJob',
  Api_Jobs_Update = '/api/v1/Jobs/UpdateJob',
  Api_Jobs_Delete = '/api/v1/Jobs/DeleteJob/',

  // ************** JobSections ******************
  Api_JobSections_ListOf = '/api/v1/JobSections/ListOfJobSections',
  Api_JobSections_ManageJobsPerSection = '/api/v1/JobSections/ManageJobsPerSection',
  Api_JobSections_ListOfJobsBySection = '/api/v1/JobSections/ListOfJobsBySection/',

  // ************** Sections ******************
  Api_Sections_GetAll = '/api/v1/Sections/ListSections',
  Api_Sections_ListOf = '/api/v1/Sections/ListOfSections',
  Api_Sections_Profile = '/api/v1/Sections/GetSectionProfile?SectionId=',
  Api_Sections_Profile_ByDepartmentId = '/api/v1/Sections/ListOfSections?DepartmentId=',
  Api_Sections_add = '/api/v1/Sections/UpsertSection',
  Api_Sections_Update = '/api/v1/Sections/UpdateSection',
  Api_Sections_Delete = '/api/v1/Sections/DeleteSection/',

  // ************** MaritalStatus ******************
  Api_MaritalStatus_GetAll = '/api/v1/MaritalStatus/GetAllMaritalStatus',
  Api_MaritalStatus_ListOf = '/api/v1/MaritalStatus/ListOfMaritalStatus',
  Api_MaritalStatus_Add = '/api/v1/MaritalStatus/UpsertMaritalStatus',
  Api_MaritalStatus_ToggleIsActive = '/api/v1/MaritalStatus/ToggleMaritalStatusActivation/',
  Api_MaritalStatus_Delete = '/api/v1/MaritalStatus/DeleteMaritalStatus/',

  // ************** Month ******************
  Api_Month_GetAll = '/api/v1/Month/ListMonths',
  Api_Month_ListOf = '/api/v1/Month/ListOfMonths',
  Api_Month_Add = '/api/v1/Month/UpsertMonth',
  Api_Month_ToggleIsActive = '/api/v1/Month/ToggleIsActiveMonth/',
  Api_Month_Delete = '/api/v1/Month/DeleteMonth/',

  // ************** Gender ******************
  Api_Gender_GetAll = '/api/v1/SharGender/ListGender',
  Api_Gender_ListOf = '/api/v1/SharGender/ListOfGender',
  Api_Gender_Add = '/api/v1/SharGender/UpsertGender',
  Api_Gender_ToggleIsActive = '/api/v1/SharGender/ToggleIsActiveGender/',
  Api_Gender_Delete = '/api/v1/SharGender/DeleteGender/',

  // ************** Nationality ******************
  Api_Nationality_GetAll = '/api/v1/Nationality/GetAllNationality',
  Api_Nationality_ListOf = '/api/v1/Nationality/ListOfNationality',
  Api_Nationality_Add = '/api/v1/Nationality/UpsertNationality',
  Api_Nationality_ToggleIsActive = '/api/v1/Nationality/ToggleNationalityActivation/',
  Api_Nationality_Delete = '/api/v1/Nationality/DeleteNationality/',

  // ************** Religion ******************
  Api_Religion_GetAll = '/api/v1/Religion/GetAllReligion',
  Api_Religion_ListOf = '/api/v1/Religion/ListOfReligion',
  Api_Religion_Add = '/api/v1/Religion/UpsertReligion',
  Api_Religion_ToggleIsActive = '/api/v1/Religion/ToggleReligionActivation/',
  Api_Religion_Delete = '/api/v1/SharReligion/DeleteReligion/',

  // ************** Locations ******************
  Api_Locations_GetAll = '/api/v1/Locations/ListLocations/',
  Api_Locations_ListOf = '/api/v1/Locations/ListOfLocations',
  Api_Locations_Add = '/api/v1/Locations/AddLocation',
  Api_Locations_Upsert = '/api/v1/Locations/UpsertEmployeeLocation',
  Api_Locations_ToggleIsActive = '/api/v1/Locations/ToggleIsActiveLocation/',
  Api_Locations_Delete = '/api/v1/Locations/DeleteLocation/',
  Api_Locations_GetLocationProfile = '/api/v1/Locations/GetLocationProfile/',

  // ************** LocationGroup ******************
  Api_LocationGroup_GetAll = '/api/v1/LocationGroup/GetAllLocationGroups',
  Api_LocationGroup_ListOf = '/api/v1/LocationGroup/ListOfLocationGroups',
  Api_LocationGroup_Upsert = '/api/v1/LocationGroup/UpsertLocationGroup',
  Api_LocationGroup_ToggleIsActive = '/api/v1/LocationGroup/ToggleLocationGroupActivation/',
  Api_LocationGroup_Delete = '/api/v1/LocationGroup/DeleteLocationGroup/',

  // ************** Branchs ******************
  Api_Branchs_GetAll = '/api/v1/Branchs/ListBranchs',
  Api_Branchs_ListOf = '/api/v1/Branchs/ListOfSharBranchs',
  Api_Branchs_Add = '/api/v1/Branchs/UpsertSharBranch',
  Api_Branchs_ToggleIsActive = '/api/v1/Branchs/ToggleIsActiveSharBranch/',
  Api_Branchs_Delete = '/api/v1/Branchs/DeleteSharBranch/',

  // ************** ContractType ******************
  Api_ContractType_GetAll = '/api/v1/ContractType/ListContractTypes',
  Api_ContractType_ListOf = '/api/v1/ContractType/ListOfContractTypes',
  Api_ContractType_Add = '/api/v1/ContractType/UpsertContractType',
  Api_ContractType_ToggleIsActive = '/api/v1/ContractType/ToggleIsActiveContractType/',
  Api_ContractType_Delete = '/api/v1/ContractType/DeleteContractType/',

  // ************** Countries ******************
  Api_Countries_GetAll = '/api/v1/Countries/ListCountries',
  Api_Countries_ListOf = '/api/v1/Countries/ListOfcountries',
  Api_Countries_Add = '/api/v1/Countries/AddCountry',
  Api_Countries_ToggleIsActive = '/api/v1/Countries/ToggleIsActiveCountry/',
  Api_Countries_Delete = '/api/v1/Countries/DeleteCountry/',

  // ************** States ******************
  Api_States_GetAll = '/api/v1/SharStates/ListStates',
  Api_States_ListOf_By_CountryId = '/api/v1/SharStates/ListOfStates/',
  Api_States_Add = '/api/v1/SharStates/UpsertStates',
  Api_States_ToggleIsActive = '/api/v1/SharStates/ToggleIsActiveState/',
  Api_States_Delete = '/api/v1/SharStates/DeleteState/',

  // ************** SharCities ******************
  Api_Cities_GetAll = '/api/v1/SharCities/ListCity',
  Api_Cities_ListOf_By_StateId = '/api/v1/SharCities/ListOfCity/',
  Api_Cities_Add = '/api/v1/SharCities/UpsertCity',
  Api_Cities_ToggleIsActive = '/api/v1/SharCities/ToggleIsActiveCity/',
  Api_Cities_Delete = '/api/v1/SharCities/DeleteCity/',

  // ************** SharAreas ******************
  Api_Areas_GetAll = '/api/v1/SharAreas/ListArea',
  Api_Areas_ListOf_By_CityId = '/api/v1/SharAreas/ListOfArea/',
  Api_Areas_Add = '/api/v1/SharAreas/UpsertArea',
  Api_Areas_ToggleIsActive = '/api/v1/SharAreas/ToggleIsActiveArea/',
  Api_Areas_Delete = '/api/v1/SharAreas/DeleteArea/',

  // ************** Reports ******************
  Api_Reports_GetTotalEmployeesAttendanceLogs_Data = '/api/v1/AttendanceLogs/GetTotalEmployeesAttendanceLogsReport',
  Api_Reports_GetTotalEmployeesAttendanceLogs_File = '/api/v1/AttendanceLogs/GetTotalEmployeesAttendanceLogsReportExcel',
  Api_Reports_GetAttendanceLogReport_Data = '/api/v1/AttendanceLogs/GetAttendanceLogReport',
  Api_Reports_GetAttendanceLogReport_File = '/api/v1/AttendanceLogs/GetAttendanceLogExcelReport',
  Api_Reports_GetDailyEmployeeMovementsReport_Data = '/api/v1/AttendanceLogs/GetDailyEmployeeMovementsReport',
  Api_Reports_GetDailyEmployeeMovementsReport_File = '/api/v1/AttendanceLogs/GetDailyEmployeeMovementsReportExcel',

  //* **************** Employee Attendance Log **********************
  Api_EmployeeAttendanceFilter = 'api/v1/AttendanceLogs/GetAttendanceLogForAllEmployeesReport',
  Api_EmployeeAttendanceExcel = '/api/v1/AttendanceLogs/GetAttendanceLogForAllEmployeesReportExcel',
  Api_Locations_Update = 'Api_Locations_Update',
  Api_Locations_GetById = 'Api_Locations_GetById',
}
