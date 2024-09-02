export interface IListingPackages {
    id: number
    name : string
    summary  : string
    overview   : string
    supplier_Id: number
    listingCategory_Id: number
    originalPriceAED : number
    salePrice : number
    lat: number
    long: number
    packageCategories: Array<IListingPackageCategories>
    MediaImages: Array<File>
    routesMapImage: File
    youTubeVideoIframe: string
    isActive: boolean
    supplierName: string
  }
  
  export interface IListingPackageCategories {
    listingCategory_Id: number
    listingCategoryName?: string
    isDeleted: boolean
  }
  
  
  export interface IListingPackageGetRequestFilter {}
  