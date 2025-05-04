/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader } from '@components/page-header';
import { useQueryClient } from '@tanstack/react-query';
import { useGetSiteConfigurationObject } from '@apis/siteConfiguration/apis';
import { useState } from 'react';
import AddButton from '@components/AddButton';
import UpdateSiteConfiguration from './components/upsert';
import ViewSiteConfiguration from './components/view';

export default function SitConfigurationPage() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: initialValues } = useGetSiteConfigurationObject();
  const queryClient = useQueryClient();

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Site Configuration" icon="fa-solid fa-users" />
          <AddButton onClick={() => setOpen(true)} buttonText="Update" />
        </div>
        <ViewSiteConfiguration />
      </div>

      <UpdateSiteConfiguration
        open={open}
        initialValues={initialValues}
        onClose={() => {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['getSiteConfigurationObject'],
          });
        }}
      />
    </div>
  );
}
