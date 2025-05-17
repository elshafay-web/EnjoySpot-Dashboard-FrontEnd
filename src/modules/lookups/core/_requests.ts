/* eslint-disable no-else-return */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
// import { IPostLookup } from './_models';

// export function getLookups(Api_Get_Url: string, model: any) {
//   return CommonGetRequestsWithQuery(`${Api_Get_Url}`, model);
// }

// export function listOfLookups(Api_Get_Url: string) {
//   return CommonGetRequestsWithQuery(`${Api_Get_Url}`, {});
// }

// export function addLookup(model: IPostLookup, Api_Add_Url: string) {
//   const formData = new FormData();

//   // Append all model properties to FormData
//   Object.entries(model).forEach(([key, value]) => {
//     if (key === 'translationProperties' && Array.isArray(value)) {
//       // Flatten translationProperties array
//       value.forEach((translation: any, index: number) => {
//         formData.append(
//           `TranslationProperties[${index}].languageCode`,
//           translation.languageCode || '',
//         );
//         formData.append(
//           `TranslationProperties[${index}].name`,
//           translation.name || '',
//         );
//       });
//     } else if (key === 'iconFile' && value) {
//       formData.append(key, value);
//     } else if (value !== undefined) {
//       formData.append(key, value.toString());
//     }
//   });

//   return axios.post(`${Api_Add_Url}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }
// // export function addLookup(model: IPostLookup, Api_Add_Url: string) {
// //   // Check if the request contains any files
// //   const hasFiles = model.iconFile !== undefined && model.iconFile !== null;

// //   if (hasFiles) {
// //     // Use FormData for requests with files
// //     const formData = new FormData();
// //     Object.entries(model).forEach(([key, value]) => {
// //       if (key === 'translationProperties' && Array.isArray(value)) {
// //         formData.append(key, JSON.stringify(value));
// //       } else if (value !== undefined && value !== null) {
// //         formData.append(key, value instanceof Blob ? value : value.toString());
// //       }
// //     });

// //     return axios.post(Api_Add_Url, formData, {
// //       headers: {
// //         'Content-Type': 'multipart/form-data',
// //       },
// //     });
// //   // eslint-disable-next-line no-else-return
// //   } else {
// //       return axios.post(Api_Add_Url, model, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //   }
// // }
// export function updateLookup(model: IPostLookup, Api_Update_Url: string) {
//   return axios.put(`${Api_Update_Url}`, model);
// }

// export function toggleLookup(id: number, Api_Toggle_Url: string) {
//   return axios.put(`${Api_Toggle_Url}${id}`, {});
// }

// export function deleteLookup(id: number, Api_Delete_Url: string) {
//   return axios.delete(`${Api_Delete_Url}${id}`);
// }

// export function getProfile(Api_Profile_Url: string, id: number) {
//   return CommonGetRequestsWithQuery(`${Api_Profile_Url + id}`, {});
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { IPostLookup } from './_models';

export function getLookups(Api_Get_Url: string, model: any) {
  return CommonGetRequestsWithQuery(`${Api_Get_Url}`, model);
}

export function listOfLookups(Api_Get_Url: string) {
  return CommonGetRequestsWithQuery(`${Api_Get_Url}`, {});
}

export function addLookup(model: IPostLookup, Api_Add_Url: string) {
  // Check if there's a file in the model
  const hasFile = model.iconFile && model.iconFile instanceof File;

  if (hasFile) {
    // Use FormData for requests with a file
    const formData = new FormData();

    Object.entries(model).forEach(([key, value]) => {
      if (key === 'translationProperties' && Array.isArray(value)) {
        value.forEach((translation: any, index: number) => {
          formData.append(
            `TranslationProperties[${index}].languageCode`,
            translation.languageCode || '',
          );
          formData.append(
            `TranslationProperties[${index}].name`,
            translation.name || '',
          );
        });
      } else if (key === 'iconFile' && value) {
        formData.append(key, value);
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    return axios.post(`${Api_Add_Url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    const jsonPayload = {
      ...model,
      iconFile: undefined, // Remove iconFile from the payload since there's no file
    };

    return axios.post(`${Api_Add_Url}`, jsonPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export function updateLookup(model: IPostLookup, Api_Update_Url: string) {
  return axios.put(`${Api_Update_Url}`, model);
}

export function toggleLookup(id: number, Api_Toggle_Url: string) {
  return axios.put(`${Api_Toggle_Url}${id}`, {});
}

export function deleteLookup(id: number, Api_Delete_Url: string) {
  return axios.delete(`${Api_Delete_Url}${id}`);
}

export function getProfile(Api_Profile_Url: string, id: number) {
  return CommonGetRequestsWithQuery(`${Api_Profile_Url + id}`, {});
}
