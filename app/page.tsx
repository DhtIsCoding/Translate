"use client";

// import Image from "next/image";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react";
import { PDFViewer } from 'pdfjs-dist/web/pdf_viewer.mjs'
import "pdfjs-dist/web/pdf_viewer.css"

// 设置pdfjs worker路径
GlobalWorkerOptions.workerSrc = "/script/pdf.worker.js";


export default function Home() {
  const viewerRef = useRef<HTMLDivElement>(null);

  const pdfViewerRef = useRef<PDFViewer | null>(null);

  useEffect(() => { 

    if (!viewerRef.current) {
      return
    }

    const pdfViewer = new PDFViewer({
      container: viewerRef.current,
      eventBus:
    });

    pdfViewerRef.current = pdfViewer;

    return () => {
      pdfViewer.cleanup();
    };
  },[])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    if (!e.target.files) {
      return; 
    }

    const [pdfFile] = e.target.files;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const buffer = e.target?.result

      if (!buffer) {
        return;
      }

      const loadingTask = getDocument(buffer)

      // 检测pdf加载进度
      loadingTask.onProgress = (...rest) => { 
        console.log("rest",rest);
      }
      
      const pdfDocument = await loadingTask.promise;

      // 清空之前的内容
        viewerRef.current!.innerHTML = "";

      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);

        // 创建一个容器元素
        const pageContainer = document.createElement("div");
        pageContainer.className = "pdf-page";
        viewerRef.current!.appendChild(pageContainer);

        // 设置 viewport
        const scale = 1.0;
        const viewport = page.getViewport({ scale });

        // 创建一个 canvas 元素
        const canvas = document.createElement("canvas");
        pageContainer.appendChild(canvas);
        const context = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // 渲染页面到 canvas 上
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // 创建文本层（可选）
        const textContent = await page.getTextContent();
        const textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        pageContainer.appendChild(textLayerDiv);

        pdfjsLib.renderTextLayer({
          textContent: textContent,
          container: textLayerDiv,
          viewport: viewport,
          textDivs: [],
        });
      }
    };

    reader.readAsArrayBuffer(pdfFile);
  }

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input id="pdf" type="file" accept=".pdf" onChange={handleFileChange} />
        
        <div ref={viewerRef}></div>
      </div>
    </div>
  );
}
