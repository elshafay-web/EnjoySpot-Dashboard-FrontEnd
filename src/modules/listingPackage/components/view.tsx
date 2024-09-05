import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Sidebar } from 'primereact/sidebar'
import { toast } from 'sonner'
import { IListing, IListingAttachment } from '@domains/IListing'
import clsx from 'clsx'
import { IListingPackages } from '@domains/IListingPackage'
import {
  addListingPackageAttachment,
  deleteListingPackageAttachment,
} from '@apis/listingPackage/apis'
import { useRef, useState } from 'react'
import { isImagePath, isVedioPath } from '@helpers/helpingFun'
import InputView from '@components/inputView'
import YouTubeIFrame from '@components/YouTubeIFrame'

type Props = {
  onClose: () => void
  profile: IListingPackages
  open: boolean
}

export default function ViewListingPackage({ onClose, profile, open }: Props) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (req: FormData) => addListingPackageAttachment(req),
    onSuccess: async res => {
      toast.success(res.message)
      queryClient.invalidateQueries({
        queryKey: ['getListingProfile', profile.id],
      })
    },
  })

  const { mutate: deleteAttachment } = useMutation({
    mutationFn: (req: number) => deleteListingPackageAttachment(req),
    onSuccess: async res => {
      toast.success(res.message)
      queryClient.invalidateQueries({
        queryKey: ['getListingProfile', profile.id],
      })
    },
  })
  const onDelete = (id: number) => {
    deleteAttachment(id)
  }

  const sendAttachment = async (
    files: any[],
    attachmentType: 'media' | 'RoutesMap'
  ) => {
    if (files.length > 0) {
      const formData = new FormData()
      formData.append('Listing_Id', profile.id.toString())
      formData.append('AttachmentType', attachmentType)
      Array.from(files).forEach((elem: any) => {
        formData.append(`ImageFile`, elem, elem.name)
      })

      mutate(formData)
    }
  }

  const [dragging, setDragging] = useState(false)
  const fileInputRefMedia = useRef<any>(null)
  const fileInputRefRouteMap = useRef<any>(null)

  const onSelectFilesMedia = async (
    e: any,
    attachmentType: 'media' | 'RoutesMap'
  ) => {
    sendAttachment(e.target.files, attachmentType)
  }

  const onSelectFilesRoutesMap = async (
    e: any,
    attachmentType: 'media' | 'RoutesMap'
  ) => {
    sendAttachment(e.target.files, attachmentType)
  }

  const handleDragEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }
  const handleDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDropRoutesMap = (
    e: any,
    attachmentType: 'media' | 'RoutesMap'
  ) => {
    e.preventDefault()
    e.stopPropagation()

    setDragging(false)

    const files = [...e.dataTransfer.files]

    sendAttachment(files, attachmentType)
  }

  const handleDropMedia = (e: any, attachmentType: 'media' | 'RoutesMap') => {
    e.preventDefault()
    e.stopPropagation()

    setDragging(false)

    const files = [...e.dataTransfer.files]

    sendAttachment(files, attachmentType)
  }
  const openUploadDialogMedia = () => {
    fileInputRefMedia.current.click()
  }
  const openUploadDialogRouteMap = () => {
    fileInputRefRouteMap.current.click()
  }
  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">{'View Listing Package'}</span>
    </div>
  )

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '50vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        onClose()
      }}
      header={customHeader}
      dismissable={true}
    >
      <div className="w-100">
        <div className="border-b border-dashed mb-2"></div>
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Package Data
        </h4>
        <div className="border-b border-dashed mb-2"></div>{' '}
        <div className="flex justify-between items-center">
          <InputView title="Name" value={profile.name} />
          <InputView title="Supplier Name" value={profile.supplierName} />
        </div>
        <div className="border-b border-dashed mb-2"></div>
        <div className="flex justify-between items-center">
          <InputView
            title="Price"
            value={profile.originalPriceAED}
            superscript={'AED'}
          />
          <InputView
            title="Sale Price"
            value={profile.salePrice}
            superscript={'AED'}
          />
        </div>
        <div className="border-b border-dashed mb-2"></div>
        <div className="flex justify-between items-center">
          <InputView title="Overview" value={profile.overview} />
          <InputView title="Summary" value={profile.summary} />
        </div>
        <div className="border-b border-dashed mb-2"></div>
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Package Categories
        </h4>
        <div className="border-b border-dashed mb-2"></div>{' '}
        {profile.categories &&
          profile.categories.map(elem => {
            return (
              <div className="flex justify-between items-center">
                <InputView
                  title="categories"
                  value={elem.listingCategoryName}
                />
              </div>
            )
          })}
        <div className="border-b border-dashed mb-2"></div>
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Package Media Images
        </h4>
        <div className="border-b border-dashed mb-2"></div>{' '}
        <div
          className={clsx(
            'grid grid-cols-3 gap-4',
            dragging ? 'opscity-5' : ''
          )}
        >
          {profile.attachments &&
            profile.attachments.map((elem: IListingAttachment, i) => {
              return (
                elem.attachmentType === 'media' && (
                  <div
                    key={i}
                    className="col-span-1"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card">
                      <div className="card-body flex justify-center text-center">
                        <a
                          onClick={() => {
                            window.open(
                              import.meta.env.VITE_BASE_URL +
                                elem.attachmentPath
                            )
                          }}
                          className="text-gray-800 text-hover-primary flex flex-column"
                        >
                          <div className="symbol relative w-[250px] h-[200px]">
                            <div
                              style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                zIndex: 99999999,
                              }}
                            >
                              <i
                                className="pi pi-times-circle text-xl text-red-500 hover m-2"
                                onClick={e => {
                                  e.stopPropagation()
                                  onDelete(elem.id)
                                }}
                              />
                            </div>{' '}
                            <img
                              src={
                                isImagePath(elem.attachmentPath)
                                  ? import.meta.env.VITE_BASE_URL +
                                    elem.attachmentPath
                                  : isVedioPath(elem.attachmentPath)
                                  ? 'media/video-play.svg'
                                  : 'media/pdf.svg'
                              }
                              className="theme-light-show w-full h-full"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )
            })}

          <div
            className="col-span-1"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDropMedia(e, 'media')}
          >
            <div
              className="h-full grid grid-cols-1 justify-center items-center bg-gray-200 border-gray-300 border border-dashed p-4 cursor-pointer rounded"
              onClick={openUploadDialogMedia}
            >
              <img
                src="/assets/upload.svg"
                className="mb-5 mx-auto"
                alt="Upload"
              />
              <a className="text-primary hover:text-primary-dark text-lg font-bold mb-2 text-center w-full">
                File Upload
              </a>
              <div className="text-sm font-semibold text-gray-500 w-full text-center">
                Drag and drop files
              </div>

              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.mp4,.gif,.webp,.svg"
                multiple
                onChange={e => onSelectFilesMedia(e, 'media')}
                ref={fileInputRefMedia}
              />
            </div>
          </div>
        </div>
        <div className="border-b border-dashed mb-2"></div>
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Package Routes Map Images
        </h4>
        <div className="border-b border-dashed mb-2"></div>{' '}
        <div
          className={clsx(
            'grid grid-cols-3 gap-4',
            dragging ? 'opscity-5' : ''
          )}
        >
          {profile.attachments &&
            profile.attachments.map((elem: IListingAttachment, i) => {
              return (
                elem.attachmentType === 'RoutesMap' && (
                  <div
                    key={i}
                    className="col-span-1"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card">
                      <div className="card-body flex justify-center text-center">
                        <a
                          onClick={() => {
                            window.open(
                              import.meta.env.VITE_BASE_URL +
                                elem.attachmentPath
                            )
                          }}
                          className="text-gray-800 text-hover-primary flex flex-column"
                        >
                          <div className="symbol relative w-[250px] h-[200px]">
                            <div
                              style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                zIndex: 99999999,
                              }}
                            >
                              <i
                                className="pi pi-times-circle text-xl text-red-500 hover m-2"
                                onClick={e => {
                                  e.stopPropagation()
                                  onDelete(elem.id)
                                }}
                              />
                            </div>
                            <img
                              src={
                                isImagePath(elem.attachmentPath)
                                  ? import.meta.env.VITE_BASE_URL +
                                    elem.attachmentPath
                                  : isVedioPath(elem.attachmentPath)
                                  ? 'media/video-play.svg'
                                  : 'media/pdf.svg'
                              }
                              className="theme-light-show w-full h-full"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )
            })}

          {profile.attachments &&
            !profile.attachments.some(
              (elem: IListingAttachment) => elem.attachmentType === 'RoutesMap'
            ) && (
              <div
                className="col-span-1"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={e => handleDropRoutesMap(e, 'RoutesMap')}
              >
                <div
                  className="h-full grid grid-cols-1 justify-center items-center bg-gray-200 border-gray-300 border border-dashed p-4 cursor-pointer rounded"
                  onClick={openUploadDialogRouteMap}
                >
                  <img
                    src="/assets/upload.svg"
                    className="mb-5 mx-auto"
                    alt="Upload"
                  />
                  <a className="text-primary hover:text-primary-dark text-lg font-bold mb-2 text-center w-full">
                    File Upload
                  </a>
                  <div className="text-sm font-semibold text-gray-500 w-full text-center">
                    Drag and drop files
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.mp4,.gif,.webp,.svg"
                    multiple
                    onChange={e => onSelectFilesRoutesMap(e, 'RoutesMap')}
                    ref={fileInputRefRouteMap}
                  />
                </div>
              </div>
            )}
        </div>
        <div className="border-b border-dashed mb-2"></div>
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Package YouTube Video
        </h4>
        <div className="border-b border-dashed mb-2"></div>{' '}
        {profile.attachments &&
          profile.attachments.find(
            x => x.attachmentType === 'YouTubeVideoIframe'
          ) && (
            <div className="grid  gap-4 mt-4">
              <YouTubeIFrame
                iframeSrc={
                  profile.attachments &&
                  profile.attachments.find(
                    x => x.attachmentType === 'YouTubeVideoIframe'
                  )?.attachmentPath
                }
              />
            </div>
          )}
      </div>
    </Sidebar>
  )
}
