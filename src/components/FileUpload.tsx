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
}

export default function FileUpload({
  onFilesSelected,
  attachment,
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
    <section className="d-flex flex-column h-100 px-1 pr-3">
      {!files && (
        <header
          className={`d-flex flex-column align-items-center justify-content-center group my-1 rounded-lg p-10 text-center ${
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
          <p className="d-flex justify-content-center text-muted mb-2 flex-wrap">
            <span>Drag and drop your</span>&nbsp;
            <span>Image</span>
          </p>
          <Button
            type="button"
            style={{
              borderRadius: '6px',
              backgroundColor: '#1b84ff',
              color:"#fff",
              border: 'none',
            }}
            className="p-3"
          >
            Upload an image
          </Button>
        </header>
      )}

      <ul
        id="gallery"
        className="d-flex list-unstyled my-0 flex-wrap gap-4 p-0"
      >
        {files && (
          <li key={files.name} className="position-relative m-1">
            <h6 className="font-weight-bold py-1 text-sm">Employee Avatar</h6>
            <Image
              url={
                files.url
                  ? `${import.meta.env.VITE_BASE_URL}${files.url}`
                  : memoFile(files)
              }
              onDelete={() => removeFile()}
              withIcon
            />
            <div className="d-flex align-items-center mt-2">
              <span className="text-truncate text-muted max-w-28">
                {files.name}
              </span>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}
