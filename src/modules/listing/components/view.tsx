/* eslint-disable max-lines-per-function */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Sidebar } from 'primereact/sidebar';
import { toast } from 'sonner';
import { IListing, IListingAttachment } from '@domains/IListing';
import {
  addListingAttachment,
  deleteListingAttachment,
} from '@apis/listing/apis';
import InputView from '@components/inputView';
import { useRef, useState } from 'react';
import { isImagePath, isVedioPath } from '@helpers/helpingFun';
import clsx from 'clsx';
import YouTubeIFrame from '@components/YouTubeIFrame';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Editor } from 'primereact/editor';

type Props = {
  onClose: () => void;
  profile: IListing;
  open: boolean;
};

export default function ViewListing({ onClose, profile, open }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (req: FormData) => addListingAttachment(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['getListingProfile', profile.id],
      });
    },
  });

  const { mutate: deleteAttachment } = useMutation({
    mutationFn: (req: number) => deleteListingAttachment(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ['getListingProfile', profile.id],
      });
    },
  });
  const onDelete = (id: number) => {
    deleteAttachment(id);
  };

  const sendAttachment = async (
    files: any[],
    attachmentType: 'media' | 'RoutesMap',
  ) => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('Listing_Id', profile.id.toString());
      formData.append('AttachmentType', attachmentType);
      Array.from(files).forEach((elem: any) => {
        formData.append('ImageFile', elem, elem.name);
      });

      mutate(formData);
    }
  };

  const [dragging, setDragging] = useState(false);
  const fileInputRefMedia = useRef<any>(null);
  const fileInputRefRouteMap = useRef<any>(null);

  const onSelectFilesMedia = async (
    e: any,
    attachmentType: 'media' | 'RoutesMap',
  ) => {
    sendAttachment(e.target.files, attachmentType);
  };

  const onSelectFilesRoutesMap = async (
    e: any,
    attachmentType: 'media' | 'RoutesMap',
  ) => {
    sendAttachment(e.target.files, attachmentType);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropRoutesMap = (
    e: any,
    attachmentType: 'media' | 'RoutesMap',
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = [...e.dataTransfer.files];

    sendAttachment(files, attachmentType);
  };

  const handleDropMedia = (e: any, attachmentType: 'media' | 'RoutesMap') => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = [...e.dataTransfer.files];

    sendAttachment(files, attachmentType);
  };
  const openUploadDialogMedia = () => {
    fileInputRefMedia.current.click();
  };
  const openUploadDialogRouteMap = () => {
    fileInputRefRouteMap.current.click();
  };
  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">View Listing</span>
    </div>
  );

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '50vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        onClose();
      }}
      header={customHeader}
      dismissable
    >
      <div className="w-100">
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">Listing Data</h4>
        <div className="border-b border-dashed mb-2" />{' '}
        <div className="flex justify-between items-center">
          <InputView title="Name" value={profile.name} />
          <InputView title="Supplier Name" value={profile.supplierName} />
        </div>
        <div className="border-b border-dashed mb-2" />
        <div className="flex justify-between items-center">
          <InputView title="Price Type" value={profile.priceType} />
          <InputView title="Price" value={profile.price} superscript="AED" />
        </div>
        <div className="border-b border-dashed mb-2" />
        <div className="flex justify-between items-center">
          <InputView
            title="Minimum Value"
            value={profile.minimumValue}
            superscript="AED"
          />
          <InputView
            title="Maximum Value"
            value={profile.maximumValue}
            superscript="AED"
          />
        </div>
        <div className="border-b border-dashed mb-2" />
        {profile.priceType === 'Person' && (
          <div className="flex justify-between items-center">
            <InputView
              title="Price Discount Percentage"
              value={profile.priceDiscountPercentage ?? ''}
              superscript="%"
            />
            <InputView
              title="Price Discount Value"
              value={profile.priceDiscountValue ?? ''}
              superscript="AED"
            />
          </div>
        )}
        {profile.priceType === 'Hour' && (
          <div className="flex justify-between items-center">
            <InputView title="Extra Hours" value={profile.extraHours ?? ''} />
          </div>
        )}
        {profile.photographer && (
          <div className="flex justify-between items-center">
            <InputView
              title="Extra Hours"
              value={profile.photographerPrice ?? ''}
              superscript="AED"
            />
          </div>
        )}
        <div className="border-b border-dashed mb-2" />
        <div className="col-span-2">
          <label
            htmlFor="overview"
            className="fw-semibold text-gray-400 text-capitalize text-lg"
          >
            OverView
          </label>
          <Editor
            id="overview"
            value={profile.overview}
            style={{ height: '320px' }}
            name="overview"
            className={clsx(
              ' w-full  transition duration-300 rounded-[6px] mt-1',
            )}
            readOnly
            disabled
          />
        </div>
        <div className="border-b border-dashed mb-2" />
        <div className="col-span-2">
          <div className="col-md-12 mt-2">
            <label
              htmlFor="Location"
              className="fw-semibold text-gray-400 text-capitalize text-lg"
            >
              Location
            </label>

            <div className="mt-4">
              <LoadScript googleMapsApiKey="AIzaSyAtKwuPnLrfrCRda600VKNGR2SFV4pAqtk">
                <GoogleMap
                  mapContainerStyle={{ height: '600px', width: '100%' }}
                  zoom={7}
                  center={{ lat: profile.lat, lng: profile.long }}
                >
                  {profile.lat && profile.long && (
                    <Marker
                      position={{
                        lat: profile.lat,
                        lng: profile.long,
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Entertainment
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        {profile.entertainmentPrices &&
          profile.entertainmentPrices.map((elem, i) => (
            <div className="flex justify-between items-center" key={i}>
              <div className="w-1/2 flex justify-start items-center">
                <InputView
                  title="Entertainment"
                  value={elem.listingEntertainmentName}
                />
              </div>
              <div className="w-1/2 flex justify-start items-center">
                <InputView
                  title="Entertainment Price"
                  value={elem.price}
                  superscript="AED"
                />
              </div>
            </div>
          ))}
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Amenities
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        {profile.amenities &&
          profile.amenities.map((elem, i) => (
            <div className="flex justify-between items-center" key={i}>
              <InputView title="Amenities" value={elem.listingAmenityName} />
            </div>
          ))}
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Details
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        {profile.details &&
          profile.details.map((elem, i) => (
            <div className="flex justify-between items-center" key={i}>
              <InputView
                title="Category Detail Name"
                value={elem.listingCategoryDetailName}
              />
            </div>
          ))}
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Media Images
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        <div
          className={clsx(
            'grid grid-cols-3 gap-4',
            dragging ? 'opscity-5' : '',
          )}
        >
          {profile.attachments &&
            profile.attachments.map(
              (elem: IListingAttachment, i) =>
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
                                elem.attachmentPath,
                            );
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
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(elem.id);
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
                ),
            )}

          <div
            className="col-span-1"
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDropMedia(e, 'media')}
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
                onChange={(e) => onSelectFilesMedia(e, 'media')}
                ref={fileInputRefMedia}
              />
            </div>
          </div>
        </div>
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing Routes Map Images
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        <div
          className={clsx(
            'grid grid-cols-3 gap-4',
            dragging ? 'opscity-5' : '',
          )}
        >
          {profile.attachments &&
            profile.attachments.map(
              (elem: IListingAttachment, i) =>
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
                                elem.attachmentPath,
                            );
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
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(elem.id);
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
                ),
            )}

          {profile.attachments &&
            !profile.attachments.some(
              (elem: IListingAttachment) => elem.attachmentType === 'RoutesMap',
            ) && (
              <div
                className="col-span-1"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDropRoutesMap(e, 'RoutesMap')}
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
                    onChange={(e) => onSelectFilesRoutesMap(e, 'RoutesMap')}
                    ref={fileInputRefRouteMap}
                  />
                </div>
              </div>
            )}
        </div>
        <div className="border-b border-dashed mb-2" />
        <h4 className="text-2xl my-5 bg-gray-200 p-4 rounded">
          Listing YouTube Video
        </h4>
        <div className="border-b border-dashed mb-2" />{' '}
        {profile.attachments &&
          profile.attachments.find(
            (x) => x.attachmentType === 'YouTubeVideoIframe',
          ) && (
            <div className="grid  gap-4 mt-4">
              <YouTubeIFrame
                iframeSrc={
                  profile.attachments &&
                  profile.attachments.find(
                    (x) => x.attachmentType === 'YouTubeVideoIframe',
                  )?.attachmentPath
                }
              />
            </div>
          )}
      </div>
    </Sidebar>
  );
}
