from app.firebase import db
from firebase_admin import firestore


# ---------------- AI STATEMENT STORAGE (used by /api/upload + /api/dashboard) ---------------- #

def save_statement_data(uid, ai_data):
    """Saves a Gemini-parsed statement (transactions, subscriptions, health_score)
    under this user's own profile, timestamped so we can always fetch the latest one."""
    doc_ref = (
        db.collection("users")
        .document(uid)
        .collection("statements")
        .document()
    )

    payload = {
        **ai_data,
        "created_at": firestore.SERVER_TIMESTAMP,
    }

    doc_ref.set(payload)
    return doc_ref.id


def get_latest_statement(uid):
    """Fetches the most recently uploaded AI-parsed statement for this user."""
    docs = (
        db.collection("users")
        .document(uid)
        .collection("statements")
        .order_by("created_at", direction=firestore.Query.DESCENDING)
        .limit(1)
        .stream()
    )

    for doc in docs:
        data = doc.to_dict()
        data.pop("created_at", None)
        return data

    return None


def save_transactions(uid, transactions):
    records = (
        db.collection("transactions")
        .document(uid)
        .collection("records")
    )

    for tx in transactions:
        records.add(tx)

    return len(transactions)


def get_transactions(uid):
    docs = (
        db.collection("transactions")
        .document(uid)
        .collection("records")
        .stream()
    )

    transactions = []

    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        transactions.append(data)

    return transactions


def get_dashboard(uid):

    transactions = get_transactions(uid)

    total_income = 0
    total_expense = 0

    merchants = {}

    for tx in transactions:

        amount = float(tx.get("amount", 0))

        if tx.get("type", "").lower() == "credit":
            total_income += amount
        else:
            total_expense += amount

        merchant = tx.get("merchant", "Unknown")

        merchants[merchant] = merchants.get(merchant, 0) + amount

    balance = total_income - total_expense

    top_merchant = "N/A"

    if merchants:
        top_merchant = max(merchants, key=merchants.get)

    return {
        "transactions": len(transactions),
        "income": total_income,
        "expense": total_expense,
        "balance": balance,
        "topMerchant": top_merchant
    }