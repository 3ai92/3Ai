'use client';

import React, { useCallback, useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps, UploadFile } from 'antd';

interface ImageUploadProps {
    onUpload: (file: File, imageUrl: string) => void;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, disabled = false }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleUpload = useCallback((file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Only image files are accepted!');
            return false;
        }

        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('File must be smaller than 10MB!');
            return false;
        }

        const imageUrl = URL.createObjectURL(file);
        onUpload(file, imageUrl);

        setFileList([{
            uid: file.name,
            name: file.name,
            status: 'done',
            url: imageUrl,
        }]);

        message.success(`${file.name} uploaded successfully!`);
        return false;
    }, [onUpload]);

    const handleRemove = useCallback(() => {
        setFileList([]);
    }, []);

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        fileList,
        beforeUpload: handleUpload,
        onRemove: handleRemove,
        accept: 'image/*',
        disabled,
        showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: false,
        },
    };

    return (
        <Upload.Dragger {...uploadProps} style={{ width: '100%' }}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Drag and drop image files here or click to select
            </p>
            <p className="ant-upload-hint">
                Only JPG, PNG, GIF files accepted. Maximum 10MB.
            </p>
        </Upload.Dragger>
    );
};

export default ImageUpload;
