import Image from 'next/image'
import Logo from '@/assest/images/logo.png'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import HeaderMenuBtn from '../home/menuBtn'

export default function Home() {
  const t = useTranslations('header')
  return (
    <div id="root" className="h-screen overflow-y-auto">
      <header className="flex items-center gap-x-2 w-full fixed transition-all h-20">
        <Image src={Logo} alt="logo" className="size-11" />

        <h1>{t('title')}</h1>

        <HeaderMenuBtn />

        <Link href="/login"></Link>
      </header>
    </div>
  )
}
