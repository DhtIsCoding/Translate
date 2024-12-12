'use client';
// import Image from "next/image";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { Input } from '@/components/ui/input';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// 设置pdfjs worker路径
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Home() {
  const [pefFile, setPdfFile] = useState<File>();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const [pdfFile] = e.target.files;

    setPdfFile(pdfFile);
  }

  function handleDocumentLoadSuccess(pdfDocument: PDFDocumentProxy) {
    console.log('pdfDocument', pdfDocument);
    setNumPages(pdfDocument.numPages);
  }

  return (
    <div className="flex h-full flex-col items-center py-8">
      <Input
        id="pdf"
        type="file"
        accept=".pdf"
        className="w-min"
        onChange={handleFileChange}
      />

      <Document file={pefFile} onLoadSuccess={handleDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
