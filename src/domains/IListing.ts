export interface IListing {
  id: number
  isFeatured: boolean
  photographer: boolean
  photographerPrice: number
  priceType: 'Hour' | 'Person'
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
  listOfAmenities: Array<number>
  details: Array<IListingDetails>
  listOfDetails: Array<number>
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

  //////// edit
  attachments: Array<IListingAttachment>
}

export interface IListingAttachment {
  id: number
  attachmentPath: string
  attachmentType: 'media' | 'RoutesMap' | 'YouTubeVideoIframe'
}

export interface IListingEntertainment {
  id: number
  listingEntertainment_Id: number | null
  price: number
  listingEntertainmentName?: string
  isDeleted: boolean
}

export interface IListingDetails {
  id: number
  listingCategoryDetail_Id: number
  listingCategoryDetailName?: string
  isDeleted: boolean
}

export interface IListingAmenities {
  id: number
  listingAmenity_Id: number
  listingAmenityName?: string
  isDeleted: boolean
}
export interface IListingGetRequestFilter {}
