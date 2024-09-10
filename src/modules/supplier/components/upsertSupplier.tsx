import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Sidebar } from 'primereact/sidebar'
import { ISupplier } from '@domains/ISupplier'
import FormHead from '@components/formHead'
import Input from '@components/input'
import CalendarInput from '@components/calendar'
import DropDownInput from '@components/Dropdown'
import { Button } from 'primereact/button'
import { useListOfCities, useListOfCountries } from '@apis/lookups/apis'
import { UpsertSupplier } from '@apis/supplier/api'
import { toast } from 'sonner'
import { convertObjectToFormData } from '@helpers/helpingFun'
import FileUpload from '@components/FileUpload'

type Props = {
  onClose: () => void
  intialValues: ISupplier
  mode: 'edit' | 'add'
  open: boolean
}

export default function UbsertSupplier({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<ISupplier>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: intialValues,
  })
  const [attachmentAgreementFile, setAttachmentAgreementFile] = useState<{
    file: ArrayBuffer
    name: string
  }>({} as any)

  const [attachmentLicenseFile, setAttachmentLicenseFile] = useState<{
    file: ArrayBuffer
    name: string
  }>({} as any)

  const country_Id = form.watch('country_Id')
  const { data: listOfCountries } = useListOfCountries()
  const { data: listOfCities } = useListOfCities(country_Id ?? 0)

  const { mutate, isPending } = useMutation({
    mutationFn: (req: FormData) => UpsertSupplier(req),
    onSuccess: async res => {
      toast.success(res.message)
      onClose()
    },
  })

  const onSubmit = (values: any) => {
    const formData = convertObjectToFormData(values)

    formData.append(
      'attachmentLicenseFile',
      new Blob([attachmentLicenseFile.file])
    )
    formData.append(
      'attachmentAgreementFile',
      new Blob([attachmentAgreementFile.file])
    )
    mutate(formData)
  }

  const handelUploadAttachmentAgreementFile = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const data = reader.result as ArrayBuffer
        if (data) {
          setAttachmentAgreementFile({
            file: data,
            name: file.name,
          })
        }
      }
    }
  }, [])

  const handelUploadAttachmentLicenseFile = useCallback((file?: File) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const data = reader.result as ArrayBuffer
        if (data) {
          setAttachmentLicenseFile({
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
      filteredObj.attachment_Agreement_ExpireDate =
        filteredObj.attachment_Agreement_ExpireDate
          ? new Date(filteredObj.attachment_Agreement_ExpireDate)
          : undefined
      filteredObj.attachment_License_ExpireDate =
        filteredObj.attachment_License_ExpireDate
          ? new Date(filteredObj.attachment_License_ExpireDate)
          : undefined
      form.reset(filteredObj)
    }
  }, [intialValues])
  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">
        {mode === 'add' ? 'Add Supplier' : 'Edit Supplier'}
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

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'email',
                title: 'Email',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <DropDownInput
              control={form.control}
              options={[]}
              errors={form.formState.errors}
              field={{
                inputName: 'user_Id',
                title: 'User',
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'officeAddress',
                title: 'Office Address',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'landlineOrMobile',
                title: 'Landline Or Mobile',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfCountries || []}
              errors={form.formState.errors}
              field={{
                inputName: 'country_Id',
                title: 'country',
                isRequired: true,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfCities || []}
              errors={form.formState.errors}
              field={{
                inputName: 'city_Id',
                title: 'City',
                isRequired: true,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'licenseNumber',
                title: 'License Number',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />
          </div>
          <FormHead title={'Manger Infromation'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'manager',
                title: 'Manager',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'managerContactNumber',
                title: 'Manager Contact Number',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />
          </div>
          <FormHead title={'Attachment Data'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <CalendarInput
              control={form.control}
              errors={form.formState.errors}
              field={{
                inputName: 'attachment_Agreement_ExpireDate',
                title: 'Attachment Agreement ExpireDate',
                isRequired: true,
              }}
            />

            <CalendarInput
              control={form.control}
              errors={form.formState.errors}
              field={{
                inputName: 'attachment_License_ExpireDate',
                title: 'Attachment License ExpireDate',
                isRequired: true,
              }}
            />
          </div>{' '}
          <FormHead title={'Attachment Files'} />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FileUpload
              attachment={intialValues?.attachment_Agreement_ImagePath}
              onFilesSelected={handelUploadAttachmentAgreementFile}
              title="Agreement Image"
            />
            <FileUpload
              attachment={intialValues?.attachment_License_ImagePath}
              onFilesSelected={handelUploadAttachmentLicenseFile}
              title="License Image"
            />
          </div>
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
