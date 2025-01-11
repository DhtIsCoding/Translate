import Logo from '@/assest/images/logo.png'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Home() {
  const t = useTranslations('header')
  return (
    <main className="h-screen ">
      <h1 className="flex items-center justify-center gap-x-2">
        <Image src={Logo} id="logo" alt="logo" className="size-11" />
        <span>{t('title')}</span>
      </h1>
    </main>
  )
}
