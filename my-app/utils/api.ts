// API utility functions for document processing

export interface UploadResponse {
    success: boolean;
    data?: {
        documentId: string;
        pages: Array<{
            pageIndex: number;
            pageSize: { width: number; height: number };
            dpi: number;
            rotation: number;
            imageUrl?: string;
            pdfUrl?: string;
            elements: Array<{
                id: string;
                role: string;
                type: string;
                bbox: [number, number, number, number];
                text?: string;
                confidence?: number;
                field_name?: string;
                imageUrl?: string;
                elements?: any[];
            }>;
        }>;
    };
    error?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('image', file);
        formData.append('documentType', 'resume');
        formData.append('language', 'ja');

        // Make API call
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
};

export const processDocument = async (documentId: string): Promise<UploadResponse> => {
    try {
        const response = await fetch(`/api/process/${documentId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Process error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Processing failed'
        };
    }
};

export const saveDocument = async (documentId: string, data: any): Promise<UploadResponse> => {
    try {
        const response = await fetch(`/api/save/${documentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Save error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Save failed'
        };
    }
};
