export interface IListingPackages {
  id: number;
  nameAr: string;
  nameEn: string;
  name: string;
  summary: string;
  overview: string;
  supplier_Id: number;
  listingCategory_Id: number;
  listingType_Id: number;
  listingTypeName: string;
  originalPriceAED: number;
  salePrice: number;
  lat: number;
  long: number;
  MediaImages: Array<File>;
  routesMapImage: File;
  youTubeVideoIframe: string;
  isActive: boolean;
  supplierName: string;
  attachments: Array<IListingPackageAttachment>;
}

export interface IListingPackageCategories {
  id: number;
  listingCategory_Id: number;
  listingCategoryName?: string;
  isDeleted: boolean;
}

export interface IListingPackageAttachment {
  id: number;
  attachmentPath: string;
  attachmentType: 'media' | 'RoutesMap' | 'YouTubeVideoIframe';
}

export interface IListingPackageGetRequestFilter {
  pageNumber: number;
  pageSize: number;
  search: string;
  isActive: boolean;
}
