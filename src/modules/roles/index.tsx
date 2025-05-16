/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from '@components/page-header';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import AddButton from '@components/AddButton';
import { useGetAllRoles, useGetRoleProfile } from '@apis/roles/apis';
import { IRole } from '@domains/IRole';
import RolesDataTable from './component/dataTable';
import UbsertRoles from './component/upsert';

export default function RolePage() {
  const [open, setOpen] = useState<boolean>(false);
  const [RoleObj, setRoleObj] = useState<IRole>({} as IRole);
  const { data: Users } = useGetAllRoles();
  const { data: RoleProfile, refetch } = useGetRoleProfile(RoleObj.id);
  const queryClient = useQueryClient();

  const onEdit = (profile: IRole) => {
    if (profile && profile.id.length > 0) {
      setRoleObj(profile);
      setOpen(true);
      refetch();
    }
  };

  const handleAddButton = () => {
    setRoleObj({} as IRole);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Roles" icon="fa-solid fa-unlock-keyhole" />
          <div className="flex justify-between items-end gap-3">
            <AddButton onClick={handleAddButton} buttonText="Add Role" />
          </div>
        </div>
        <RolesDataTable onEdit={onEdit} Users={Users || []} />
      </div>

      <UbsertRoles
        open={open}
        intialValues={RoleProfile || ({} as IRole)}
        mode={Object.keys(RoleProfile ?? {}).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setRoleObj({} as IRole);
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ['getAllRoles'] });
        }}
      />
    </div>
  );
}
