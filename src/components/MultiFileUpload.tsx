import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'primereact/button';
import Image from './Image';

interface IFile extends File {
  url?: string;
}
interface FileUploadProps {
  onFilesSelected: (files: IFile[] | undefined) => void;
  attachment?: string[];
  title: string;
}

export default function MultiFileUpload({
  onFilesSelected,
  attachment,
  title,
}: FileUploadProps) {
  const [files, setFiles] = useState<IFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => {
        const newFiles = acceptedFiles
          .filter(
            (newFile) =>
              !prevFiles.some(
                (existingFile) =>
                  existingFile.name === newFile.name &&
                  existingFile.size === newFile.size,
              ),
          )
          .map((file) => file as IFile);
        const updatedFiles = [...prevFiles, ...newFiles];
        onFilesSelected(updatedFiles);
        return updatedFiles;
      });
    },
    [onFilesSelected],
  );

  const removeFile = useCallback(
    (fileToRemove: IFile) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter(
          (file) =>
            file.name !== fileToRemove.name || file.size !== fileToRemove.size,
        );
        onFilesSelected(updatedFiles.length > 0 ? updatedFiles : undefined);
        return updatedFiles;
      });
    },
    [onFilesSelected],
  );

  const memoFile = useCallback((file: IFile) => URL.createObjectURL(file), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
    multiple: true,
    maxFiles: undefined,
  });

  useEffect(() => {
    if (attachment && attachment.length > 0) {
      const initialFiles = attachment.map((url, index) => {
        const file = new File([url || ''], `${index + 1}`, {
          type: 'image/png',
        }) as IFile;
        file.url = url;
        return file;
      });

      setFiles((prevFiles) => {
        const mergedFiles = [
          ...prevFiles,
          ...initialFiles.filter(
            (newFile) =>
              !prevFiles.some(
                (existingFile) =>
                  existingFile.name === newFile.name &&
                  existingFile.url === newFile.url,
              ),
          ),
        ];
        return mergedFiles;
      });
    }
  }, [attachment]);

  const handleAddMore = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="flex flex-column items-center justify-center h-full px-1 pr-3">
      {!files.length && (
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
          <input {...getInputProps()} multiple />
          <p className="flex justify-center text-muted mb-2">
            <span>Drag and drop your</span>&nbsp;
            <span>Images</span>
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
            {`Upload ${title}`}
          </Button>
        </header>
      )}

      <ul className="flex items-center justify-end flex-wrap list-unstyled my-0 gap-4 p-0">
        {files.map((file) => (
          <li
            key={file.name}
            className="relative m-auto flex flex-column items-center justify-start flex-wrap w-[150px] h-[150px]"
          >
            <Image
              url={
                file.url
                  ? `${import.meta.env.VITE_BASE_URL}${file.url}`
                  : memoFile(file)
              }
              onDelete={() => removeFile(file)}
              withIcon
            />
          </li>
        ))}
      </ul>

      {files.length > 0 && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onDrop(Array.from(e.target.files || []))}
          />
          <Button
            onClick={handleAddMore}
            className="mt-4"
            style={{ backgroundColor: '#1b84ff', color: '#fff' }}
          >
            Add More Images
          </Button>
        </>
      )}
    </section>
  );
}
