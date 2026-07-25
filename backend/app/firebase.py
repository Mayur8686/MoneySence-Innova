import os
import json
import firebase_admin
from firebase_admin import credentials

# 1. Look for the secret in Render's environment variables
firebase_creds = os.environ.get("FIREBASE_CREDENTIALS")

# 2. Safely figure out which method to use
if firebase_creds:
    print("SUCCESS: Found FIREBASE_CREDENTIALS environment variable!")
    cred_dict = json.loads(firebase_creds)
    cred = credentials.Certificate(cred_dict)
else:
    print("WARNING: Environment variable not found. Looking for physical file...")
    # Make sure we only try to open the file if it actually exists on the computer
    if os.path.exists("serviceAccountKey.json"):
        cred = credentials.Certificate("serviceAccountKey.json")
    elif os.path.exists("backend/serviceAccountKey.json"):
        cred = credentials.Certificate("backend/serviceAccountKey.json")
    else:
        raise ValueError("CRITICAL ERROR: No environment variable found, and no local serviceAccountKey.json file found!")

# 3. Initialize Firebase
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
