'use client';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cMapOptions } from '@/lib/pdfDisplay';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { OnLoadProgressArgs } from 'react-pdf/src/shared/types.js';

// 设置pdfjs worker路径
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function CustomRenderer(prop: { key?: string }) {
  if (!prop.key) {
    return null;
  }

  console.log('CustomRenderer', prop);
  debugger;
  return <div></div>;
}

export default function Home() {
  const [pefFile, setPdfFile] = useState<File>();
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageNumberArray, setPageNumberArray] = useState<number[]>([]);

  useEffect(() => {
    if (!numPages) {
      return;
    }
    const temp = new Array(10).fill(0).map((_, index) => index + pageNumber);

    setPageNumberArray(temp);
  }, [pageNumber, numPages]);

  function handlePrevious() {
    setPageNumber((state) => state - 1);
  }

  function handleNext() {
    setPageNumber((state) => state + 1);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const [pdfFile] = e.target.files;

    setPdfFile(pdfFile);
  }

  function handleDocumentLoadSuccess(pdfDocument: PDFDocumentProxy) {
    setNumPages(pdfDocument.numPages);
  }

  function handleLoadProgress(process: OnLoadProgressArgs) {
    console.log(process.loaded / process.total);
  }

  function customRenderer(...rest: any[]) {
    console.log('customRenderer', rest);
  }

  return (
    <div className="flex h-full">
      <div className="flex h-full flex-1 flex-col items-center py-8">
        <Input
          id="pdf"
          type="file"
          accept=".pdf"
          className="w-min"
          onChange={handleFileChange}
        />

        <div className="my-4 flex flex-1 flex-col">
          <Document
            className="flex-1"
            renderMode="custom"
            file={pefFile}
            options={cMapOptions}
            onLoadProgress={handleLoadProgress}
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} customRenderer={CustomRenderer} />
          </Document>
          {numPages && (
            <p className="text-center">
              Page {pageNumber} of {numPages}
            </p>
          )}
        </div>

        <div className="text-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>
              {pageNumber !== 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {pageNumberArray.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink href="#" onClick={() => setPageNumber(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {pageNumber !== numPages && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div></div>
    </div>
  );
}
