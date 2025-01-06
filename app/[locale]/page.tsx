import Image from 'next/image'
import Logo from '@/assest/images/logo.png'
import { useTranslations } from 'next-intl'
import HeaderMenuBtn from './home/menuBtn'
import { Link } from '@/i18n/routing'
import { Button, buttonVariants } from '@/components/ui/button'
import HeaderContainer from './home/headerContainer'
import Example from './home/example'

function HomePage() {
  const t = useTranslations('homePage')

  return (
    <div className="flex flex-col pb-12 flex-1 items-center justify-between">
      <div className="text-center">
        <h1 className="text-xl font-medium">
          {t.rich('title', {
            model: (chunks) => (
              <span className="text-purple-500">{chunks}</span>
            ),
          })}
        </h1>

        <p className="mt-10">PDF, DOCX, ePub...</p>
        <p className="my-1">{t('layout')}</p>
        <p className="mb-8">{t('translated')}</p>

        <Button className="w-7/12">{t('upload')}</Button>
      </div>

      <Example />
    </div>
  )
}

export default function Home() {
  const t = useTranslations('header')
  return (
    <>
      <HeaderContainer>
        <Image src={Logo} id="logo" alt="logo" className="size-11" />

        <h1 id="title" className="text-xl">
          {t('title')}
        </h1>

        <span className="flex-1"></span>

        {/* 菜单按钮 */}
        <HeaderMenuBtn />

        <Link
          id="login"
          href="/login"
          className={buttonVariants({ variant: 'default' })}
        >
          {t('begin')}
        </Link>
      </HeaderContainer>

      <main className="pt-28 min-h-full flex-1 flex flex-col">
        <HomePage />
      </main>
    </>
  )
}
