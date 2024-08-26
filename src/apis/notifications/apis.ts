/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { HttpPaths } from '@/Enums/httpPaths'
import { IResponse } from '@domains/IResponse'
import { INotification } from '@domains/INotification'

export const getALLUserNotification = async (
  id: number
): Promise<INotification[]> => {
  // const response = await axios.get(HttpPaths.Api_Notification_GETALL + id)
  //   return response.data?.data.messagesRecords;
  console.log(id);
  
  return [
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-13T01:14:46.5140473',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-13T01:13:14.0947551',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-13T01:10:30.070014',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-12T05:39:45.5732484',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-12T05:39:19.7617286',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-12T05:38:17.8937335',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-12T05:37:57.7793812',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-12T05:37:40.0496905',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T22:36:26.3612892',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T22:35:50.8715302',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T22:34:36.2052553',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T21:13:46.9210018',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T21:13:29.697016',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T21:12:37.1472485',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T21:12:01.5512578',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_Admin',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T20:23:04.4025115',
      image: '',
      refId: '1820000',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 2,
      title: 'Ali Mohamed',
      message: 'Your leave request (annual) has been approved',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T20:22:23.1414057',
      image: '',
      refId: '182',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'Ali Mohamed',
      message: 'Your leave request (annual) has been approved',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T20:21:43.7806854',
      image: '',
      refId: '182',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'Ali Mohamed',
      message: 'Your leave request (annual) has been approved',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-11T20:17:50.1983776',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'omar',
      message: 'this is test of notifications message',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T04:37:09.6062488',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T03:27:16.6579676',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T03:22:49.2969063',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T02:53:19.4527726',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T02:49:08.861465',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T02:42:31.7869607',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T01:19:12.3871737',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-08T01:18:23.5579763',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:43:09.4871416',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:36:04.9530533',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:31:22.5981186',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:26:44.4951848',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:19:18.2449201',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:14:52.8267712',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'string',
      message: 'string',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:11:30.6536907',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'TestTitle',
      message: 'Body',
      userId: 2,
    },
    {
      sender: 'C0001_System',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T23:10:35.3684117',
      image: '',
      refId: '',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 1,
      title: 'TestTitle',
      message: 'Body',
      userId: 2,
    },
    {
      sender: 'C0001_User1',
      reciever: 'C0001_Admin',
      messageDate: '2024-08-07T21:17:17.5106803',
      image: '',
      refId: 'string',
      messageTypeSysName: 'string',
      readOnly: true,
      isRead: true,
      userSender_Id: 3,
      title: 'string',
      message: 'string',
      userId: 2,
    },
  ]
}

export const useGetAllNotification = (id: number) =>
  useQuery<INotification[]>({
    queryKey: ['getAllNotifications', id],
    queryFn: () => getALLUserNotification(id),
  })

export const markAllNotificationAsRead = async (
  req: any
): Promise<IResponse<string>> => {
  const response = await axios.post(
    `${HttpPaths.Api_Notification_MarkAll_As_Read}`,
    req
  )
  return response.data
}
