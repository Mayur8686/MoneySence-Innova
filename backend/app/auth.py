from firebase_admin import auth
from fastapi import HTTPException
import traceback

def verify_google_token(id_token):
    try:
        decoded = auth.verify_id_token(id_token)

        return {
            "uid": decoded["uid"],
            "email": decoded.get("email"),
            "name": decoded.get("name"),
            "picture": decoded.get("picture")
        }

    except Exception as e:
        traceback.print_exc()
        print("Firebase Error:", e)
        raise HTTPException(status_code=401, detail=str(e))