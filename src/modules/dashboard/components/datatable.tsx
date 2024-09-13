import { useGetAllNotification } from '@apis/notifications/apis';
import { INotification } from '@domains/INotification';
import { timeAgo } from '@helpers/helpingFun';
import { useUserData } from '@store/auth';
import { Column } from 'primereact/column';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { ReactNode } from 'react';

export default function DashboardDataTable() {
  const { userData } = useUserData();
  const { data: userNotifications } = useGetAllNotification(userData.uid);
  const statusBodyTemplate = (data: INotification): ReactNode => (
    <Tag
      value={data.isRead ? 'Readed' : 'Un Readed'}
      severity={data.isRead ? 'success' : 'danger'}
    />
  );

  return (
    <div>
      <div className="table-container" style={{ position: 'relative' }}>
        <DataTable
          value={userNotifications}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="data-table-custom"
        >
          <Column field="title" header="title" className="text-direction" />
          <Column field="message" header="message" className="text-direction" />
          <Column
            field="messageDate"
            header="date"
            body={(data) => timeAgo(new Date(data.messageDate))}
          />
          <Column
            field="isReaded"
            header="isActive"
            body={(rowData) => statusBodyTemplate(rowData)}
          />
        </DataTable>
      </div>
      <ConfirmPopup />
    </div>
  );
}
