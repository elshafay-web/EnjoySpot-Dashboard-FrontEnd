/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { PageHeader } from '@components/page-header'
import FilterButton from '@components/FilterButton'
import AddButton from '@components/AddButton'
import { useQueryClient } from '@tanstack/react-query'
import { IListingGetRequestFilter } from '@domains/IListing'
import SearchForListingPackage from './components/search'
import ListingsPackageDataTable from './components/dataTable'
import UbsertListingPackage from './components/upsert'
import {
  IListingPackageGetRequestFilter,
  IListingPackages,
} from '@domains/IListingPackage'
import {
  useGetAllListingPackages,
  useGetListingPackageProfile,
} from '@apis/listingPackage/apis'
import ViewListingPackage from './components/view'

export default function ListingPackagePage() {
  const op = useRef<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)

  const [ListingPackageObj, setListingPackageObj] = useState<IListingPackages>(
    {} as IListingPackages
  )
  const [filter, setFilter] = useState({} as IListingPackageGetRequestFilter)
  const { data: listingsPackages } = useGetAllListingPackages(filter)
  const { data: ListingPackageProfile } = useGetListingPackageProfile(
    ListingPackageObj.id
  )
  const queryClient = useQueryClient()

  const onEdit = (profile: IListingPackages) => {
    if (profile && profile.id > 0) {
      setListingPackageObj(profile)
      setOpen(true)
    }
  }

  const onView = (profile: IListingPackages) => {
    if (profile && profile.id > 0) {
      setListingPackageObj(profile)
      setView(true)
    }
  }

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e)
  }

  const handleAddButton = () => {
    setListingPackageObj({} as IListingPackages)
    setOpen(true)
  }

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Listings" icon={'fa-solid fa-people-group'} />
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForListingPackage
                    onSearch={data => setFilter(data)}
                    onClear={() => {
                      setFilter({} as IListingGetRequestFilter)
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton
              onClick={handleAddButton}
              buttonText={'Add Listing Package'}
            />
          </div>
        </div>
        <ListingsPackageDataTable
          onEdit={onEdit}
          onView={onView}
          listings={listingsPackages || []}
        />
      </div>

      <UbsertListingPackage
        open={open}
        intialValues={ListingPackageProfile || ({} as IListingPackages)}
        mode={
          Object.keys(ListingPackageProfile || {}).length > 0 ? 'edit' : 'add'
        }
        onClose={() => {
          setListingPackageObj({} as IListingPackages)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['getAllListingPackages'] })
        }}
      />
      <ViewListingPackage
        open={view}
        profile={ListingPackageProfile || ({} as IListingPackages)}
        onClose={() => {
          setListingPackageObj({} as IListingPackages)
          setView(false)
        }}
      />
    </div>
  )
}
