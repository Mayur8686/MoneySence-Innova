import os
import json
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

load_dotenv()

# Render automatically sets this to "true" in production
is_render = os.environ.get("RENDER") == "true"

if is_render:
    # WE ARE ON RENDER: Strictly use the environment variable
    firebase_creds_str = os.environ.get("FIREBASE_CREDENTIALS")
    
    if not firebase_creds_str:
        raise ValueError("CRITICAL ERROR: Render cannot find the FIREBASE_CREDENTIALS environment variable! Check your Render dashboard.")
    
    try:
        cred_dict = json.loads(firebase_creds_str)
        cred = credentials.Certificate(cred_dict)
    except Exception as e:
        raise ValueError(f"CRITICAL ERROR: The FIREBASE_CREDENTIALS value on Render is not formatted as valid JSON. Error: {e}")

else:
    # WE ARE LOCAL: Safely use the physical file
    print("Running locally. Using physical serviceAccountKey.json file.")
    if os.path.exists("serviceAccountKey.json"):
        cred = credentials.Certificate("serviceAccountKey.json")
    elif os.path.exists("backend/serviceAccountKey.json"):
        cred = credentials.Certificate("backend/serviceAccountKey.json")
    else:
        raise ValueError("CRITICAL ERROR: Local serviceAccountKey.json file not found!")

# Initialize Firebase
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
