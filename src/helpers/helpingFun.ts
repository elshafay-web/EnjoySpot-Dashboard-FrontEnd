/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const CommonGetRequestsWithQuery = (
  url: string,
  Model: any,
  options?: any,
) => {
  const queryString = Object.keys(Model)
    .map((key: string) =>
      ((Model[key] != null && Model[key] !== '' && Model[key] !== undefined) ||
      Model[key] === false
        ? `${key}=${Model[key]}`
        : null),
    )
    .filter((x) => x != null)
    .join('&');
  return axios.get(`${url}${queryString ? `?${queryString}` : ''}`, options);
};

export const CommonPutRequestsWithQuery = (
  url: string,
  Model: any,
  modelData: any,
) => {
  const queryString = Object.keys(Model)
    .map((key: string) =>
      (Model[key] != null && Model[key] !== '' && Model[key] !== undefined
        ? `${key}=${Model[key]}`
        : null),
    )
    .filter((x) => x != null)
    .join('&');
  return axios.put(`${url}${queryString ? `?${queryString}` : ''}`, modelData);
};
export const CommonPostRequestsWithQuery = (
  url: string,
  Model: any,
  modelData: any,
) => {
  const queryString = Object.keys(Model)
    .map((key: string) =>
      (Model[key] != null && Model[key] !== '' && Model[key] !== undefined
        ? `${key}=${Model[key]}`
        : null),
    )
    .filter((x) => x != null)
    .join('&');
  return axios.post(`${url}${queryString ? `?${queryString}` : ''}`, modelData);
};

export const createDownloadLink = (response: any, fileName: string = '') => {
  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });
  const downloadUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = downloadUrl;
  downloadLink.download = fileName ? `${fileName}.xlsx` : 'download.xlsx';

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  // Revoke the object URL to free up memory
  URL.revokeObjectURL(downloadUrl);
};

export const someFieldsContainData = (obj: any) =>
  Object.values(obj).some((value) => value !== '' && value !== undefined);

export const generateRandomColor = (
  index: number,
  lightness: number,
): string => {
  const hue = (index * 137.508) % 360;
  const saturation = 70;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;
  const period = hours < 12 ? 'AM' : 'PM';

  // Pad minutes with leading zero if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `Sent at ${formattedHours}:${formattedMinutes} ${period}`;
};

export const flattenTree = (nodes: any[], result: any[] = []) => {
  nodes.forEach((node: any) => {
    result.push(node);
    if (node.children && node.children.length > 0) {
      flattenTree(node.children, result);
    }
  });
  return result;
};

export const convertDateFormat = (inputDate: any) => {
  const dateObject = new Date(inputDate);

  const year = dateObject.getFullYear();
  const month = `0${dateObject.getMonth() + 1}`.slice(-2);
  const day = `0${dateObject.getDate()}`.slice(-2);

  const convertedDate = `${year}-${month}-${day}`;

  return convertedDate;
};

export function formatDate(inputDate: any): any {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateWithTime(inputDate: any): any {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function generateUniqueNumber(index: number) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const millisecond = currentDate.getMilliseconds();

  const uniqueNumber = `${year}${month}${day}${hour}${minute}${second}${millisecond}${index}`;
  return uniqueNumber;
}

export function diffTime(start: Date, end: Date): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHours >= 1) {
    return `${diffHours} H and ${diffMinutes} M`;
  }
  if (diffHours < 1 && diffMinutes >= 1) {
    return `${diffMinutes} M`;
  }
  return '0 M';
}
export function convertFileToBase64(selectedFile: any): any {
  const reader = new FileReader();
  reader.onload = (e: any) => e.target.result;
  reader.readAsDataURL(selectedFile);
}

export function timeAgo(date: any) {
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return ` ${interval} ${unit.name}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function formatinitialTakeTime(timestamp: string) {
  const date = new Date(timestamp);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(seconds).padStart(2, '0')}`;
}

const imageExtensions: string[] = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'webp',
  'svg',
];

export function isImagePath(path: string): boolean {
  if (!path) {
    return false;
  }
  const parts = path.split('.');
  if (parts.length < 2) {
    return false;
  }
  const extension = parts.pop()?.toLowerCase() || '';
  return imageExtensions.includes(extension);
}

const videoExtensions: string[] = [
  'mp4',
  'avi',
  'mov',
  'wmv',
  'flv',
  'mkv',
  'webm',
];

export function isVedioPath(path: string): boolean {
  if (!path) {
    return false;
  }
  const parts = path.split('.');
  if (parts.length < 2) {
    return false;
  }
  const extension = parts.pop()?.toLowerCase() || '';
  return videoExtensions.includes(extension);
}

const documentExtensions: string[] = ['pdf', 'docx'];

export function isDocumentPath(path: string): boolean {
  if (!path) {
    return false;
  }
  const parts = path.split('.');
  if (parts.length < 2) {
    return false;
  }
  const extension = parts.pop()?.toLowerCase() || '';
  return documentExtensions.includes(extension);
}

export function getCurrentLocation(): Promise<{
  lat: number;
  lng: number;
}> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

export function dmsToDecimal(degrees: any, minutes: any, seconds: any) {
  return degrees + minutes / 60 + seconds / 3600;
}

export function convertCoordinates(dmsLat: any, dmsLon: any) {
  const latParts = dmsLat.match(/(\d+)°(\d+)'(\d+.\d+)"([NS])/);
  const latDeg = parseInt(latParts[1], 10);
  const latMin = parseInt(latParts[2], 10);
  const latSec = parseFloat(latParts[3]);
  const latDirection = latParts[4];
  const lonParts = dmsLon.match(/(\d+)°(\d+)'(\d+.\d+)"([EW])/);
  const lonDeg = parseInt(lonParts[1], 10);
  const lonMin = parseInt(lonParts[2], 10);
  const lonSec = parseFloat(lonParts[3]);
  const lonDirection = lonParts[4];
  let latDecimal = dmsToDecimal(latDeg, latMin, latSec);
  let lonDecimal = dmsToDecimal(lonDeg, lonMin, lonSec);
  if (latDirection === 'S') {
    latDecimal = -latDecimal;
  }
  if (lonDirection === 'W') {
    lonDecimal = -lonDecimal;
  }

  return {
    lat: latDecimal,
    lon: lonDecimal,
  };
}
