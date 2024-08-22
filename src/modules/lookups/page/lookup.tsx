/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import DataTableComponent from '../components/dataTable'
import TableHeader from '../components/tableHeader'
import { IGetLookup, ILookups } from '../core/_models'
import { getLookups } from '../core/_requests'
import LookupDialog from '../components/lookupDialog'
import { ProgressSpinner } from 'primereact/progressspinner' // Import spinner

type Props = {
  obj: ILookups
  className: string
}

export default function LookupsPage({ obj, className }: Props) {
  const [dialogVisable, setdialogVisable] = useState({
    visible: false,
    editObj: {},
  })
  const [modified, setModified] = useState(false)
  const [lookupsData, setLookupsData] = useState<IGetLookup[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await getLookups(obj.getApi, {
          PageNumber: 1,
          PageSize: 100000,
        })
        setLookupsData(data.data)
        setModified(false)
      } catch (error) {
        toast.error('Error In Loading Data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [obj.getApi, modified])

  return (
    <div className="p-4 w-100">
      <div className="card">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className={className}>
            <TableHeader openDialog={setdialogVisable} title={obj.title} />
            {loading ? (
              <div
                className="spinner-overlay flex justify-content-center align-items-center"
                style={{ height: '200px' }}
              >
                <ProgressSpinner
                  style={{ width: '50px', height: '50px' }}
                  strokeWidth="8"
                  animationDuration=".5s"
                />
              </div>
            ) : (
              <DataTableComponent
                openDialog={setdialogVisable}
                lookups={lookupsData}
                isModieied={setModified}
                lookupModel={obj}
              />
            )}
            <LookupDialog
              closeDialog={setdialogVisable}
              dialogVisable={dialogVisable.visible}
              editObj={dialogVisable.editObj}
              obj={obj}
              isModieied={setModified}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
