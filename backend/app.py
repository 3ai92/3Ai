# -*- encoding: utf-8 -*-
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import uvicorn
import numpy as np
import uuid
from rapidocr.main import RapidOCR
from rapidocr.utils.to_json import to_json
from rapidocr.utils.to_markdown import to_markdown
from rapidocr.utils import VisRes
import cv2
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/output", StaticFiles(directory="output"), name="output")
app.mount("/web", StaticFiles(directory="web"), name="web")

OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(exist_ok=True)

ocr_engine = RapidOCR()


@app.post("/ocr")
async def ocr_api(
    file: UploadFile = File(...),
    return_vis: bool = Form(False),
    return_json: bool = Form(True),
    return_markdown: bool = Form(False)
):
    file_id = str(uuid.uuid4())
    input_path = OUTPUT_DIR / f"{file_id}_input.png"
    with input_path.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    # Run OCR
    result = ocr_engine(str(input_path))

    output = {}
    if return_json:
        json_path = OUTPUT_DIR / f"{file_id}_output.json"
        json_str = to_json(result)
        with json_path.open("w", encoding="utf-8") as f:
            f.write(json_str)
        output["json_path"] = f"/output/{json_path.name}"
        output["json"] = json_str
    if return_markdown:
        md_path = OUTPUT_DIR / f"{file_id}_output.md"
        markdown_str = to_markdown(result)
        with md_path.open("w", encoding="utf-8") as f:
            f.write(markdown_str)
        output["markdown_path"] = f"/output/{md_path.name}"
        output["markdown"] = markdown_str
    if return_vis:
        vis = VisRes(text_score=0.5, font_path=None, lang_type=None)
        vis_img = vis(str(input_path), result.boxes, result.txts, result.scores)
        vis_path = OUTPUT_DIR / f"{file_id}_vis.png"
        cv2.imwrite(str(vis_path), vis_img)
        output["vis_img_path"] = f"/output/{vis_path.name}"
    return JSONResponse(content=output)


@app.get("/")
def root():
    index_path = Path("web/index.html")
    if index_path.exists():
        with index_path.open("r", encoding="utf-8") as f:
            html_content = f.read()
        return HTMLResponse(html_content)
    else:
        return HTMLResponse("<h2>index.html not found</h2>", status_code=404)

if __name__ == "__main__":
    uvicorn.run("fastapi_app:app", host="0.0.0.0", port=8000, reload=True)
