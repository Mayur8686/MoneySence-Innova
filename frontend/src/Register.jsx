import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      // Google Authentication
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Firebase ID Token
      const token = await user.getIdToken();

      // Send token to FastAPI
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      const data = await response.json();

      console.log("Backend Response:", data);

      if (!response.ok) {
        alert(data.detail || "Registration Failed");
        setIsLoading(false);
        return;
      }

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-moneta-dark font-sans flex flex-col justify-between p-8 relative overflow-hidden text-white">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-moneta-green/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Back Button */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>

      {/* Main Card */}
      <div className="flex flex-col items-center justify-center max-w-md mx-auto w-full relative z-10">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-moneta-green flex items-center justify-center">
            <div className="w-3 h-3 bg-moneta-dark rounded-full"></div>
          </div>

          <span className="text-2xl font-bold tracking-tight">
            MoneySence
            <span className="text-moneta-green">.</span>
          </span>
        </div>

        <div className="bg-moneta-card border border-gray-800 rounded-3xl p-8 w-full shadow-2xl">

          <h1 className="text-3xl font-bold text-center mb-3">
            Create your account
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Continue securely with your Google account.
          </p>

          <button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 transition disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.2v3.15C3.16 21.39 7.23 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.25c-.25-.72-.38-1.5-.38-2.25s.13-1.53.38-2.25V6.6H1.2C.44 8.14 0 9.87 0 12s.44 3.86 1.2 5.4l4.08-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.16 2.61 1.2 6.6l4.08 3.15c.95-2.84 3.6-4.95 6.72-4.95z"
                  />
                </svg>

                Continue with Google
              </>
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={14} className="text-moneta-green" />
            Secure OAuth 2.0 Authentication
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-moneta-green hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600">
        MoneySence AI Financial Agent · Hackathon Edition
      </div>

    </div>
  );
}