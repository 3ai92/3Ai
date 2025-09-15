'use client';

import React, { useState } from 'react';
import { Card } from 'antd';
import ImageUpload from './ImageUpload';
import { SidebarHeader, NavigationTools, CollapsedTools, ImagePreview } from './nav';

interface SidebarProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onImageUpload: (file: File, imageUrl: string) => void;
    onCollapsedChange?: (collapsed: boolean) => void;
    uploadedImageUrl?: string;
    uploadedFileName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    onZoomIn,
    onZoomOut,
    onImageUpload,
    onCollapsedChange,
    uploadedImageUrl,
    uploadedFileName,
}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        onCollapsedChange?.(newCollapsed);
    };

    return (
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: collapsed ? 50 : 300,
            background: '#f8f8f8',
            borderRight: '1px solid #d9d9d9',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s ease',
            zIndex: 1000,
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}>
            <SidebarHeader collapsed={collapsed} onToggle={toggleCollapsed} />

            <div style={{
                flex: 1,
                padding: collapsed ? '16px 8px' : '16px',
                overflow: 'auto'
            }}>
                {!collapsed && (
                    <>
                        <ImagePreview 
                            imageUrl={uploadedImageUrl}
                            fileName={uploadedFileName}
                        />
                        <Card
                            size="small"
                            styles={{
                                body: { padding: '12px' }
                            }}
                        >
                            <ImageUpload onUpload={onImageUpload} />
                        </Card>
                        <NavigationTools
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrev={onPrev}
                            onNext={onNext}
                            onZoomIn={onZoomIn}
                            onZoomOut={onZoomOut}
                        />
                    </>
                )}

                {collapsed && (
                    <CollapsedTools
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={onPrev}
                        onNext={onNext}
                        onZoomIn={onZoomIn}
                        onZoomOut={onZoomOut}
                        onImageUpload={onImageUpload}
                    />
                )}
            </div>
        </div>
    );
};

export default Sidebar;
