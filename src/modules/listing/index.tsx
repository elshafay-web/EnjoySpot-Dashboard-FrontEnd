/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { PageHeader } from '@components/page-header'
import FilterButton from '@components/FilterButton'
import AddButton from '@components/AddButton'
import { useQueryClient } from '@tanstack/react-query'
import { IListing, IListingGetRequestFilter } from '@domains/IListing'
import { useGetAllListings } from '@apis/listing/apis'
import SearchForListing from './components/search'
import ListingsDataTable from './components/dataTable'
import UbsertListing from './components/upsert'

export default function ListingPage() {
  const op = useRef<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [ListingObj, setListingObj] = useState<IListing>({} as IListing)
  const [filter, setFilter] = useState({} as IListingGetRequestFilter)
  const { data: listings } = useGetAllListings(filter)
  const queryClient = useQueryClient()

  const onEdit = (profile: IListing) => {
    if (profile && profile.id > 0) {
      setListingObj(profile)
      setOpen(true)
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
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForListing
                    onSearch={data => setFilter(data)}
                    onClear={() => {
                      setFilter({} as IListingGetRequestFilter)
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton onClick={handleAddButton} buttonText={'Add Listing'} />
          </div>
        </div>
        <ListingsDataTable onEdit={onEdit} listings={listings || []} />
      </div>

      <UbsertListing
        open={open}
        intialValues={ListingObj}
        mode={Object.keys(ListingObj).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setListingObj({} as IListing)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['getAllSupppliers'] })
        }}
      />
    </div>
  )
}
