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

# def get_safe_harbour_value_from_bedrock(text: str) -> str:
#     prompt = f"""
#     Human: Extract the "Safe Harbour value" from the following text. 
#     Respond only with the value in plain text, without any explanation or extra words.

#     Text:
#     {text}

#     Assistant:"""

#     calling_model ={
#     "modelId": "arn:aws:bedrock:us-east-2:992382417943:inference-profile/us.anthropic.claude-3-5-haiku-20241022-v1:0",
#     "contentType": "application/json",
#     "accept": "application/json",
#     "body": json.dumps({
#         "anthropic_version": "bedrock-2023-05-31",
#         "max_tokens": 200,
#         "top_k": 250,
#         "stopSequences": [],
#         "temperature": 1,
#         "top_p": 0.999,
#         "messages": [
#         {
#             "role": "user",
#             "content": [
#             {
#                 "type": "text",
#                 "text": prompt
#             }
#             ]
#         }
#         ]
#     })
#     }
#     response = bedrock_runtime.invoke_model(**calling_model)
#     response_body = json.loads(response['body'].read())
#     return response_body.get("completion", "").strip()

def get_imp_values(text: str) -> str:
    prompt = f"""From the following LLC Operating Agreement, extract exactly one bullet point per category, and make sure each bullet is a single concise line.

Do not include headings, paragraph breaks, or multi-line responses.
Each bullet must be a one-line sentence, under 25 words, with no line breaks.

Extract bullets for:
Safe Harbor Clause

Ownership Limits

Transfer Restrictions

Capital Contributions

Voting Rights

Dissociation and Dissolution

Format :
• [One-line answer]
• [One-line answer]
...


LLC Operating Agreement Text:
{text}
"""
    model_id = "arn:aws:bedrock:us-east-2:992382417943:inference-profile/us.anthropic.claude-3-5-haiku-20241022-v1:0"
    response = bedrock_runtime.invoke_model(
        modelId=model_id,
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 200,
            "temperature": 0.2
        })
    )

    response_body = json.loads(response["body"].read())
    # Claude 3.5 Messages API returns `content` inside an `assistant` message
    return response_body["content"][0]["text"].strip()




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
        get_value = get_imp_values(processed_text)

        return {
            "text": processed_text,
            "safe_harbour_value": get_value
        }

    except Exception as e:
        return {
            "text": f"Error extracting text: {str(e)}",
            "safe_harbour_value": None
        }
