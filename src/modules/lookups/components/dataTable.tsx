import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ReactNode } from 'react'
import { toast } from 'sonner'
import { Tag } from 'primereact/tag'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { deleteLookup, toggleLookup } from '../core/_requests'
import { HeaderColumn, IGetLookup, ILookups } from '../core/_models'
import ToggleButton from '@components/ToggleButton'
import { DataTable } from 'primereact/datatable'

type Props = {
  lookups: Array<IGetLookup>
  openDialog: (edit: { visible: boolean; editObj: any }) => void
  isModieied: (visable: boolean) => void
  lookupModel: ILookups
}

export default function DataTableComponent({
  lookups,
  lookupModel,
  openDialog,
  isModieied,
}: Props) {
  const openEditModel = (row: any) => {
    openDialog({ visible: true, editObj: row })
  }

  const deleteItem = async (obj: IGetLookup) => {
    const { data } = await deleteLookup(obj.id, lookupModel.deleteApi)
    if (data.isSuccess) {
      isModieied(true)
      toast.success(data.message)
    }
  }

  const toggleItem = async (obj: IGetLookup) => {
    const { data } = await toggleLookup(obj.id, lookupModel.toggleApi)
    if (data.isSuccess) {
      isModieied(true)
      toast.success(data.message)
    }
  }

  const statusBodyTemplate = (data: IGetLookup): ReactNode => (
    <Tag
      value={data.isActive ? 'Active' : 'Not Active'}
      severity={data.isActive ? 'success' : 'danger'}
    />
  )

  const togglePopUp = (event: any, obj: IGetLookup) => {
    confirmPopup({
      target: event.currentTarget,
      message: `${
        obj.isActive
          ? 'Are you sure you want to deactivate ' + obj.name
          : 'Are you sure you want to activate ' + obj.name
      }`,
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: () => {
        toggleItem(obj)
      },
      reject: () => {},
    })
  }

  const deletePopUp = (event: any, data: IGetLookup) => {
    confirmPopup({
      target: event.currentTarget,
      message: `Are you sure you want to Delete ${data.name}`,

      icon: 'pi pi-info-circle',
      defaultFocus: 'accept',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteItem(data)
      },
      reject: () => {},
    })
  }

  const checkValue = (data: { [key: string]: boolean }, col: HeaderColumn) => {
    if (
      col.isBoolean &&
      col.isBoolean.iconTrue === 'check' &&
      col.isBoolean.iconFalse === 'x'
    ) {
      return data[col.field.toString()] === true ? (
        <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
      ) : (
        <i className="fa-solid fa-circle-xmark text-red-500 text-3xl"></i>
      )
    }
  }
  const actionTemplate = (rowData: IGetLookup) => (
    <div className="d-flex justify-content-start flex-wrap">
      <ToggleButton
        isActive={rowData.isActive}
        onClick={e => togglePopUp(e, rowData)}
      />

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
        onClick={() => openEditModel(rowData)}
      />
    </div>
  )

  return (
    <>
      <DataTable
        value={lookups}
        selectionMode="single"
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        size="normal"
      >
        {lookupModel.columns.map((col, i) =>
          !col.isBoolean ? (
            <Column key={i} field={`${col.field}`} header={col.header} />
          ) : (
            <Column
              key={i}
              field={`${col.field}`}
              header={col.header}
              body={data => checkValue(data, col)}
            />
          )
        )}

        <Column
          field="isActive"
          header={'Status'}
          body={rowData => statusBodyTemplate(rowData)}
        />
        <Column
          header={'Actions'}
          body={obj => actionTemplate(obj)}
          headerClassName="w-10rem"
        />
      </DataTable>

      <ConfirmPopup />
    </>
  )
}
