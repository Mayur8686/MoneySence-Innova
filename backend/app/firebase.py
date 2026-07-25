import os
import json
import firebase_admin
from firebase_admin import credentials

# 1. Look for the secret in Render's environment variables
firebase_creds = os.environ.get("FIREBASE_CREDENTIALS")

if firebase_creds:
    # 2. If it exists (on Render), convert the string into a dictionary
    cred_dict = json.loads(firebase_creds)
    cred = credentials.Certificate(cred_dict)
else:
    # 3. If it doesn't exist (on your local computer), use the physical file
    cred = credentials.Certificate("serviceAccountKey.json")

# Initialize Firebase (make sure this line matches what you already had)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
