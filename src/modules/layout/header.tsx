import { OverlayPanel } from 'primereact/overlaypanel'
import { TieredMenu } from 'primereact/tieredmenu'
import { useRef, useState } from 'react'
import '../../style/header.scss'
import { Badge } from 'primereact/badge'
import { timeAgo } from '@helpers/helpingFun'
import { Tag } from 'primereact/tag'
import { Sidebar } from 'primereact/sidebar'
import { useGetAllNotification } from '@apis/notifications/apis'
import { useUserData } from '@store/auth'

export default function Header() {
  const op = useRef<any>(null)
  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const { userData } = useUserData()
  const { data: allUserNotifications } = useGetAllNotification(userData.uid);




  const logout = () => {}



  const itemRenderer = (item: any) => (
    <a
      className={`group flex items-center cursor-pointer border-none hover:text-white hover:bg-blue-500 py-4 px-3 rounded-lg transition-all`}
    >
      <i className={`${item.icon} text-gray-700 group-hover:text-white text-2xl`} />
      <span className={"mx-5 'text-xl"}>{item.label}</span>
    </a>
  )
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      template: itemRenderer,
    },
    {
      separator: true,
    },
    {
      label: 'Sing Out',
      icon: 'pi pi-sign-out',
      template: itemRenderer,
      command: () => logout(),
    },
  ]



  const notificationSidebar = (
    <Sidebar
      visible={visibleSidebar}
      onHide={() => setVisibleSidebar(false)}
      position="right"
      style={{ width: '40vw', fontFamily: 'Cairo', padding: '0px' }}
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>My Notifications</h3>
        </div>
      }
    >
      {allUserNotifications?.map((elem, index) => (
        <div
          key={index}
          style={{
            borderBottom: '1px solid #ddd',
            padding: '10px 0px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={
              elem.image
                ? import.meta.env.BASE_URL + elem.image
                : 'assets/avatar.png'
            }
            alt="Notification Image"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0', fontSize: '20px' }} className="fw-bold">
              {elem.title}
            </p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>{elem.message}</p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p style={{ fontSize: '12px', color: '#888' }}>
              {timeAgo(new Date(elem.messageDate))}
            </p>
            <Tag
              value={elem.isRead ? 'Readed' : 'Un Readed'}
              severity={elem.isRead ? 'success' : 'danger'}
            />
          </div>
        </div>
      ))}
    </Sidebar>
  );

  return (
    <div className="h-16 flex justify-end items-center bg-white m-0">
      <i className="pi pi-bell p-overlay-badge me-4 cursor-pointer" style={{ fontSize: '1.8rem' }}
      onClick={()=>setVisibleSidebar(true)}>
        <Badge value="2" severity={"danger"}></Badge>
      </i>

      <img
        src="assets/avatar.png"
        alt=""
        width={35}
        height={35}
        className="rounded-full me-4 cursor-pointer"
        onClick={e => op.current.toggle(e)}
      />

      <OverlayPanel ref={op} dismissable style={{ width: '250px' }}>
        <TieredMenu
          model={items}
          breakpoint="767px"
          className="w-full border-none rounded-[8px]"
        />
      </OverlayPanel>

      {notificationSidebar}
    </div>
  )
}
