/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISiteConfiguration {
  slider: any;
  id: number;
  items: ISiteConfigurationItem[];
  movingInSecounds: number;
}
export interface ISiteConfigurationItem {
  id: number;
  imageFile: File | undefined;
  ActionUrl: any;
  translationProperties: [
    {
      languageCode: string;
      title: string;
      description: string;
      button: string;
    },
  ];
}
