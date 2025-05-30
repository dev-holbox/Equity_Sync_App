from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from io import BytesIO
import boto3
import json
import os

app = FastAPI()

# Enable CORS for frontend (adjust origin as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change if using another frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Bedrock client
bedrock_runtime = boto3.client("bedrock-runtime", region_name="us-east-2")

def get_safe_harbour_value_from_bedrock(text: str) -> str:
    prompt = f"""
    Human: Extract the "Safe Harbour value" from the following text. 
    Respond only with the value in plain text, without any explanation or extra words.

    Text:
    {text}

    Assistant:"""

    response = bedrock_runtime.invoke_model(
        modelId="anthropic.claude-3-sonnet-20240229",
        body=json.dumps({
            "prompt": prompt,
            "max_tokens_to_sample": 300,
            "temperature": 0.2,
        }),
        contentType="application/json",
        accept="application/json",
    )

    response_body = json.loads(response['body'].read())
    return response_body.get("completion", "").strip()

@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        reader = PdfReader(BytesIO(contents))
        full_text = ""

        for page in reader.pages:
            full_text += page.extract_text() or ""

        # Clean up the text
        processed_text = full_text.replace("\n", " ").strip()

        # Get Safe Harbour value from Claude
        safe_harbour_value = get_safe_harbour_value_from_bedrock(processed_text)

        return {
            "text": processed_text,
            "safe_harbour_value": safe_harbour_value
        }

    except Exception as e:
        return {
            "text": f"Error extracting text: {str(e)}",
            "safe_harbour_value": None
        }


#  Old code Working-----------------------------

# from fastapi import FastAPI, File, UploadFile
# from fastapi.middleware.cors import CORSMiddleware
# from PyPDF2 import PdfReader
# from io import BytesIO

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Adjust if needed
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/extract-text")
# async def extract_text(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         reader = PdfReader(BytesIO(contents))
#         full_text = ""

#         for page in reader.pages:
#             full_text += page.extract_text() or ""

#         # Manipulate text if needed
#         processed_text = full_text.replace("\n", " ").strip()

#         return {"text": processed_text}
#     except Exception as e:
#         return {"text": f"Error extracting text: {str(e)}"}

