export interface IListing {
  id: number
  isFeatured: boolean
  photographer: boolean
  photographerPrice: number
  priceType: 'Hour' | 'person'
  overview: string
  maximumValue: number
  minimumValue: number
  supplier_Id: number
  listingCategory_Id: number
  price: number
  priceDiscountValue: number
  priceDiscountPercentage: number
  extraHours: number
  lat: number
  long: number
  hasEntertainment: boolean
  entertainmentPrices: Array<IListingEntertainment>
  amenities: Array<IListingAmenities>
  details: Array<IListingDetails>
  MediaImages: Array<File>
  routesMapImage: File
  youTubeVideoIframe: string
  isActive: boolean
  name: string
  supplierName: string
  listingTypeName: string
  listingCategoryName: string
  promotion: true
  refunds: false
}

export interface IListingEntertainment {
  listingEntertainment_Id: number
  price: number
  listingEntertainmentName?: string
  isDeleted: boolean
}

export interface IListingDetails {
  listingCategoryDetail_Id: number
  listingCategoryDetailName?: string
  isDeleted: boolean
}

export interface IListingAmenities {
  listingAmenity_Id: number
  listingAmenityName?: string
  isDeleted: boolean
}
export interface IListingGetRequestFilter {}
