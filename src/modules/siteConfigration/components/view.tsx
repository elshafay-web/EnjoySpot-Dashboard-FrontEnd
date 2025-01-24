/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
// import { ISiteConfiguration } from '@domains/ISiteConfiguration';

// type Props = {
// profile: ISiteConfiguration;
// };
import { useGetSiteConfigurationObject } from '@apis/siteConfiguration/apis';

export default function ViewSiteConfiguration() {
  const { data } = useGetSiteConfigurationObject();

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.slider.items.map((item: any, index: any) => (
          <div key={index} className="border p-4 bg-white rounded-lg shadow-lg">
            <img
              src={`https://enjoyspot.premiumasp.net${item.imagePath}`}
              alt={item.title}
              width={300}
              height={200}
              className="rounded-md w-full "
            />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <button className="mt-2 px-4 py-[6px] bg-blue-500 text-white rounded-md">
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
