import Image from "next/image";
import Logo from "@/assest/images/logo.png"
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("header");
  return (
    <div className="h-screen overflow-y-auto">
      <header className="flex items-center gap-x-2">
        <Image src={Logo} alt="logo" className="size-11"/>
      
        <h1>{ t("title")}</h1>
      </header>
     
    </div>
  );
}
