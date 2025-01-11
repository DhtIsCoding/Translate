'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import bitcoinPdf from "@/assest/pdfs/bitcoin.pdf"


console.log("bitcoinPdf",bitcoinPdf);


function Original() {
  return <div>Original</div>
}

function Translated() {
  return <div>translated</div>
}

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
        <CarouselItem>
          <Original />
        </CarouselItem>
        <CarouselItem>
          <Translated />
        </CarouselItem>
      </CarouselContent>

      <Button onClick={changePage}>
        {api?.canScrollNext ? t('original') : t('translated')}
      </Button>
    </Carousel>
  )
}
