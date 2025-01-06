"use client"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function PdfCarousel() {
    const [api, setApi] = useState<CarouselApi>()
    const t = useTranslations('pdfCarousel')

    function changePage() {
     if (api?.canScrollNext) {
        api.scrollNext()
        return
     }
        
    if (api?.canScrollPrev) {
          api.scrollPrev()
          return
        }
    }
    
  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
          </CarouselContent>
          
          <Button onClick={changePage}>{api?.canScrollNext ? t("original") : t("translated") }</Button>
    </Carousel>
  )
}