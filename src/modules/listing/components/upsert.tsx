import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Sidebar } from 'primereact/sidebar'
import FormHead from '@components/formHead'
import Input from '@components/input'
import DropDownInput from '@components/Dropdown'
import { Button } from 'primereact/button'
import {
  useListOfEnteringment,
  useListOfListingAmenities,
  useListOfListingCategories,
  useListOfListingDetails,
} from '@apis/lookups/apis'
import { toast } from 'sonner'
import FileUpload from '@components/FileUpload'
import { IListing, IListingEntertainment } from '@domains/IListing'
import { UpsertListing } from '@apis/listing/apis'
import { useListOfSupppliers } from '@apis/supplier/api'
import MultiSelectInput from '@components/MultiSeelct'
import MultiFileUpload from '@components/MultiFileUpload'
import YouTubeIFrame from '@components/YouTubeIFrame'
import TextArea from '@components/textArea'
import { convertObjectToFormData } from '@helpers/helpingFun'

type Props = {
  onClose: () => void
  intialValues: IListing
  mode: 'edit' | 'add'
  open: boolean
}

export default function UbsertListing({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<IListing>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: intialValues,
  })
  const [MediaFiles, setMediaFiles] = useState<
    {
      file: ArrayBuffer
      name: string
    }[]
  >([])
  const [RoutesMapImage, setRoutesMapImage] = useState<{
    file: ArrayBuffer
    name: string
  }>({} as any)

  const youTubeVideoIframe = form.watch('youTubeVideoIframe')
  const priceType = form.watch('priceType')
  const photographer = form.watch('photographer')
  const [entertainmentPricesList, setEntertainmentPricesList] = useState<
    IListingEntertainment[]
  >([])

  const { data: listOfSuppliers } = useListOfSupppliers()
  const { data: listOfListingCategories } = useListOfListingCategories()
  const { data: listOfListingAmenities } = useListOfListingAmenities()
  const { data: listOfListingDetails } = useListOfListingDetails()
  const { data: listOfEnteringment } = useListOfEnteringment()

  const { mutate, isPending } = useMutation({
    mutationFn: (req: FormData) => UpsertListing(req),
    onSuccess: async res => {
      toast.success(res.message)
      onClose()
    },
  })

  const onSubmit = (values: any) => {
    const data: IListing = values
    data.hasEntertainment = entertainmentPricesList.length > 0 ? true : false
    data.entertainmentPrices = values.entertainmentPrices.map(
      (item: IListingEntertainment) => {
        return {
          listingEntertainment_Id: item.listingEntertainment_Id,
          price: item.price,
          isDeleted: false,
        }
      }
    )
    data.details = values.details.map((item: number) => {
      return {
        listingCategoryDetail_Id: item,
        isDeleted: false,
      }
    })
    data.amenities = values.amenities.map((item: number) => {
      return {
        listingAmenity_Id: item,
        isDeleted: false,
      }
    })

    if (
      data.priceDiscountPercentage &&
      data.priceDiscountPercentage > 0 &&
      data.priceDiscountValue &&
      data.priceDiscountValue > 0
    ) {
      toast.error(
        'You can not set both price discount value and price discount percentage'
      )
      return
    }
    if (data.priceDiscountPercentage && data.priceDiscountPercentage > 0) {
      data.priceDiscountValue = 0
    }
    if (data.priceDiscountValue && data.priceDiscountValue > 0) {
      data.priceDiscountPercentage = 0
    }
    console.log(values)
    console.log(data)

    const { amenities , details , entertainmentPrices , ...rest } = data

    const formData = convertObjectToFormData(rest)
    if (MediaFiles.length > 0) {
      MediaFiles.forEach(file => {
        formData.append('mediaFiles', new Blob([file.file]), file.name)
      })
    }
    if (RoutesMapImage.file) {
      formData.append(
        'routesMapImage',
        new Blob([RoutesMapImage.file]),
        RoutesMapImage.name
      )
    }
    amenities.forEach((item, index) => {
      formData.append(`amenities[${index}].listingAmenity_Id`, item.listingAmenity_Id.toString());
      formData.append(`amenities[${index}].listingAmenityName`, item.listingAmenityName ?? '');
      formData.append(`amenities[${index}].isDeleted`, item.isDeleted.toString());
    });

    details.forEach((item, index) => {
      formData.append(`details[${index}].listingCategoryDetail_Id`, item.listingCategoryDetail_Id.toString());
      formData.append(`details[${index}].listingCategoryDetailName`, item.listingCategoryDetailName ?? '');
      formData.append(`details[${index}].isDeleted`, item.isDeleted.toString());
    });
    entertainmentPrices.forEach((item, index) => {
      formData.append(`entertainmentPrices[${index}].listingEntertainment_Id`, item.listingEntertainment_Id.toString());
      formData.append(`entertainmentPrices[${index}].listingEntertainmentName`, item.listingEntertainmentName ?? '');
      formData.append(`entertainmentPrices[${index}].isDeleted`, item.isDeleted.toString());
    });
    mutate(formData)
  }
  const handelUploadMediaFiles = useCallback((files?: File[]) => {
    if (files) {
      const promises = files.map(file => {
        return new Promise<{ file: ArrayBuffer; name: string }>(
          (resolve, reject) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
              const data = reader.result as ArrayBuffer
              if (data) {
                resolve({
                  file: data,
                  name: file.name,
                })
              }
            }
            reader.onerror = reject
          }
        )
      })

      Promise.all(promises)
        .then(filesData => {
          setMediaFiles(filesData)
        })
        .catch(error => {
          console.error('Error reading files:', error)
        })
    }
  }, [])

  const handelUploadRoutesMapImage = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const data = reader.result as ArrayBuffer
        if (data) {
          setRoutesMapImage({
            file: data,
            name: file.name,
          })
        }
      }
    }
  }, [])

  useEffect(() => {
    if (intialValues) {
      const filteredObj = Object.fromEntries(
        Object.entries(intialValues).filter(([, v]) => v !== null)
      )
      form.reset(filteredObj)
    }
  }, [intialValues])

  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">
        {mode === 'add' ? 'Add Listing' : 'Edit Listing'}
      </span>
    </div>
  )

  const handleClose = () => {
    onClose()
  }

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '50vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        form.reset()
        onClose()
      }}
      header={customHeader}
      dismissable={false}
    >
      <div className="w-100">
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20">
          <FormHead title={'Basic Infromation'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'name',
                title: 'Name',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfSuppliers || []}
              errors={form.formState.errors}
              field={{
                inputName: 'supplier_Id',
                title: 'Supplier',
                isRequired: true,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfListingCategories || []}
              errors={form.formState.errors}
              field={{
                inputName: 'listingCategory_Id',
                title: 'Listing Category',
                isRequired: true,
              }}
            />

            <MultiSelectInput
              control={form.control}
              options={listOfListingAmenities || []}
              errors={form.formState.errors}
              field={{
                inputName: 'amenities',
                title: 'Amenities',
                isRequired: true,
              }}
            />

            <MultiSelectInput
              control={form.control}
              options={listOfListingDetails || []}
              errors={form.formState.errors}
              field={{
                inputName: 'details',
                title: 'Details',
                isRequired: true,
              }}
            />

            <div className="col-span-2">
              <TextArea
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'overview',
                  title: 'Overview',
                  isRequired: true,
                  minLength: 3,
                  maxLength: 100,
                }}
              />
            </div>
          </div>

          <FormHead title={'Price Infromation'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DropDownInput
              control={form.control}
              options={[
                { name: 'Person', id: 'person' },
                { name: 'Hour', id: 'Hour' },
              ]}
              errors={form.formState.errors}
              field={{
                inputName: 'priceType',
                title: 'Price Type',
                isRequired: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'price',
                title: 'Price',
                isRequired: true,
                isNumber: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'minimumValue',
                title: 'Minimum Value',
                isRequired: true,
                isNumber: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'maximumValue',
                title: 'Maximum Value',
                isRequired: true,
                isNumber: true,
              }}
            />

            {priceType === 'person' && (
              <>
                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'priceDiscountValue',
                    title: 'Price Discount Value',
                    isNumber: true,
                  }}
                />

                <Input
                  register={form.register}
                  errors={form.formState.errors}
                  field={{
                    inputName: 'priceDiscountPercentage',
                    title: 'Price Discount Percentage',
                    isNumber: true,
                  }}
                />
              </>
            )}

            {priceType === 'Hour' && (
              <Input
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'extraHours',
                  title: 'Extra Hours',
                  isNumber: true,
                }}
              />
            )}
          </div>

          <FormHead title={'Photographer Infromation'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <DropDownInput
              control={form.control}
              options={[
                { name: 'Yes', id: true },
                { name: 'No', id: false },
              ]}
              errors={form.formState.errors}
              field={{
                inputName: 'photographer',
                title: 'Photographer',
              }}
            />

            {photographer && (
              <Input
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'photographerPrice',
                  title: 'Photographer Price',
                  isNumber: true,
                }}
              />
            )}
          </div>

          <h5 className=" flex items-center justify-between  rounded-[8px] bg-gray-300 py-2 px-3 fw-bold font-bold mt-4">
            <div>
              <i className="fa-regular fa-circle-question me-4"></i>
              {'Entertainment Infromation'}
            </div>

            <button
              type="button"
              className="bg-lightBlue border-none outline-none rounded-[6px] flex items-center justify-center p-2"
              onClick={() => {
                setEntertainmentPricesList([
                  ...entertainmentPricesList,
                  {
                    listingEntertainment_Id: 0,
                    price: 0,
                    isDeleted: false,
                  },
                ])
              }}
            >
              <i className="fa-solid fa-plus text-white text-base"></i>
            </button>
          </h5>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {entertainmentPricesList &&
              entertainmentPricesList.map((_, index) => (
                <div
                  className=" w-full col-span-2 grid gap-4 grid-cols-2"
                  key={index}
                >
                  <DropDownInput
                    control={form.control}
                    options={listOfEnteringment || []}
                    errors={form.formState.errors}
                    field={{
                      inputName: `entertainmentPrices[${index}].listingEntertainment_Id`,
                      title: 'Entertainment',
                      isRequired: true,
                    }}
                  />

                  <div className="flex justify-between items-end ">
                    <Input
                      register={form.register}
                      errors={form.formState.errors}
                      field={{
                        inputName: `entertainmentPrices[${index}].price`,
                        title: 'Price',
                        isNumber: true,
                        isRequired: true,
                      }}
                    />

                    <button
                      type="button"
                      className="m-2 bg-red-500 border-none outline-none rounded-[6px] flex items-center justify-center p-2"
                      onClick={() => {
                        setEntertainmentPricesList([
                          ...entertainmentPricesList.slice(0, index),
                          ...entertainmentPricesList.slice(index + 1),
                        ])
                      }}
                    >
                      <i className="fa-solid fa-trash text-white"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <FormHead title={'Media Files'} />
          <div className="w-100 mt-4">
            <MultiFileUpload
              attachment={[]}
              onFilesSelected={handelUploadMediaFiles}
              title="Media Image"
            />
          </div>
          <FormHead title={'Routes Map Image'} />
          <div className="w-100 mt-4">
            <FileUpload
              attachment={''}
              onFilesSelected={handelUploadRoutesMapImage}
              title="Routes Map Image"
            />
          </div>

          <FormHead title={'YouTube Video'} />
          <Input
            register={form.register}
            errors={form.formState.errors}
            field={{
              inputName: 'youTubeVideoIframe',
              title: 'YouTubeVideoLink',
              isRequired: true,
              minLength: 3,
              maxLength: 100,
            }}
          />
          {youTubeVideoIframe && youTubeVideoIframe.length > 0 && (
            <div className="grid  gap-4 mt-4">
              <YouTubeIFrame iframeSrc={youTubeVideoIframe} />
            </div>
          )}
          {/* ////////////////////////////////////////  Submit And cancle ///////////////////////////////// */}
          <div className="flex items-center mt-4 grid  fixed bottom-4 ">
            <div className="col-12 ">
              <Button
                label={'Submit'}
                raised
                type="submit"
                className="rounded p-2"
                style={{ width: '100px' }}
                disabled={isPending}
              />

              <Button
                label={'Cancle'}
                raised
                severity="secondary"
                type="button"
                className="rounded p-2 ms-4"
                style={{ width: '100px' }}
                onClick={handleClose}
              />
            </div>
          </div>
        </form>
      </div>
    </Sidebar>
  )
}
