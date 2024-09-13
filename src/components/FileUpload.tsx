/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'primereact/button';
import Image from './Image';

interface IFile extends File {
  url?: string;
}
interface FileUploadProps {
  onFilesSelected: (files: IFile | undefined) => void;
  attachment?: string;
  title: string;
}

export default function FileUpload({
  onFilesSelected,
  attachment,
  title,
}: FileUploadProps) {
  const [files, setFiles] = useState<IFile | undefined>(undefined);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] as IFile;
      setFiles(file);
      onFilesSelected(file);
    },
    [onFilesSelected],
  );

  const removeFile = useCallback(() => {
    onFilesSelected(undefined);
    setFiles(undefined);
  }, [onFilesSelected]);

  const memoFile = useCallback((file: IFile) => URL.createObjectURL(file), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/gif': [],
      'image/svg': [],
      'application/pdf': [],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (attachment) {
      const file = new File([attachment || ''], `${1}`, {
        type: 'image/png',
      }) as IFile;
      file.url = attachment; // Add the url property
      setFiles(file);
    }
  }, [attachment]);

  return (
    <section className="flex flex-column  items-center justify-center h-full px-1 pr-3">
      {!files && (
        <header
          className={`w-full group my-1 rounded-lg p-5 text-center ${
            isDragActive ? 'bg-light' : ''
          }`}
          {...getRootProps()}
          style={{
            height: '8rem',
            borderWidth: '0.25rem',
            border: '1px dashed #CCC',
          }}
        >
          <input {...getInputProps()} multiple={false} />
          <p className="w-full flex justify-center text-muted mb-2">
            <span>Drag and drop your</span>&nbsp;
            <span>Image</span>
          </p>
          <Button
            type="button"
            style={{
              borderRadius: '6px',
              backgroundColor: '#1b84ff',
              color: '#fff',
              border: 'none',
            }}
            className="p-3"
          >
            {'Upload' + ` ${title}`}
          </Button>
        </header>
      )}

      <ul
        id="gallery"
        className="flex items-center justify-center list-unstyled my-0  gap-4 p-0"
      >
        {files && files.name.length > 0 && files.type !== 'application/pdf' && (
          <li
            key={files.name}
            className="relative m-1 flex flex-column flex-wrap items-center justify-center"
          >
            <h6 className="font-bold py-1 text-base w-full text-center">
              {title}
            </h6>
            <Image
              url={
                files.url
                  ? `${import.meta.env.VITE_BASE_URL}${files.url}`
                  : memoFile(files)
              }
              onDelete={() => removeFile()}
              withIcon
            />
            <div className="flex items-center mt-2 w-full">
              <span className="text-center text-muted w-full">
                {files.name}
              </span>
            </div>
          </li>
        )}
        {files && files.name.length > 0 && files.type === 'application/pdf' && (
          <div
            onClick={() =>
              window.open(
                files.url
                  ? `${import.meta.env.VITE_BASE_URL}${files.url}`
                  : memoFile(files),
              )
            }
          >
            <i className="fa-solid fa-file-pdf text-8xl text-lightBlue cursor-pointer" />
          </div>
        )}
      </ul>
    </section>
  );
}
