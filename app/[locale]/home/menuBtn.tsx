'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * 顶部菜单弹出按钮
 * @returns
 */
export default function HeaderMenuBtn() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('header')

  function changeOpen() {
    setOpen(!open)
  }

  const menus = [
    {
      label: 'home',
      link: (
        <Link
          href="/"
          key="home"
          className={buttonVariants({ variant: 'ghost' })}
        >
          {t('home')}
        </Link>
      ),
    },
    {
      label: 'introduction',
      link: (
        <Link
          href="/"
          key="introduction"
          className={buttonVariants({ variant: 'ghost' })}
        >
          {t('introduction')}
        </Link>
      ),
    },
  ]

  return (
    <>
      <Button onClick={changeOpen} id="menu-button" variant="ghost">
        {open ? <X /> : <Menu />}
      </Button>
      {!!document &&
        createPortal(
          <>
            <div
              className={`transform absolute top-0 z-10 w-full transition-all h-screen bg-black/30 ${open ? 'visible' : 'hidden'}`}
              onClick={changeOpen}
            ></div>
            <nav
              className={`transform absolute z-10 bg-white top-16 w-full transition-all origin-top-left px-4 py-6 flex flex-col shadow-md gap-y-6 ${open ? 'scale-y-100' : ' scale-y-0'}`}
            >
              <ul>
                {menus.map((menu, index) => (
                  <li key={index} id={menu.label}>
                    {menu.link}
                  </li>
                ))}
              </ul>
            </nav>
          </>,
          document.body,
        )}
    </>
  )
}
