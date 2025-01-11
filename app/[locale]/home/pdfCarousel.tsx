import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useTranslations } from 'next-intl'
import PdfDisplayer from './pdfDisplayer'

function Original() {
  return <PdfDisplayer file="/pdfs/bitcoin.pdf" />
}

function Translated() {
  return <PdfDisplayer file="/pdfs/bitcoin.zh-CN.pdf" />
}

export default function PdfCarousel() {
  // const [api, setApi] = useState<CarouselApi>()
  const t = useTranslations('pdfCarousel')

  // function changePage() {
  //   if (api?.canScrollNext) {
  //     api.scrollNext()
  //     return
  //   }

  //   if (api?.canScrollPrev) {
  //     api.scrollPrev()
  //     return
  //   }
  // }

  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Original />
        </CarouselItem>
        <CarouselItem>
          <Translated />
        </CarouselItem>
      </CarouselContent>

      {/* <Button onClick={changePage}>
        {api?.canScrollNext ? t('original') : t('translated')}
      </Button> */}
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
