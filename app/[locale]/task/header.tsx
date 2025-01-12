import Logo from '@/components/ui/logo'
import { useTranslations } from 'next-intl'
import MenuButton from './menuBtn'

export default function UserHeader() {
  const t = useTranslations('header')

  return (
    <header className="flex gap-x-4 p-4">
      <MenuButton />

      <Logo />

      <h1>{t('title')}</h1>
    </header>
  )
}
