/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from 'primereact/button';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import CheckBoxInput from '@components/checkBox';
import EditorInput from '@components/editor';
import { useUserData } from '@store/auth';
import MultiSelectInput from '@components/MultiSeelct';
import { IInputShape, ILookups, IPostLookup } from '../core/_models';
import { addLookup, getProfile, listOfLookups } from '../core/_requests';

type Props = {
  dialogVisable: boolean;
  closeDialog: (edit: { visible: boolean; editObj: any }) => void;
  obj: ILookups;
  editObj: any;
  isModieied: (visable: boolean) => void;
};

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
  });

  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  const closeModel = () => {
    closeDialog({ visible: false, editObj: {} });
  };

  const handleClose = () => {
    closeModel();
  };

  const onSubmit: SubmitHandler<any> = async (values) => {
    setLoading(true);
    let sendObject: IPostLookup = {} as IPostLookup;
    if (obj.requireCompanyId) {
      sendObject = { ...values, id: editObj.id ?? 0, company_Id: 1 };
    } else {
      sendObject = { ...values, id: editObj.id ?? 0 };
    }
    if (obj.isRequiredSupportedLanguages) {
      sendObject.translationProperties.forEach((elem: any, index: number) => {
        elem.languageCode = userData.supportedLanguages[index].code;
      });
    }

    console.log(values);

    try {
      const { data } = await addLookup(sendObject, obj.addApi);
      if (data.isSuccess) {
        closeModel();
        isModieied(true);
        toast.success(data.message);
      } else {
        toast.warning(data.message);
      }
      setLoading(false);
    } catch (err: any) {
      toast.error(`${err.response.data.Message} `);
      setLoading(false);
    }
  };

  const getLookupsData = () => {
    const arr = obj.inputs.filter(
      (elem) => elem.isDropDown || elem.isMultiSelect,
    );
    if (arr.length > 0) {
      arr.forEach(async (elem) => {
        if (!elem.supplayData || elem.supplayData.length === 0) {
          const { data } = await listOfLookups(elem.supplayDataURL);
          if (data.isSuccess) {
            elem.supplayData = data.data;
          } else {
            elem.supplayData = [];
          }
        }
      });
    }
  };

  useEffect(() => {
    getLookupsData();
    if (Object.keys(editObj).length > 0) {
      (async () => {
        const { data } = await getProfile(obj.profileApi, editObj.id);
        if (data.isSuccess) {
          obj.inputs.forEach((elem) => {
            if (elem.isDropDown || elem.isMultiSelect) {
              setValue(elem.name, +data.data[elem.name]);
            }
            setValue(elem.name, data.data[elem.name]);
          });
          if (data.data.translationProperties) {
            data.data.translationProperties.forEach(
              (elem: any, index: number) => {
                setValue(`translationProperties[${index}].name`, elem.name);
              },
            );
          }
        }
      })();
    }

    return () => {
      reset();
    };
  }, [editObj]);

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
        <div className="grid grid-cols-2 gap-4 mb-4">
          {obj.inputs
            .filter((x) => !x.isRequiredSupportedLanguages)
            .map((field, i) => (
              <div
                key={i}
                className={field.isHtml ? 'col-span-2' : 'col-span-1'}
              >
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
                {field.isMultiSelect && (
                  <div>
                    <MultiSelectInput
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
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {obj.inputs
            .filter((x) => x.isRequiredSupportedLanguages)
            .map(
              (field: IInputShape) =>
                userData.supportedLanguages?.map((lang, index) => (
                  <Input
                    key={lang.code}
                    register={register}
                    errors={errors}
                    field={{
                      inputName: `translationProperties[${index}].name`,
                      title: `${field.title} In ${lang.name}`,
                      minLength: field.minLength,
                      maxLength: field.maxLength,
                      isRequired: field.isRequired,
                    }}
                  />
                )),
            )}
        </div>
        <div className="col-span-1 items-center mt-4 grid  ">
          <div className="col-12 ">
            <Button
              label="Submit"
              raised
              type="submit"
              className="rounded p-2"
              style={{ width: '100px' }}
              disabled={loading}
            />

            <Button
              label="Cancle"
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
  );
}
