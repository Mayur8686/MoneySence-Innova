from firebase import db

doc_ref = db.collection("test").document("hello")

doc_ref.set({
    "message": "Firestore Connected Successfully!"
})

print("✅ Firestore Connected")