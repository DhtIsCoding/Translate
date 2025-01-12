import LogoImage from '@/assest/images/logo.png'
import Image from 'next/image'

export default function Logo() {
  return <Image src={LogoImage} id="logo" alt="logo" className="size-11" />
}
