import Link, { LinkProps } from 'next/link'
import { SidebarContext, SidebarStyle } from './Sidebar'
import { ReactNode, useContext } from 'react'
import { usePathname } from 'next/navigation'

type SidebarLinkProps = {
  icon: ReactNode
  title: string
  className?: string
} & LinkProps

export default function SidebarLink({
  icon,
  title,
  href,
  className,
}: SidebarLinkProps) {
  const { expanded } = useContext(SidebarContext)
  const { link, text } = SidebarStyle({ expanded })
  const path = usePathname()
  return (
    <Link
      href={href}
      className={link({
        className: [
          className,
          path === href && 'bg-blue-200 hover:bg-blue-300',
        ],
      })}
    >
      {icon}
      <span className={text()}>{title}</span>
    </Link>
  )
}
