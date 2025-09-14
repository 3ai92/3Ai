import { PDFDocument, PDFFont, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { pxToPoints } from './coordinateTransforms';

export interface Element {
    id: string;
    role: string;
    type?: string;
    bbox: [number, number, number, number];
    text?: string;
    confidence?: number;
    imageUrl?: string;
    field_name?: string;
    token_level_ocr?: { text: string; bbox: [number, number, number, number]; confidence: number }[];
    normalized_entity?: string;
    elements?: Element[];
}

export interface PageData {
    pageIndex: number;
    pageSize: { width: number; height: number };
    dpi: number;
    elements: Element[];
}

export async function exportToPdf(originalPdfUrl: string, pages: PageData[], fontUrl: string): Promise<Uint8Array> {
    const existingPdfBytes = await fetch(originalPdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (const pageData of pages) {
        const page = pdfDoc.getPage(pageData.pageIndex);
        const { width: pageWidthPt, height: pageHeightPt } = page.getSize();

        for (const el of pageData.elements) {
            const [x1, y1, x2, y2] = el.bbox;
            const xPt = pxToPoints(x1, pageData.dpi);
            const yPt = pageHeightPt - pxToPoints(y2, pageData.dpi);
            const widthPt = pxToPoints(x2 - x1, pageData.dpi);
            const heightPt = pxToPoints(y2 - y1, pageData.dpi);

            if (el.role === 'field' && el.text) {
                let fontSize = heightPt * 0.8;
                const font = customFont; // Use Japanese font

                // Simple wrapping logic
                const words = el.text.split(' ');
                let line = '';
                const lines: string[] = [];
                for (const word of words) {
                    const testLine = line + word + ' ';
                    const metrics = font.widthOfTextAtSize(testLine, fontSize);
                    if (metrics > widthPt - 4) { // padding
                        lines.push(line);
                        line = word + ' ';
                    } else {
                        line = testLine;
                    }
                }
                lines.push(line);

                // Adjust font size if too many lines
                while (lines.length * (fontSize * 1.2) > heightPt && fontSize > 1) {
                    fontSize -= 0.5;
                }

                // Draw lines
                let currentY = yPt + heightPt - fontSize; // Start from top
                for (const l of lines) {
                    page.drawText(l.trim(), {
                        x: xPt + 2, // padding
                        y: currentY,
                        size: fontSize,
                        font,
                        color: rgb(0, 0, 0),
                    });
                    currentY -= fontSize * 1.2;
                }
            } else if (el.role === 'image' || el.role === 'signature') {
                if (el.imageUrl) {
                    const imgBytes = await fetch(el.imageUrl).then(res => res.arrayBuffer());
                    const img = await pdfDoc.embedPng(imgBytes); // Assume PNG
                    page.drawImage(img, {
                        x: xPt,
                        y: yPt,
                        width: widthPt,
                        height: heightPt,
                    });
                }
            } else if (el.type === 'checkbox') {
                page.drawRectangle({
                    x: xPt,
                    y: yPt,
                    width: widthPt,
                    height: heightPt,
                    borderWidth: 1,
                    color: rgb(0, 0, 0),
                });
                // Add check if checked
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
