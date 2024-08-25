/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel'
import { ISupplier, ISupplierListGetRequestFilter } from '@domains/ISupplier'
import { PageHeader } from '@components/page-header'
import FilterButton from '@components/FilterButton'
import SearchForSupplier from './components/search'
import AddButton from '@components/AddButton'
import SuppliersDataTable from './components/dataTable'
import UbsertSupplier from './components/upsertSupplier'
import { useGetAllSupppliers } from '@apis/supplier/api'
import { useQueryClient } from '@tanstack/react-query'

export default function AllEmployees() {
  const op = useRef<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [Supplier, setSupplier] = useState<ISupplier>({} as ISupplier)
  const [filter, setFilter] = useState({} as ISupplierListGetRequestFilter)
  const { data: suppliers } = useGetAllSupppliers(filter)
  const queryClient = useQueryClient()

  const onEdit = (profile: ISupplier) => {
    if (profile && profile.id > 0) {
      setSupplier(profile);
      setOpen(true);
    }
  }

  const handleFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    op.current.toggle(e)
  }

  const handleAddButton = () => {
    setSupplier({} as ISupplier)
    setOpen(true)
  }

  return (
    <div className="p-4">
      <div className="card">
        <div className="flex justify-between items-center">
          <PageHeader title="Suppliers" icon={'fa-solid fa-people-group'} />
          <div className="flex justify-between items-end gap-3">
            <div>
              <FilterButton onClick={handleFilterButton} />
              <OverlayPanel ref={op}>
                <div className="d-flex justify-center items-center flex-column">
                  <SearchForSupplier
                    onSearch={data => setFilter(data)}
                    onClear={() => {
                      setFilter({} as ISupplierListGetRequestFilter)
                    }}
                    defualtValues={filter}
                  />
                </div>
              </OverlayPanel>
            </div>
            <AddButton onClick={handleAddButton} buttonText={'Add Supplier'} />
          </div>
        </div>
        <SuppliersDataTable onEdit={onEdit} suppliers={suppliers || []} />
      </div>

      <UbsertSupplier
        open={open}
        intialValues={Supplier}
        mode={Object.keys(Supplier).length > 0 ? 'edit' : 'add'}
        onClose={() => {
          setSupplier({} as ISupplier)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['getAllSupppliers'] })
        }}
      />
    </div>
  )
}
