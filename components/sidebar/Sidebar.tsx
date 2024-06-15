'use client'

import { RxDashboard, RxListBullet } from 'react-icons/rx'
import { tv } from 'tailwind-variants'
import SidebarLink from './SidebarLink'
import { createContext } from 'react'

export const SidebarContext = createContext<{ expanded?: boolean }>({})

export const SidebarStyle = tv({
  slots: {
    base: 'shadow-sm max-w-72 w-24 bg-white group h-[calc(100vh-56px)] py-8 px-2  ease-in-out',
    link: 'hover:bg-slate-200 px-2 py-2 rounded-md flex items-center flex-col gap-2',
    text: 'text-[10px]',
    icon: 'h-6 w-6',
  },
  variants: {
    expanded: {
      true: {
        base: 'w-96',
        link: 'flex-row',
        text: 'text-base',
        icon: 'h-4 w-4',
      },
    },
  },
})

type Sidebar = {
  expanded: boolean
  className?: string
}

export default function Sidebar({ expanded, className }: Sidebar) {
  const { base, icon } = SidebarStyle({ expanded })
  return (
    <SidebarContext.Provider value={{ expanded }}>
      <nav className="">
        <ul
          data-expanded={expanded}
          aria-expanded={expanded}
          className={base({ className })}
        >
          <li>
            <SidebarLink
              title="Dashboard"
              href={'/dashboard'}
              icon={<RxDashboard className={icon()} />}
            />
          </li>
          <li>
            <SidebarLink
              title="Lançamentos"
              href={'/lancamentos'}
              icon={<RxListBullet className={icon()} />}
            />
          </li>
        </ul>
      </nav>
    </SidebarContext.Provider>
  )
}
