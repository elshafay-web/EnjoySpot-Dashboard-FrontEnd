import { OverlayPanel } from 'primereact/overlaypanel'
import { TieredMenu } from 'primereact/tieredmenu'
import { useRef } from 'react'
import '../../style/header.scss'

export default function Header() {
  const op = useRef<any>(null)

  const logout = () => {}

  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      separator: true,
    },
    {
      label: 'Sing Out',
      icon: 'pi pi-sign-out',
      command: () => logout(),
    },
  ]
  return (
    <div className="h-16 flex justify-end items-center bg-white p-4 m-0">
      <img
        src="assets/avatar.png"
        alt=""
        width={35}
        height={35}
        className="rounded-full"
        onClick={e => op.current.toggle(e)}
      />
      <OverlayPanel ref={op} dismissable style={{ width: '250px' }}>
        <TieredMenu
          model={items}
          breakpoint="767px"
          className="w-full border-none rounded-[8px]"
        />
      </OverlayPanel>
    </div>
  )
}
