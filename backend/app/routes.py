from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from app.auth import verify_google_token
from app.firebase import db
from app.csv_parser import parse_csv
from app.database import save_transactions
import os
from app.database import get_dashboard
from app.database import get_dashboard, get_transactions
from app.database import save_statement_data, get_latest_statement
from app import ai_parser

router = APIRouter()


class LoginRequest(BaseModel):
    token: str


@router.post("/login")
def login(data: LoginRequest):
    print("Received token:", data.token[:40], "...")
    return verify_google_token(data.token)


@router.post("/register")
def register(data: LoginRequest):

    user = verify_google_token(data.token)

    db.collection("users").document(user["uid"]).set(
        {
            "uid": user["uid"],
            "name": user.get("name"),
            "email": user.get("email"),
            "picture": user.get("picture"),
        },
        merge=True,
    )

    return {
        "message": "User Registered Successfully",
        "user": user,
    }


@router.post("/upload/csv")
async def upload_csv(
    uid: str = Form(...),
    file: UploadFile = File(...)
):

    os.makedirs("uploads", exist_ok=True)

    filepath = os.path.join("uploads", file.filename)

    with open(filepath, "wb") as f:
        contents = await file.read()
        f.write(contents)

    transactions = parse_csv(filepath)

    count = save_transactions(uid, transactions)

    return {
        "success": True,
        "saved": count,
    }
    
@router.get("/dashboard")
def dashboard(uid: str):

    return get_dashboard(uid)

@router.get("/transactions")
def transactions(uid: str):
    return get_transactions(uid)


# ---------------- AI-POWERED UPLOAD + DASHBOARD ---------------- #
# New endpoints for the Gemini AI upload/dashboard feature. These are additive:
# they don't touch /upload/csv, /dashboard, or /transactions above, so anything
# already relying on those keeps working exactly as before.

@router.post("/api/upload")
async def ai_upload_statement(
    uid: str = Form(...),
    file: UploadFile = File(...),
):
    content = await file.read()

    try:
        ai_data = ai_parser.analyze_statement(file.filename, content)
    except Exception as e:
        return {"error": str(e)}

    # Save the full AI result (transactions, subscriptions, health_score) for
    # this specific logged-in user, used by the new AI dashboard.
    firebase_id = save_statement_data(uid, ai_data)

    # Also mirror the transactions into the existing flat collection so the
    # older /transactions and /dashboard endpoints keep working unchanged.
    try:
        legacy_transactions = [
            {
                "date": tx.get("date", ""),
                "amount": float(tx.get("amount", 0) or 0),
                "merchant": tx.get("description", "Unknown"),
                "paymentType": tx.get("category", "Unknown"),
                "type": str(tx.get("type", "Debit")).strip().title(),
            }
            for tx in ai_data.get("transactions", [])
        ]
        if legacy_transactions:
            save_transactions(uid, legacy_transactions)
    except Exception as e:
        print("Warning: could not mirror transactions to legacy collection:", e)

    return {
        "filename": file.filename,
        "status": "success",
        "data": ai_data,
        "firebase_id": firebase_id,
    }


@router.get("/api/dashboard/{uid}")
def ai_dashboard(uid: str):
    data = get_latest_statement(uid)
    if data:
        return {"status": "success", "data": data}
    return {"status": "empty", "error": "No AI statement data found for this user yet."}

from app.firebase import db
from fastapi import Body

# ---------------- GET PROFILE ---------------- #

@router.get("/profile")
def get_profile(uid: str):

    doc = db.collection("users").document(uid).get()

    if not doc.exists:
        return {"error": "User not found"}

    return doc.to_dict()


# ---------------- UPDATE PROFILE ---------------- #

@router.put("/profile")
def update_profile(data: dict = Body(...)):

    uid = data["uid"]

    db.collection("users").document(uid).update({

        "name": data["name"],
        "phone": data["phone"],
        "city": data["city"],
        "accountType": data["accountType"]

    })

    return {
        "success": True
    }