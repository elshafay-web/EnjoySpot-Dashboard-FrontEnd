/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { PageHeader } from '@components/page-header'
import FilterButton from '@components/FilterButton'
import AddButton from '@components/AddButton'
import { useQueryClient } from '@tanstack/react-query'
import { IListing, IListingGetRequestFilter } from '@domains/IListing'
import { useGetAllListings, useGetListingProfile } from '@apis/listing/apis'
import SearchForListing from './components/search'
import ListingsDataTable from './components/dataTable'
import UbsertListing from './components/upsert'
import ViewListing from './components/view'
import { Button } from 'primereact/button'

export default function ListingPage() {
  const op = useRef<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)
  const [ListingObj, setListingObj] = useState<IListing>({} as IListing)
  const [filter, setFilter] = useState({...{} as IListingGetRequestFilter , isActive: true})
  const { data: listings } = useGetAllListings(filter)
  const { data: ListingProfile } = useGetListingProfile(ListingObj.id)
  const queryClient = useQueryClient()

  const onEdit = (profile: IListing) => {
    if (profile && profile.id > 0) {
      setListingObj(profile)
      setOpen(true)
    }
  }

  const onView = (profile: IListing) => {
    if (profile && profile.id > 0) {
      setListingObj(profile)
      setView(true)
    }
  }

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e)
  }

  const handleAddButton = () => {
    setListingObj({} as IListing)
    setOpen(true)
  }

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Listings" icon={'fa-solid fa-people-group'} />
          <div className="flex items-center justify-start">
            <Button
              onClick={() => setFilter({ ...filter, isActive: true })}
              label="Published"
              severity={`${filter.isActive ? 'success' : 'secondary'}`}
              className="w-[150px] mx-2"
            />

            <Button
              onClick={() => setFilter({ ...filter, isActive: false })}
              label="Disabled"
              severity={`${filter.isActive === false ? 'danger' : 'secondary'}`}
              className="w-[150px]"
            />
          </div>
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForListing
                    onSearch={data => setFilter(data)}
                    onClear={() => {
                      setFilter({...{} as IListingGetRequestFilter , isActive: true})
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton onClick={handleAddButton} buttonText={'Add Listing'} />
          </div>
        </div>
        <ListingsDataTable
          onEdit={onEdit}
          onView={onView}
          listings={listings || []}
        />
      </div>

      <UbsertListing
        open={open}
        intialValues={ListingProfile || ({} as IListing)}
        mode={Object.keys(ListingProfile ?? {}).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setListingObj({} as IListing)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['getAllListings'] })
        }}
      />

      <ViewListing
        open={view}
        profile={ListingProfile || ({} as IListing)}
        onClose={() => {
          setListingObj({} as IListing)
          setView(false)
        }}
      />
    </div>
  )
}
