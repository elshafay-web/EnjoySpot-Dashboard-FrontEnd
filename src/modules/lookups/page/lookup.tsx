/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DataTableComponent from '../components/dataTable';
import TableHeader from '../components/tableHeader';
import { IGetLookup, ILookups } from '../core/_models';
import { getLookups } from '../core/_requests';
import LookupDialog from '../components/lookupDialog';

type Props = {
  obj: ILookups;
  className: string;
};

export default function LookupsPage({ obj, className }: Props) {
  const [dialogVisable, setdialogVisable] = useState({
    visible: false,
    editObj: {},
  });
  const [modified, setModified] = useState(false);
  const [lookupsData, setLookupsData] = useState<IGetLookup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLookups(obj.getApi, {
          PageNumber: 1,
          PageSize: 100000,
        });
        setLookupsData(data.data);
        setModified(false);
      } catch (error) {
        toast.error('Error In Loading Data');
      }
    };

    fetchData();
  }, [obj.getApi, modified]);

  return (
    <div className="p-4 w-100">
      <div className="card">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className={className}>
            <TableHeader openDialog={setdialogVisable} title={obj.title} />

            <DataTableComponent
              openDialog={setdialogVisable}
              lookups={lookupsData}
              isModieied={setModified}
              lookupModel={obj}
            />

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
  );
}
