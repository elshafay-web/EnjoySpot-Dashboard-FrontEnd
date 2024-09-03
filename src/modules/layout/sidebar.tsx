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
          location.href.split(/[?#]/)[1]?.toLowerCase() ===
          item.routing?.toLowerCase()
            ? ' bg-lightBlue  text-white'
            : ''
        } group flex items-center cursor-pointer border-none hover:text-white hover:bg-lightBlue py-3 px-3 my-1 rounded-lg transition-all`}
        onClick={options.onClick}
      >
        <i
          className={`${item.icon} ${
            location.href.split(/[?#]/)[1]?.toLowerCase() ===
            item.routing?.toLowerCase()
              ? ' text-white'
              : ''
          } text-darkBlue group-hover:text-white`}
        />
        
        <span className={"text-meduim"}>{item.label}</span>
      </a>
    )
    
    const items: SidebarItem[] = [
      {
        label: 'DashBoard',
        routing: '/',
        icon: 'fa-solid fa-gauge-high text-2xl w-[42px]',
        template: itemRenderer,
        command: () => navigate('/'),
      },
      {
        label: 'Suppliers',
        icon: 'fa-solid fa-people-group text-2xl w-[42px]',
        routing: '/suppliers',
        template: itemRenderer,
        command: () => navigate('/suppliers'),
      },
      {
        label: 'Listing',
        icon: 'fa-solid fa-ship text-2xl w-[42px]',
        routing: '/listing',
        template: itemRenderer,
        command: () => navigate('/listing'),
      },
      {
        label: 'Listing Package',
        icon: 'fa-solid fa-box-open text-2xl w-[42px]',
        routing: '/listing-package',
        template: itemRenderer,
        command: () => navigate('/listing-package'),
      },
      {
        label: 'Settings',
        icon: 'fa-solid fa-gear text-2xl m-0 w-[42px] ',
        routing: '/lookups',
        items: [
          ...LookupsData.map(elem => ({
            label: elem.title,
            routing: elem.routing,
            icon: elem.icon,
            template: itemRenderer,
            command: () => navigate(elem.routing),
          })),
        ],
      },
    ]
    return (
      <div className="flex">
        <aside className="w-72 bg-white text-white h-screen px-4">
          <div className="h-16 w-full flex justify-start items-center bg-white p-3 m-0">
            <img
              src="EnjoySpot_Icon.svg"
              width={'45px'}
              height={'45px'}
              className="rounded-full"
              alt=""
            />
            <h1 className="text-lightBlue text-3xl ms-4 font-bold">Enjoy Spot</h1>
          </div>
          <PanelMenu model={items} className="w-full h-full"  />
        </aside>
      </div>
    )
  }
