/* eslint-disable react-refresh/only-export-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'primereact/image';

type Props = {
  url: string;
  onDelete?: () => void;
  withIcon?: boolean;
};

function Images({ url, onDelete, withIcon }: Props) {
  return (
    <div
      className="relative flex items-center justify-center cursor-pointer overflow-hidden rounded border shadow-sm"
      style={{ maxHeight: '140px', width: '140px' }}
    >
      {withIcon && (
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            zIndex: 99999999,
          }}
        >
          <i className="pi pi-times-circle text-xl text-red-500 hover m-2" onClick={onDelete} />
        </div>
      )}

      <Image
        src={url}
        alt="Image"
        className='w-full h-full'
        style={{ borderRadius: '6px' }}
        preview
      />
    </div>
  );
}

export default React.memo(Images);
