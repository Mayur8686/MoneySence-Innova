import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

is_render = os.environ.get("RENDER") == "true"

if is_render:
    firebase_creds_str = os.environ.get("FIREBASE_CREDENTIALS")
    if not firebase_creds_str:
        raise ValueError("CRITICAL ERROR: Render cannot find the FIREBASE_CREDENTIALS environment variable!")
    cred_dict = json.loads(firebase_creds_str)
    cred = credentials.Certificate(cred_dict)
else:
    if os.path.exists("serviceAccountKey.json"):
        cred = credentials.Certificate("serviceAccountKey.json")
    elif os.path.exists("backend/serviceAccountKey.json"):
        cred = credentials.Certificate("backend/serviceAccountKey.json")
    else:
        raise ValueError("CRITICAL ERROR: Local serviceAccountKey.json file not found!")

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# THIS IS WHAT WAS MISSING:
db = firestore.client()
