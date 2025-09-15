# 3Ai - Intelligent Document Processing Platform

A full-stack web application that combines OCR (Optical Character Recognition) technology with interactive document annotation capabilities. The platform allows users to upload images or documents, automatically extract text using PaddleOCR, and create interactive form overlays for data extraction and annotation.

## 🚀 Features

- **Advanced OCR Processing**: Powered by PaddleOCR with RapidOCR integration for accurate text recognition
- **Interactive Document Viewer**: Real-time document annotation with overlay system
- **Form Field Creation**: Dynamic form field placement and data extraction
- **Multi-format Support**: Handles images and documents with visualization capabilities
- **Responsive UI**: Modern web interface built with Next.js and Ant Design
- **API Integration**: RESTful API for OCR processing and document management

## 🏗️ Architecture

### Backend (`/backend`)
- **FastAPI** server with CORS support
- **PaddleOCR** integration for text extraction
- **OpenCV** for image processing
- **ONNX Runtime** for model inference
- File upload and processing endpoints

### Frontend (`/my-app`)
- **Next.js** React application with TypeScript
- **Ant Design** for UI components
- **Konva.js** for interactive canvas operations
- **PDF.js** for document rendering
- Responsive design with sidebar navigation

## 🛠️ Tech Stack

**Backend:**
- Python 3.x
- FastAPI
- PaddleOCR
- OpenCV
- ONNX Runtime
- Uvicorn

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Ant Design
- Konva.js
- PDF.js

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python3 -m uvicorn app:app --reload
```

### Frontend Setup

```bash
cd my-app

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🚀 Usage

### CLI Usage (Backend)
```bash
# Run OCR on an image
python3 -m rapidocr.main -img test.png -vis
```

### Web Interface
1. Start both backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Upload an image or document
4. View OCR results and create interactive annotations
5. Export processed data in JSON or Markdown format

### API Endpoints

- `POST /ocr` - Process image with OCR
- `POST /upload` - Upload and process document
- `GET /` - Serve web interface

## 📁 Project Structure

```
3Ai/
├── backend/                 # FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── rapidocr/           # OCR processing modules
│   ├── output/             # Generated files
│   └── web/                # Static web files
├── my-app/                 # Next.js frontend
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript definitions
└── README.md
```

## 🔧 Configuration

The application uses default OCR models from PaddleOCR. Models are automatically downloaded on first run.

## 📄 License

This project is based on [RapidAI/PaddleOCRModelConvert](https://github.com/RapidAI/PaddleOCRModelConvert).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Tags:** `ocr`, `document-processing`, `paddleocr`, `fastapi`, `nextjs`, `react`, `typescript`, `text-extraction`, `document-annotation`, `form-builder`, `rapidocr`, `computer-vision`, `ai`, `machine-learning`
