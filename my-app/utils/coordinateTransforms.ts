export interface PageSize {
    width: number;
    height: number;
}

export type Bbox = [number, number, number, number];

export function calculateScale(
    pageSize: PageSize,
    viewportSize: { width: number; height: number },
    policy: 'fit-width' | 'fit-height' | 'fit-both' = 'fit-width'
): { scale: number; offsetX: number; offsetY: number } {
    const scaleX = viewportSize.width / pageSize.width;
    const scaleY = viewportSize.height / pageSize.height;

    let scale: number;
    switch (policy) {
        case 'fit-width':
            scale = scaleX;
            break;
        case 'fit-height':
            scale = scaleY;
            break;
        case 'fit-both':
            scale = Math.min(scaleX, scaleY);
            break;
    }

    const drawWidth = pageSize.width * scale;
    const drawHeight = pageSize.height * scale;
    const offsetX = (viewportSize.width - drawWidth) / 2;
    const offsetY = (viewportSize.height - drawHeight) / 2;

    return { scale, offsetX, offsetY };
}

export function mapPageToView(bbox: Bbox, scale: number, offsetX: number, offsetY: number): Bbox {
    return [
        bbox[0] * scale + offsetX,
        bbox[1] * scale + offsetY,
        bbox[2] * scale + offsetX,
        bbox[3] * scale + offsetY,
    ];
}

export function mapViewToPage(bbox: Bbox, scale: number, offsetX: number, offsetY: number): Bbox {
    return [
        (bbox[0] - offsetX) / scale,
        (bbox[1] - offsetY) / scale,
        (bbox[2] - offsetX) / scale,
        (bbox[3] - offsetY) / scale,
    ];
}

export function pxToPoints(px: number, dpi: number): number {
    return px * 72 / dpi;
}

export function rotatePoint(x: number, y: number, centerX: number, centerY: number, angleDeg: number): { x: number; y: number } {
    const angleRad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const dx = x - centerX;
    const dy = y - centerY;
    return {
        x: centerX + dx * cos - dy * sin,
        y: centerY + dx * sin + dy * cos,
    };
}

export function rotateBbox(bbox: Bbox, pageSize: PageSize, rotation: number): Bbox {
    if (rotation === 0) return bbox;

    const centerX = pageSize.width / 2;
    const centerY = pageSize.height / 2;

    const points = [
        rotatePoint(bbox[0], bbox[1], centerX, centerY, rotation),
        rotatePoint(bbox[2], bbox[1], centerX, centerY, rotation),
        rotatePoint(bbox[2], bbox[3], centerX, centerY, rotation),
        rotatePoint(bbox[0], bbox[3], centerX, centerY, rotation),
    ];

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);

    return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys),
    ];
}
