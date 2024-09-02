/* eslint-disable react/jsx-props-no-spreading */
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'primereact/button'
import Image from './Image'

interface IFile extends File {
  url?: string
}
interface FileUploadProps {
  onFilesSelected: (files: IFile[] | undefined) => void
  attachment?: string[]
  title: string
}

export default function MultiFileUpload({
  onFilesSelected,
  attachment,
  title,
}: FileUploadProps) {
  const [files, setFiles] = useState<IFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => file as IFile)
      setFiles(prevFiles => [...prevFiles, ...newFiles])
      onFilesSelected([...files, ...newFiles])
    },
    [onFilesSelected, files]
  )

  const removeFile = useCallback(
    (fileToRemove: IFile) => {
      const updatedFiles = files.filter(file => file.name !== fileToRemove.name)
      setFiles(updatedFiles)
      onFilesSelected(updatedFiles.length > 0 ? updatedFiles : undefined)
    },
    [onFilesSelected, files]
  )

  const memoFile = useCallback((file: IFile) => URL.createObjectURL(file), [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
    maxFiles: undefined, // Allow multiple files
  })

  useEffect(() => {
    if (attachment && attachment.length > 0) {
      const initialFiles = attachment.map((url, index) => {
        const file = new File([url || ''], `${index + 1}`, {
          type: 'image/png',
        }) as IFile
        file.url = url
        return file
      })
      setFiles(initialFiles)
    }
  }, [attachment])

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
            {'Upload ' + title}
          </Button>
        </header>
      )}

      <ul
        id="gallery"
        className="flex items-center justify-end flex-wrap list-unstyled my-0 gap-4 p-0"
      >
        {files.map(file => (
          <li
            key={file.name}
            className="relative m-auto flex flex-column flex-wrap items-center justify-start flex-wrap w-[150px] h-[150px]"
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
    </section>
  )
}
