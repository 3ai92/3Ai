import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const form = formidable();
        const [, files] = await form.parse(req);
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!imageFile) {
            return res.status(400).json({ success: false, error: 'No image file provided' });
        }

        const formData = new FormData();
        formData.append('file', fs.createReadStream(imageFile.filepath), imageFile.originalFilename || 'upload.png');

        const beRes = await fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData as any,
            headers: formData.getHeaders(),
        });

        if (!beRes.ok) {
            const errText = await beRes.text();
            return res.status(500).json({ success: false, error: `Backend error: ${errText}` });
        }

        const beJson = await beRes.json();
        return res.status(200).json(beJson);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        });
    }
}