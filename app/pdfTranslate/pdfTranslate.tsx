"use client";
// import Image from "next/image";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";

// annotations (e.g. links)  注释链接
import 'react-pdf/dist/Page/AnnotationLayer.css';
// 文本链接
import 'react-pdf/dist/Page/TextLayer.css';



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

  function handleDocumentLoadSuccess(pdfDocument: any) {
    console.log("pdfDocument", pdfDocument);
  }

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="pdf" type="file" accept=".pdf" onChange={handleFileChange} />

        <Document file={pefFile} onLoadSuccess={handleDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>

        {/* <div ref={viewerRef} className="overflow-auto absolute w-full h-full">
          <div id="viewer" className="pdfViewer"></div>
        </div> */}
      </div>
    </div>
  );
}
