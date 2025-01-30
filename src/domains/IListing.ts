export interface IListing {
  translationProperties: boolean;
  id: number;
  isFeatured: boolean;
  photographer: boolean;
  photographerPrice: number;
  priceType: 'Hour' | 'Person';
  overview: string;
  maximumValue: number;
  minimumValue: number;
  supplier_Id: number;
  listingCategory_Id: number;
  listingType_Id: number;
  price: number;
  priceDiscountValue: number;
  priceDiscountPercentage: number;
  minimumBookingHours: number;
  extraHours: number;
  lat: number;
  long: number;
  hasEntertainment: boolean;
  entertainmentPrices: Array<IListingEntertainment>;
  TranslationProperties: Array<IListingTranslationProperties>;
  amenities: Array<IListingAmenities>;
  listOfAmenities: Array<number>;
  Details: Array<IListingDetails>;
  listOfDetails: Array<number>;
  MediaImages: Array<File>;
  routesMapImage: File;
  youTubeVideoIframe: string;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  name: string;
  supplierName: string;
  listingTypeName: string;
  listingCategoryName: string;
  promotion: true;
  refunds: false;
  attachments: Array<IListingAttachment>;
  policy: string;
  routeDetails: string;
  details: Array<IListingDetails>;
  crewSpeakes: Array<IListingCrewSpeaks>;
  listOfCrewSpeakes: Array<number>;
  ComplimentaryItems: Array<IListingComplimentaryId>;
  listOfComplimentaryItems: Array<number>;
  suitableFor: Array<IListingCategoriesId>;
  listOfListingCategories1: Array<number>;
}

export interface IListingAttachment {
  id: number;
  attachmentPath: string;
  attachmentType: 'media' | 'RoutesMap' | 'YouTubeVideoIframe';
}

export interface IListingEntertainment {
  id: number;
  listingEntertainment_Id: number | null;
  price: number;
  listingEntertainmentName?: string;
  isDeleted: boolean;
}
export interface IListingTranslationProperties {
  languageCode?: string;
  name?: string;
  overview: string;
  policy?: string;
  routeDetails?: string;
}

export interface IListingDetails {
  id?: number;
  listingCategoryDetail_Id?: string;
  listingCategoryDetailName?: string;
  isDeleted?: boolean;
  listingCategoryDetailValue?: string;
  translationProperties?: { languageCode: string; dValue: string }[];
}

export interface IListingAmenities {
  id: number;
  listingAmenity_Id: number;
  listingAmenityName?: string;
  isDeleted: boolean;
}
export interface IListingGetRequestFilter {
  isActive: boolean;
  Search: string;
  SupplierId: number;
}
export interface IListingCrewSpeaks {
  id: number;
  language_Id: number;
  isDeleted: boolean;
}
export interface IListingComplimentaryId {
  id: number;
  listingComplimentary_Id: number;
  isDeleted: boolean;
}
export interface IListingCategoriesId {
  id: number;
  suitableFor_Id: number;
  isDeleted: boolean;
}
