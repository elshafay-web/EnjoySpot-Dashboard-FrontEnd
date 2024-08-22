import { PanelMenu } from 'primereact/panelmenu'
import { MenuItem } from 'primereact/menuitem'
import '../../style/sideMenu.scss'
import { useNavigate } from 'react-router'
import LookupsData from '@modules/lookups/core/_lookupData'

interface SidebarItem extends MenuItem {
  routing: string
}

export default function Sidebar() {
  const navigate = useNavigate()

  const itemRenderer = (item: any, options: any) => (
    <a
      className={`${
        location.href.includes(item.routing.toLowerCase())
          ? ' bg-blue-500  text-white'
          : ''
      } group flex items-center cursor-pointer border-none hover:text-white hover:bg-blue-500 py-4 px-3 rounded-lg transition-all`}
      onClick={options.onClick}
    >
      <i className={`${item.icon} ${
        location.href.includes(item.routing.toLowerCase())
          ? ' text-white'
          : ''
      } text-gray-700 group-hover:text-white text-2xl`} />
      <span className={"mx-5 'text-xl"}>{item.label}</span>
    </a>
  )
  const items: SidebarItem[] = [
    {
      label: 'DashBoard',
      routing: '/dashboard',
      icon: 'fa-solid fa-gauge-high',
      template: itemRenderer,
      command: () => navigate('/dashboard'),
    },
    {
      label: 'Suppliers',
      icon: 'fa-solid fa-people-group',
      routing: '/suppliers',
      template: itemRenderer,
      command: () => navigate('/suppliers'),
    },
    {
      label: 'Listing',
      icon: 'fa-solid fa-ship',
      routing: '/listing',
      template: itemRenderer,
      command: () => navigate('/listing'),
    },
    ...LookupsData.map((elem) => ({
      label: elem.title,
      routing:elem.routing,
      template: itemRenderer,
      command: () => navigate(elem.routing),
    })),
  ]
  return (
    <div className="flex">
      <aside className="w-72 bg-white text-white h-screen px-4">
        <div className="h-16 w-full flex justify-start items-center bg-white p-3 m-0">
          <img
            src="vite.svg"
            width={'45px'}
            height={'45px'}
            className="rounded-full"
            alt=""
          />
          <h1 className="text-blue-500 text-2xl ms-4">Enjoy Spot</h1>
        </div>
        <PanelMenu model={items} className="w-full w-full" />
      </aside>
    </div>
  )
}
