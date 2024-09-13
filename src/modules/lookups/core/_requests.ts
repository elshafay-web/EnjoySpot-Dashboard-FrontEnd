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
  return axios.post(`${Api_Add_Url}`, model);
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
