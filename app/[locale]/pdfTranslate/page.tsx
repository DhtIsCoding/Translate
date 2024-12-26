'use client';

import dynamic from 'next/dynamic';
// annotations (e.g. links)  注释链接
import 'react-pdf/dist/Page/AnnotationLayer.css';
// 文本链接
import 'react-pdf/dist/Page/TextLayer.css';

export default function Page() {
  const PdfTranslate = dynamic(() => import('./pdfSource'), { ssr: false });

  return <PdfTranslate />;
}
