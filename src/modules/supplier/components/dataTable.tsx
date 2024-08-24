/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { ISupplier } from '@domains/ISupplier'
import ToggleButton from '@components/ToggleButton'
import { DataTable } from 'primereact/datatable'
import { deleteSupplier, toggleSupplier } from '@apis/supplier/api'
import { formatDate } from '@helpers/helpingFun'

type Props = {
  onEdit: (data: ISupplier) => void
  suppliers: ISupplier[]
  isEmployeesLoading: boolean
}

export default function SuppliersDataTable({
  onEdit,
  suppliers,
  isEmployeesLoading,
}: Props) {
  const queryClient = useQueryClient()
  const [SupplierId, setSupplierId] = useState<number>(0)
  const isLoading = isEmployeesLoading

  const { mutate: toggleSupplierMutation } = useMutation({
    mutationKey: ['toggleSupplier'],
    mutationFn: (id: number) => toggleSupplier(id),
    onSuccess(res) {
      toast.success(res.message)
      queryClient.invalidateQueries({ queryKey: ['getAllSuppliers'] })
    },
  })

  const { mutate: deleteSupplierMutation } = useMutation({
    mutationKey: ['deleteSupplier'],
    mutationFn: (id: number) => deleteSupplier(id),
    onSuccess(res) {
      toast.success(res.message)
      queryClient.invalidateQueries({ queryKey: ['getAllSuppliers'] })
    },
  })

  const statusBodyTemplate = (data: ISupplier): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  )

  const reject = () => {}

  const togglePopUp = (event: any, data: ISupplier) => {
    if (data) {
      confirmPopup({
        target: event.currentTarget,
        message: `Are you sure you want to ${
          data.isActive ? 'Deactivate' : 'Activate'
        } ${data.name}?`,
        icon: 'pi pi-exclamation-triangle',
        defaultFocus: 'accept',
        accept: () => {
          toggleSupplierMutation(data.id)
        },
        reject,
      })
    }
  }

  const deletePopUp = (event: any, data: ISupplier) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to delete ${data.name}?`,
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => deleteSupplierMutation(data.id),
      reject,
    })
  }

  const actionTemplate = (rowData: ISupplier) => (
    <div className="flex justify-start w-[200px]">
      <ToggleButton isActive={true} onClick={e => togglePopUp(e, rowData)} />

      <Button
        icon="pi pi-trash"
        rounded
        text
        raised
        aria-label="Filter"
        tooltipOptions={{ position: 'bottom' }}
        tooltip="Delete"
        severity="danger"
        onClick={e => {
          deletePopUp(e, rowData)
        }}
        className="me-4"
      />
      <Button
        icon="pi pi-pencil"
        rounded
        text
        raised
        aria-label="Filter"
        tooltipOptions={{ position: 'bottom' }}
        tooltip="Edit"
        severity="info"
        className="me-4"
      />
    </div>
  )

  return (
    <div className="mt-4">
      <div className="table-container" style={{ position: 'relative' }}>
        {isLoading && (
          <div className="spinner-overlay">
            <ProgressSpinner
              style={{ width: '50px', height: '50px' }}
              strokeWidth="8"
              animationDuration=".5s"
            />
          </div>
        )}
        <DataTable
          value={suppliers ?? []}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column header={'Name'} field={'name'} />
          <Column field="officeAddress" header={'Office Address'} />
          <Column field="landlineOrMobile" header={'Phone'} />
          <Column field="manager" header={'Manger'} />
          <Column field="managerContactNumber" header={'Manger Number'} />
          <Column
            field="attachment_Agreement_ExpireDate"
            header={'Agreement ExpireDate'}
            body={rowData =>
              formatDate(rowData?.attachment_Agreement_ExpireDate)
            }
          />
          <Column
            field="attachment_License_ExpireDate"
            header={'License ExpireDate'}
            body={rowData => formatDate(rowData?.attachment_License_ExpireDate)}
          />
          <Column
            field="isActive"
            header={'isActive'}
            body={rowData => statusBodyTemplate(rowData)}
          />
          <Column
            field="Action"
            header={'actions'}
            body={rowData => actionTemplate(rowData)}
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  )
}
