/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISiteConfiguration {
  slider: any;
  id: number;
  items: ISiteConfigurationItem[];
  movingInSecounds: number;
}
export interface ISiteConfigurationItem {
  id: number;
  title: string;
  description: string;
  button: string;
  imageFile: File | undefined;
}
