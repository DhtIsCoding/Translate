'use client'

import { cMapOptions } from '@/lib/pdfDisplay'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import type { OnLoadProgressArgs } from 'react-pdf/src/shared/types.js'
import { useImmer } from 'use-immer'

// 设置pdfjs worker路径
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PdfDisplayer({ file }: { file: string }) {
  const [state, setState] = useImmer({
    numPages: 0,
    width: 0,
  })

  useEffect(() => {
    setState((draft) => {
      draft.width = window.innerWidth
    })
  }, [setState])

  function handleDocumentLoadSuccess(pdfDocument: PDFDocumentProxy) {
    console.log(pdfDocument.numPages)

    setState((draft) => {
      draft.numPages = pdfDocument.numPages
    })
  }

  function handleLoadProgress(process: OnLoadProgressArgs) {
    console.log(process.loaded / process.total)
  }

  return (
    <Document
      className="h-[calc(100vh-100px)] overflow-y-auto"
      file={file}
      options={cMapOptions}
      onLoadProgress={handleLoadProgress}
      onLoadSuccess={handleDocumentLoadSuccess}
    >
      {Array.from({ length: state.numPages }).map((item, index) => (
        <Page
          key={index}
          pageIndex={index}
          width={state.width}
          className="h-96"
        />
      ))}
    </Document>
  )
}
