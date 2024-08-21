import { PanelMenu } from 'primereact/panelmenu'
import { MenuItem } from 'primereact/menuitem'
import '../../style/sideMenu.scss'
import { useNavigate } from 'react-router'

interface SidebarItem extends MenuItem {
  routing: string
}

export default function Sidebar() {
  const navigate = useNavigate()

  const itemRenderer = (item: any, options: any) => (
    <a
      className={`${
        location.href.includes(item.routing.toLowerCase())
          ? 'bg-gray-700 text-white'
          : ''
      } flex items-center cursor-pointer border-none hover:text-white hover:bg-gray-700 py-4 px-3 rounded-lg transition-all`}
      onClick={options.onClick}
    >
      <i className={`${item.icon} text-blue-500 text-2xl`} />
      <span className={`mx-5 ${item.items && 'leading-10 text-base	'}`}>
        {item.label}
      </span>
    </a>
  )
  const items: SidebarItem[] = [
    {
      label: 'DashBoard',
      routing: '/dashboard',
      icon: 'fa-light fa-chevron-down',
      template: itemRenderer,
      command: () => navigate('/dashboard'),
    },
    {
      label: 'Suppliers',
      icon: 'pi pi-chart-bar',
      routing: '/suppliers',
      template: itemRenderer,
      command: () => navigate('/suppliers'),
    },
  ]

  return (
    <div className="flex">
      <aside className="w-80 bg-white text-white h-screen px-4">
        <div className="h-16 w-full flex justify-start items-center bg-white p-4 m-0">
          <img
            src="vite.svg"
            width={45}
            height={45}
            className="rounded-full"
            alt=""
          />
          <h1 className="text-blue-500 text-3xl ms-4">Enjoy Spot</h1>
        </div>
        <PanelMenu model={items} className="w-full w-full" />
      </aside>
    </div>
  )
}
