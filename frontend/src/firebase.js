import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCcop_I3bof4ZJm6eeJ_FQmhC2RpG4aWAQ",
  authDomain: "moneysence-4d06d.firebaseapp.com",
  projectId: "moneysence-4d06d",
  storageBucket: "moneysence-4d06d.firebasestorage.app",
  messagingSenderId: "692399977038",
  appId: "1:692399977038:web:24599d89b613501b5c891f",
  measurementId: "G-NH4K6K2DP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth for your Login.jsx file to use!
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();