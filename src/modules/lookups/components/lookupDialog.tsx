import { Dialog } from 'primereact/dialog'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from 'primereact/button'
import { addLookup, listOfLookups } from '../core/_requests'
import { ILookups, IPostLookup } from '../core/_models'
import Input from '@components/input'
import DropDownInput from '@components/Dropdown'
import CheckBoxInput from '@components/checkBox'
import EditorInput from '@components/editor'

type Props = {
  dialogVisable: boolean
  closeDialog: (edit: { visible: boolean; editObj: any }) => void
  obj: ILookups
  editObj: any
  isModieied: (visable: boolean) => void
}

export default function LookupDialog({
  dialogVisable,
  closeDialog,
  obj,
  editObj,
  isModieied,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
  })

  const [loading, setLoading] = useState(false)

  const closeModel = () => {
    closeDialog({ visible: false, editObj: {} })
  }

  const handleClose = () => {
    closeModel()
  }

  const onSubmit: SubmitHandler<any> = async values => {
    setLoading(true)
    let sendObject: IPostLookup = {} as IPostLookup
    if (obj.requireCompanyId) {
      sendObject = { ...values, id: editObj.id ?? 0, company_Id: 1 }
    } else {
      sendObject = { ...values, id: editObj.id ?? 0 }
    }

    try {
      const { data } = await addLookup(sendObject, obj.addApi)
      if (data.isSuccess) {
        closeModel()
        isModieied(true)
        toast.success(data.message)
      } else {
        toast.warning(data.message)
      }
      setLoading(false)
    } catch (err: any) {
      toast.error(`${err.response.data.Message} `)
      setLoading(false)
    }
  }

  const getLookupsData = () => {
    const arr = obj.inputs.filter(elem => elem.isDropDown || elem.isMultiSelect)
    if (arr.length > 0) {
      arr.forEach(async elem => {
        const { data } = await listOfLookups(elem.supplayDataURL)
        if (data.isSuccess) {
          elem.supplayData = data.data
        } else {
          elem.supplayData = []
        }
      })
    }
  }

  useEffect(() => {
    getLookupsData()
    if (Object.keys(editObj).length > 0) {
      obj.inputs.forEach(elem => {
        if (elem.isDropDown || elem.isMultiSelect) {
          setValue(elem.name, +editObj[elem.name])
        }
        setValue(elem.name, editObj[elem.name])
      })
    }

    return () => {
      reset()
    }
  }, [editObj])

  return (
    <Dialog
      header={obj.title}
      visible={dialogVisable}
      modal
      appendTo="self"
      draggable={false}
      dismissableMask={false}
      style={{ width: '50vw' }}
      onHide={() => closeModel()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`grid  ${
            obj.inputs.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
          } gap-4`}
        >
          {obj.inputs.map((field, i) => (
            <div key={i} className={field.isHtml ? 'col-span-2' : 'col-span-1'}>
              {field.isInput && (
                <Input
                  register={register}
                  errors={errors}
                  field={{
                    inputName: field.name,
                    title: field.title,
                    minLength: field.minLength,
                    maxLength: field.maxLength,
                    isRequired: field.isRequired,
                  }}
                />
              )}

              {field.isCheckBox && (
                <div className="fv-row h-100  d-flex justify-content-start align-items-center border rounded p-2">
                  <CheckBoxInput
                    control={control}
                    errors={errors}
                    field={{
                      inputName: field.name,
                      title: field.title,
                    }}
                  />
                </div>
              )}

              {field.isDropDown && (
                <div>
                  <DropDownInput
                    control={control}
                    options={field.supplayData || []}
                    errors={errors}
                    field={{
                      inputName: field.name,
                      title: field.title,
                    }}
                  />
                </div>
              )}

              {field.isHtml && (
                <EditorInput
                  control={control}
                  errors={errors}
                  field={{
                    inputName: field.name,
                    title: field.title,
                    isRequired: field.isRequired,
                    minLength: field.minLength,
                    maxLength: field.maxLength,
                  }}
                />
              )}

              <ErrorMessage
                errors={errors}
                name={field.name}
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p className="text-danger fs-6 pt-2" key={type}>
                      {message}
                    </p>
                  ))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4 grid  ">
          <div className="col-12 ">
            <Button
              label={'Submit'}
              raised
              type="submit"
              className="rounded p-2"
              style={{ width: '100px' }}
              disabled={loading}
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
    </Dialog>
  )
}
