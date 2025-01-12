import Logo from '@/components/ui/logo'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('header')
  return (
    <main className="h-screen">
      <h1 className="flex items-center justify-center gap-x-2">
        <Logo />

        <span>{t('title')}</span>
      </h1>
    </main>
  )
}
