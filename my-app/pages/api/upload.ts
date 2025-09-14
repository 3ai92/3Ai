import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
        const form = formidable({
            uploadDir: './public/uploads',
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024, // 10MB
        });

        const uploadDir = './public/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const [fields, files] = await form.parse(req);
        
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
        
        if (!imageFile) {
            return res.status(400).json({ success: false, error: 'No image file provided' });
        }

        const documentId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const mockResponse = {
            success: true,
            data: {
                documentId,
                pages: [
                    {
                        pageIndex: 0,
                        pageSize: { width: 2480, height: 3508 },
                        dpi: 300,
                        rotation: 0,
                        background: `white`,
                        elements: [
                            {
                              id: 'header',
                              role: 'label',
                              type: 'text',
                              bbox: [1000, 150, 1480, 250] as [number, number, number, number],
                              text: '履歴書',
                              confidence: 0.95,
                            },
                            
                            {
                              id: 'photo',
                              role: 'image',
                              type: 'image',
                              bbox: [1900, 200, 2300, 500] as [number, number, number, number],
                              imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmZmZmZmYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5Qcm9maWxlIFBob3RvPC90ZXh0Pjwvc3ZnPg==',
                              confidence: 0.9,
                            },
                            
                            {
                              id: 'name_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 400, 500, 450] as [number, number, number, number],
                              text: '氏名',
                              confidence: 0.95,
                            },
                            {
                              id: 'name',
                              role: 'field',
                              field_name: '氏名',
                              type: 'text',
                              bbox: [600, 400, 1400, 450] as [number, number, number, number],
                              text: '山田 太郎',
                              confidence: 0.85,
                            },
                            
                            // Birthdate label
                            {
                              id: 'birthdate_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 500, 500, 550] as [number, number, number, number],
                              text: '生年月日',
                              confidence: 0.95,
                            },
                            // Birthdate field
                            {
                              id: 'birthdate',
                              role: 'field',
                              field_name: '生年月日',
                              type: 'date',
                              bbox: [600, 500, 1000, 550] as [number, number, number, number],
                              text: '',
                              confidence: 0.92,
                            },
                            
                            // Address label
                            {
                              id: 'address_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 600, 500, 650] as [number, number, number, number],
                              text: '住所',
                              confidence: 0.95,
                            },
                            // Address field
                            {
                              id: 'address',
                              role: 'field',
                              field_name: '住所',
                              type: 'text',
                              bbox: [600, 600, 1800, 650] as [number, number, number, number],
                              text: '〒150-0002 東京都渋谷区渋谷1-2-3 マンションABC 101号室',
                              confidence: 0.85,
                            },
                            
                            // Phone label
                            {
                              id: 'phone_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 700, 500, 750] as [number, number, number, number],
                              text: '電話番号',
                              confidence: 0.95,
                            },
                            // Phone field
                            {
                              id: 'phone',
                              role: 'field',
                              field_name: '電話番号',
                              type: 'text',
                              bbox: [600, 700, 1000, 750] as [number, number, number, number],
                              text: '03-1234-5678',
                              confidence: 0.88,
                            },
                            
                            // Email label
                            {
                              id: 'email_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 800, 500, 850] as [number, number, number, number],
                              text: 'メールアドレス',
                              confidence: 0.95,
                            },
                            // Email field
                            {
                              id: 'email',
                              role: 'field',
                              field_name: 'メールアドレス',
                              type: 'text',
                              bbox: [600, 800, 1400, 850] as [number, number, number, number],
                              text: 'yamada.taro@example.com',
                              confidence: 0.9,
                            },
                            
                            // Education Section Header
                            {
                              id: 'education_header',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 950, 600, 1000] as [number, number, number, number],
                              text: '学歴',
                              confidence: 0.95,
                            },
                            
                            // Education Table
                            {
                              id: 'education_table',
                              role: 'table',
                              type: 'table',
                              bbox: [300, 1050, 2200, 1300] as [number, number, number, number],
                              elements: [
                                // Headers
                                {
                                  id: 'edu_header_date',
                                  role: 'label',
                                  type: 'text',
                                  bbox: [300, 1050, 800, 1100] as [number, number, number, number],
                                  text: '年月',
                                  confidence: 0.9,
                                },
                                {
                                  id: 'edu_header_school',
                                  role: 'label',
                                  type: 'text',
                                  bbox: [850, 1050, 2200, 1100] as [number, number, number, number],
                                  text: '学校名・学部学科',
                                  confidence: 0.9,
                                },
                                // Row 1
                                {
                                  id: 'edu_date1',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [300, 1120, 800, 1170] as [number, number, number, number],
                                  text: '2013年4月',
                                  confidence: 0.85,
                                },
                                {
                                  id: 'edu_school1',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [850, 1120, 2200, 1170] as [number, number, number, number],
                                  text: '早稲田大学 理工学部 情報理工学科 入学',
                                  confidence: 0.88,
                                },
                                // Row 2
                                {
                                  id: 'edu_date2',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [300, 1190, 800, 1240] as [number, number, number, number],
                                  text: '2017年3月',
                                  confidence: 0.85,
                                },
                                {
                                  id: 'edu_school2',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [850, 1190, 2200, 1240] as [number, number, number, number],
                                  text: '早稲田大学 理工学部 情報理工学科 卒業',
                                  confidence: 0.88,
                                },
                              ],
                              confidence: 0.9,
                            },
                            
                            // Work Experience Section Header
                            {
                              id: 'work_header',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 1400, 600, 1450] as [number, number, number, number],
                              text: '職歴',
                              confidence: 0.95,
                            },
                            
                            // Work Experience Table
                            {
                              id: 'work_table',
                              role: 'table',
                              type: 'table',
                              bbox: [300, 1500, 2200, 2000] as [number, number, number, number],
                              elements: [
                                // Headers
                                {
                                  id: 'work_header_date',
                                  role: 'label',
                                  type: 'text',
                                  bbox: [300, 1500, 800, 1550] as [number, number, number, number],
                                  text: '年月',
                                  confidence: 0.9,
                                },
                                {
                                  id: 'work_header_company',
                                  role: 'label',
                                  type: 'text',
                                  bbox: [850, 1500, 1400, 1550] as [number, number, number, number],
                                  text: '会社名',
                                  confidence: 0.9,
                                },
                                {
                                  id: 'work_header_role',
                                  role: 'label',
                                  type: 'text',
                                  bbox: [1450, 1500, 2200, 1550] as [number, number, number, number],
                                  text: '職務内容',
                                  confidence: 0.9,
                                },
                                // Row 1
                                {
                                  id: 'work_date1',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [300, 1570, 800, 1620] as [number, number, number, number],
                                  text: '2017年4月',
                                  confidence: 0.85,
                                },
                                {
                                  id: 'work_company1',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [850, 1570, 1400, 1620] as [number, number, number, number],
                                  text: '株式会社テックソリューション',
                                  confidence: 0.88,
                                },
                                {
                                  id: 'work_role1',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [1450, 1570, 2200, 1620] as [number, number, number, number],
                                  text: 'システムエンジニア',
                                  confidence: 0.9,
                                },
                                // Row 2
                                {
                                  id: 'work_date2',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [300, 1640, 800, 1690] as [number, number, number, number],
                                  text: '2020年4月',
                                  confidence: 0.85,
                                },
                                {
                                  id: 'work_company2',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [850, 1640, 1400, 1690] as [number, number, number, number],
                                  text: '株式会社イノベーション',
                                  confidence: 0.88,
                                },
                                {
                                  id: 'work_role2',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [1450, 1640, 2200, 1690] as [number, number, number, number],
                                  text: 'シニアエンジニア',
                                  confidence: 0.9,
                                },
                                // Row 3
                                {
                                  id: 'work_date3',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [300, 1710, 800, 1760] as [number, number, number, number],
                                  text: '2023年4月',
                                  confidence: 0.85,
                                },
                                {
                                  id: 'work_company3',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [850, 1710, 1400, 1760] as [number, number, number, number],
                                  text: '株式会社デジタルフューチャー',
                                  confidence: 0.88,
                                },
                                {
                                  id: 'work_role3',
                                  role: 'field',
                                  type: 'text',
                                  bbox: [1450, 1710, 2200, 1760] as [number, number, number, number],
                                  text: 'テックリード',
                                  confidence: 0.9,
                                },
                              ],
                              confidence: 0.85,
                            },
                            
                            // Skills Section
                            {
                              id: 'skills_header',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 2100, 600, 2150] as [number, number, number, number],
                              text: 'スキル',
                              confidence: 0.95,
                            },
                            {
                              id: 'skills',
                              role: 'field',
                              field_name: 'スキル',
                              type: 'textarea',
                              bbox: [300, 2180, 2200, 2350] as [number, number, number, number],
                              text: 'プログラミング言語: Java, Python, JavaScript, TypeScript\nフレームワーク: Spring Boot, React, Vue.js\nデータベース: MySQL, PostgreSQL, MongoDB\nクラウド: AWS, Azure\nその他: Docker, Kubernetes, Git',
                              confidence: 0.75, // < 0.9 để test border đỏ
                            },
                            
                            // Signature and Date
                            {
                              id: 'signature_label',
                              role: 'label',
                              type: 'text',
                              bbox: [300, 2500, 500, 2550] as [number, number, number, number],
                              text: '署名',
                              confidence: 0.95,
                            },
                            {
                              id: 'signature',
                              role: 'signature',
                              type: 'signature',
                              bbox: [600, 2500, 1200, 2600] as [number, number, number, number],
                              imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDYwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmZmZmYiLz48dGV4dCB4PSIzMDAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlNpZ25hdHVyZTwvdGV4dD48L3N2Zz4=',
                              confidence: 0.7, // < 0.9 để test border đỏ
                            },
                            {
                              id: 'date_label',
                              role: 'label',
                              type: 'text',
                              bbox: [1500, 2500, 1700, 2550] as [number, number, number, number],
                              text: '日付',
                              confidence: 0.95,
                            },
                            {
                              id: 'date',
                              role: 'field',
                              field_name: '日付',
                              type: 'date',
                              bbox: [1800, 2500, 2200, 2550] as [number, number, number, number],
                              text: '',
                              confidence: 0.9,
                            },
                          ],
                    },
                ],
            },
        };

        res.status(200).json(mockResponse);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Upload failed' 
        });
    }
}
