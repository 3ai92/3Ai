'use client';

import React, { useEffect, useRef } from 'react';

interface BackgroundLayerProps {
    imageUrl?: string;
    pdfUrl?: string;
    pageIndex: number;
    pageSize: { width: number; height: number };
    dpi: number;
    rotation: number;
    scale: number;
    offsetX: number;
    offsetY: number;
    dpr: number;
    viewportWidth: number;
    viewportHeight: number;
    style?: React.CSSProperties;
}

const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
    imageUrl,
    pdfUrl,
    pageIndex,
    pageSize,
    dpi,
    rotation,
    scale,
    offsetX,
    offsetY,
    dpr,
    viewportWidth,
    viewportHeight,
    style,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewportWidth * dpr;
        canvas.height = viewportHeight * dpr;
        canvas.style.width = `${viewportWidth}px`;
        canvas.style.height = `${viewportHeight}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, viewportWidth, viewportHeight);

        const renderBackground = async () => {
            try {
                if (imageUrl) {
                    const img = new Image();
                    img.src = imageUrl;
                    img.onerror = () => {
                        ctx.fillStyle = '#fefefe';
                        ctx.fillRect(0, 0, viewportWidth, viewportHeight);
                        ctx.fillStyle = 'gray';
                        ctx.font = '20px Arial';
                        ctx.fillText('Image Load Failed', 50, 50);
                    };
                    img.onload = () => {
                        const rotatedWidth = rotation % 180 === 0 ? pageSize.width : pageSize.height;
                        const rotatedHeight = rotation % 180 === 0 ? pageSize.height : pageSize.width;
                        const drawWidth = rotatedWidth * scale;
                        const drawHeight = rotatedHeight * scale;

                        ctx.save();
                        ctx.translate(offsetX + drawWidth / 2, offsetY + drawHeight / 2);
                        ctx.rotate((rotation * Math.PI) / 180);
                        ctx.translate(-drawWidth / 2, -drawHeight / 2);
                        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                        ctx.restore();
                    };
                } else if (pdfUrl) {
                    const PDFJS = await import('pdfjs-dist');
                    PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.338/pdf.worker.min.js';
                    const loadingTask = PDFJS.getDocument(pdfUrl);
                    const pdf = await loadingTask.promise;
                    const page = await pdf.getPage(pageIndex + 1);
                    const viewport = page.getViewport({ scale: scale * (dpi / 72) * dpr, rotation });

                    page.render({
                        canvasContext: ctx,
                        viewport,
                        canvas: canvas,
                        transform: [dpr, 0, 0, dpr, offsetX * dpr, offsetY * dpr],
                    });
                } else {
                    ctx.fillStyle = '#fefefe'; // Màu vàng rất nhạt
                    ctx.fillRect(0, 0, viewportWidth, viewportHeight);
                }
            } catch (error) {
                console.error('Error rendering background:', error);
            }
        };

        renderBackground();
    }, [imageUrl, pdfUrl, pageIndex, pageSize, dpi, rotation, scale, offsetX, offsetY, dpr, viewportWidth, viewportHeight]);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, ...style }} />;
};

export default BackgroundLayer;
