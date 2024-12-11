"use client";

import dynamic from "next/dynamic";

export default function Page() {
    const PdfTranslate = dynamic(() => import("./pdfTranslate"), {ssr: false});

    return <PdfTranslate />;
}