/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import DropDownInput from '@components/Dropdown';
import { Button } from 'primereact/button';
import { useListOfCountries, useListOfNationalitie } from '@apis/lookups/apis';
import { toast } from 'sonner';
import { IUser } from '@domains/IUser';
import { UpsertUser } from '@apis/user/api';

type Props = {
  onClose: () => void;
  intialValues: IUser;
  mode: 'edit' | 'add';
  open: boolean;
};

export default function UbsertUsers({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<IUser>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: intialValues,
  });

  const { data: listOfNationalites } = useListOfNationalitie();
  const { data: listOfCountries } = useListOfCountries();
  const { mutate, isPending } = useMutation({
    mutationFn: (req: IUser) => UpsertUser(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onClose();
    },
  });

  const onSubmit = (values: IUser) => {
    values.id = intialValues?.id || '';
    mutate(values);
  };

  useEffect(() => {
    if (intialValues) {
      const filteredObj = Object.fromEntries(
        Object.entries(intialValues).filter(([, v]) => v !== null),
      );
      form.reset(filteredObj);
    }
  }, [intialValues]);

  const customHeader = (
    <div className="items-center flex gap-4">
      <span className="text-3xl font-bold">
        {mode === 'add' ? 'Add Listing' : 'Edit Listing'}
      </span>
    </div>
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <Sidebar
      position="right"
      visible={open}
      style={{ width: '50vw', fontFamily: 'Cairo' }}
      modal
      className="d-flex dss"
      onHide={() => {
        form.reset();
        onClose();
      }}
      header={customHeader}
      dismissable={false}
    >
      <div className="w-100">
        <form onSubmit={form.handleSubmit(onSubmit)} className="pb-20">
          <FormHead title="Basic Infromation" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'firstName',
                title: 'First Name',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'lastName',
                title: 'Last Name',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />

            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'userName',
                title: 'User Name',
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
              }}
            />
            <Input
              register={form.register}
              errors={form.formState.errors}
              field={{
                inputName: 'phoneNumber',
                title: 'Phone Number',
                isRequired: true,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfNationalites || []}
              errors={form.formState.errors}
              field={{
                inputName: 'nationality_Id',
                title: 'Nationality',
                isRequired: true,
              }}
            />

            <DropDownInput
              control={form.control}
              options={listOfCountries || []}
              errors={form.formState.errors}
              field={{
                inputName: 'country_Id',
                title: 'Country',
                isRequired: true,
              }}
            />

            {mode === 'add' && (
              <Input
                register={form.register}
                errors={form.formState.errors}
                field={{
                  inputName: 'password',
                  title: 'Password',
                  isRequired: true,
                  minLength: 6,
                  maxLength: 100,
                  isPassword: true,
                }}
              />
            )}
          </div>

          <div className="flex items-center mt-4 grid  fixed bottom-4 ">
            <div className="col-12 ">
              <Button
                label="Submit"
                raised
                type="submit"
                className="rounded p-2"
                style={{ width: '100px' }}
                disabled={isPending}
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
      </div>
    </Sidebar>
  );
}
