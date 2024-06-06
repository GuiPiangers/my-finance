'use client'

import { RxHamburgerMenu } from 'react-icons/rx'
import Sidebar from '../sidebar/Sidebar'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/UseMediaQuery'
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '../ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { logout } from '@/server/authentication/authentication'

type HeaderProps = {
  name: string
}

export default function Header({ name }: HeaderProps) {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  const isMediumScreen = useMediaQuery('(min-width: 768px)')
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (!isLargeScreen) setExpanded(false)
  }, [isLargeScreen])

  return (
    <>
      <Sheet>
        <header className="col-span-2 bg-blue-500 text-white flex gap-4 px-4 py-2  h-14 items-center justify-between w-full">
          <SheetTrigger asChild>
            <button onClick={() => isLargeScreen && setExpanded((v) => !v)}>
              <RxHamburgerMenu size={24} cursor={'pointer'} />
            </button>
          </SheetTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-4">
                <span>{name}</span>

                <Avatar className="text-black">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Conquistas</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-500 focus:bg-red-100 focus:text-red-600"
                onClick={async () => {
                  await logout()
                }}
              >
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {isMediumScreen && <Sidebar expanded={expanded} />}
        {!isLargeScreen && (
          <SheetContent side={'left'} className="w-80">
            <SheetHeader className="text-lg font-semibold">{name}</SheetHeader>
            <Sidebar expanded className="px-0 w-full shadow-none"></Sidebar>
          </SheetContent>
        )}
      </Sheet>
    </>
  )
}
