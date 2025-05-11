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
  const formData = new FormData();

  // Append all model properties to FormData
  Object.entries(model).forEach(([key, value]) => {
    if (key === 'translationProperties') {
      formData.append(key, JSON.stringify(value));
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
