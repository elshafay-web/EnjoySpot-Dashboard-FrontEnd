/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Sidebar } from 'primereact/sidebar';
import FormHead from '@components/formHead';
import Input from '@components/input';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import { UpsertRole, useListOfPermissions } from '@apis/roles/apis';
import { IRole } from '@domains/IRole';
import { IListString } from '@modules/lookups/core/_models';
import MultiSelectInput from '@components/MultiSeelct';

type Props = {
  onClose: () => void;
  intialValues: IRole;
  mode: 'edit' | 'add';
  open: boolean;
};

export default function UbsertRoles({
  onClose,
  intialValues,
  mode = 'add',
  open,
}: Props) {
  const form = useForm<IRole>({
    criteriaMode: 'all',
    mode: 'onChange', // or 'onBlur', 'onTouched'
    defaultValues: intialValues,
  });

  const { data: ListOfPermissions } = useListOfPermissions();
  const [permissons, setPermissons] = useState<IListString[]>([]);

  useEffect(() => {
    if (ListOfPermissions) {
      setPermissons(
        ListOfPermissions.map((x) => ({
          id: x.moduleName,
          name: x.moduleName,
        })),
      );
    }
  }, [ListOfPermissions]);

  const { mutate, isPending } = useMutation({
    mutationFn: (req: IRole) => UpsertRole(req),
    onSuccess: async (res) => {
      toast.success(res.message);
      onClose();
    },
  });

  const onSubmit = (values: IRole) => {
    values.id = intialValues?.id || '';
    values.modules =
      (ListOfPermissions?.map((y) => {
        const selectedItem = values.permissonsIds.find(
          (x) => x.toLocaleLowerCase() === y.moduleName.toLocaleLowerCase(),
        );
        if (selectedItem) {
          return {
            moduleName: y.moduleName,
            permissions: y.permissions.map((z) => z.name),
          };
        }
        return null;
      }).filter((module) => module !== null) as {
        moduleName: string;
        permissions: string[];
      }[]) ?? [];
    console.log(values);

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
        {mode === 'add' ? 'Add Role' : 'Edit Role'}
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
                inputName: 'name',
                title: 'Role Name',
                isRequired: true,
                minLength: 3,
                maxLength: 100,
              }}
            />
            <MultiSelectInput
              control={form.control}
              options={permissons || []}
              errors={form.formState.errors}
              field={{
                inputName: 'permissonsIds',
                title: 'Permissoins',
                isRequired: true,
              }}
            />
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
