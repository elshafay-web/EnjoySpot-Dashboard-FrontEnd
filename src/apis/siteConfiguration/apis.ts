import { IResponse } from '@domains/IResponse';
import { ISiteConfiguration } from '@domains/ISiteConfiguration';
import { HttpPaths } from '@Enums/httpPaths';
import { CommonGetRequestsWithQuery } from '@helpers/helpingFun';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getSiteConfigurationObject =
  async (): Promise<ISiteConfiguration> => {
    const response = await CommonGetRequestsWithQuery(
      HttpPaths.Api_siteConfigurations_Get,
      {},
    );
    return response.data?.data;
  };

export const useGetSiteConfigurationObject = () => {
  const query = useQuery<ISiteConfiguration, Error>({
    queryKey: ['getSiteConfigurationObject'],
    queryFn: () => getSiteConfigurationObject(),
  });
  return query;
};

export async function updateSiteConfigurationObject(
  req: FormData,
): Promise<IResponse<ISiteConfiguration>> {
  const data = await axios.post(
    `${HttpPaths.Api_siteConfigurations_Update}`,
    req,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data?.data;
}
