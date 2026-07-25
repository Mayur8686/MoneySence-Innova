import io
import json
import os

import pandas as pd
from pypdf import PdfReader
from dotenv import load_dotenv
from google import genai

# Loads GEMINI_API_KEY from backend/.env
load_dotenv()

_client = None


def _get_client():
    """Lazily create the Gemini client so importing this module never fails
    just because the API key isn't set yet."""
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY is not set. Add it to backend/.env before uploading."
            )
        _client = genai.Client(api_key=api_key)
    return _client


def extract_text_from_file(filename: str, content: bytes) -> str:
    """Pulls raw text out of a CSV, TXT, or PDF statement."""
    lower = filename.lower()

    if lower.endswith(".csv") or lower.endswith(".txt"):
        df = pd.read_csv(io.BytesIO(content))
        return df.to_string()

    if lower.endswith(".pdf"):
        pdf = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf.pages:
            text += (page.extract_text() or "") + "\n"
        return text

    raise ValueError("Unsupported file format. Please upload a CSV, TXT, or PDF file.")


def analyze_statement(filename: str, content: bytes) -> dict:
    """Sends statement text to Gemini and returns structured transaction data:
    { "transactions": [...], "subscriptions": [...], "health_score": int }
    """
    extracted_text = extract_text_from_file(filename, content)

    prompt = f"""
    You are an expert FinTech AI. Analyze this bank statement.
    1. Extract transactions (date, description, amount, type: credit/debit).
    2. Categorize them (e.g., Food, Rent, Salary, Entertainment, Shopping, Utilities, Transport).
    3. Detect recurring subscriptions.
    4. Calculate a basic financial health score (0-100).

    Return the result STRICTLY as a valid JSON object with exactly these keys:
    "transactions", "subscriptions", "health_score". Do not include Markdown formatting like ```json.

    Raw Data:
    {extracted_text[:10000]}
    """

    client = _get_client()
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt,
    )

    cleaned = response.text.replace("```json", "").replace("```", "").strip()
    return json.loads(cleaned)
