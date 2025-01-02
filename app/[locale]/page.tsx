import Image from "next/image";
import Logo from "@/assest/images/logo.png";
import { useTranslations } from "next-intl";
import HeaderMenuBtn from "./menuBtn";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import HeaderContainer from "./headerContainer";

export default function Home() {
  const t = useTranslations("header");
  return (
    <>
      <HeaderContainer>
        <Image src={Logo} id="logo" alt="logo" className="size-11" />

        <h1 id="title" className="text-xl">{t("title")}</h1>

        <span className="flex-1"></span>

        {/* 菜单按钮 */}
        <HeaderMenuBtn />

        <Link id="login" href="/login" className={buttonVariants({ variant: "default" })}>
          {t("begin")}
        </Link>
      </HeaderContainer>

      <div className="pt-28 flex flex-col"></div>
    </>
  );
}
