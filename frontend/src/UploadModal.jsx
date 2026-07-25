import { useState, useRef } from 'react';
import { UploadCloud, FileText, X, Database, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UploadModal({ isOpen, onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [aiResult, setAiResult] = useState(null);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Reset state when closing the modal
  const handleCloseModal = () => {
    setUploadStatus(null);
    setAiResult(null);
    setErrorMessage("");
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Safe helper to load a properly formatted demo dataset
  const handleLoadDemo = async () => {
    const demoCsvContent = `Date,Description,Amount,Type\n2026-09-02,Salary Credited,75000.00,Credit\n2026-09-03,Apartment Rent,18000.00,Debit\n2026-09-05,Groceries Store,3200.00,Debit\n2026-09-10,Electricity Bill,1450.00,Debit\n2026-09-15,Dining Out,1850.00,Debit\n2026-09-20,Mutual Fund Investment,5000.00,Debit`;
    const demoFile = new File([demoCsvContent], "demo_statement.csv", { type: "text/csv" });
    processFile(demoFile);
  };

  // --- THE REAL API CONNECTION WITH INSTANT SYNC ---
  const processFile = async (file) => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      setErrorMessage("Please login first.");
      setUploadStatus('error');
      return;
    }

    setUploadStatus('processing');
    setErrorMessage("");
    setAiResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uid", uid);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process statement");

      const resultData = await response.json();
      console.log("Gemini AI Response:", resultData);

      if (resultData.error) throw new Error(resultData.error);

      const parsedData = resultData.data;
      setAiResult(parsedData);
      setUploadStatus('success');

      // --- INSTANT GLOBAL SYNC TRIGGER ---
      // Broadcast event so all active page components fetch fresh data instantly
      window.dispatchEvent(new Event('moneta_data_updated'));

    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Failed to connect to the AI engine. Is the FastAPI backend running?");
      setUploadStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-moneta-card border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">

        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Import Transactions</h2>
            <p className="text-gray-400 text-sm">Upload your bank statement to let the AI organize your spending.</p>
          </div>

          {/* SUCCESS STATE */}
          {uploadStatus === 'success' && aiResult ? (
            <div className="mt-2 bg-moneta-green/10 border border-moneta-green/30 p-6 rounded-2xl flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-moneta-green/20 rounded-full flex items-center justify-center text-moneta-green">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Analysis Complete!</h3>
                <p className="text-moneta-green text-sm">Successfully categorized {aiResult.transactions?.length || 0} transactions and updated your dashboard.</p>
              </div>

              {/* Temporary JSON view to prove it works */}
              <div className="w-full bg-[#0b1317] p-4 rounded-xl border border-gray-800 overflow-x-auto max-h-40 text-left mt-2">
                <pre className="text-xs text-gray-400 font-mono">
                  {JSON.stringify(aiResult, null, 2)}
                </pre>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-full mt-4 bg-moneta-green text-[#0b1317] hover:bg-emerald-400 font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                View Dashboard Updates
              </button>
            </div>
          ) : (
            /* UPLOAD & PROCESSING STATE */
            <>
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv, .pdf, .txt"
                className="hidden"
              />

              {/* Drag & Drop Zone (Now Clickable!) */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer text-center mb-6
                  ${isDragging
                    ? 'border-moneta-green bg-moneta-green/5'
                    : 'border-gray-700 bg-[#0f171a] hover:border-gray-500'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-moneta-green/20 text-moneta-green' : 'bg-gray-800 text-gray-400'}`}>
                  <UploadCloud size={24} />
                </div>
                <p className="text-white font-semibold text-sm mb-1">Drag and drop or click to upload</p>
                <p className="text-gray-500 text-xs mb-4">Supports CSV, TXT, and PDF formats up to 10MB</p>

                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-400"><FileSpreadsheet size={14}/> CSV / TXT</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><FileText size={14}/> PDF</span>
                </div>
              </div>

              {/* Status Feedback */}
              {uploadStatus === 'processing' && (
                <div className="mb-6 bg-blue-900/20 border border-blue-800 text-blue-300 p-4 rounded-xl flex items-center gap-3 text-sm animate-pulse">
                  <Loader2 size={18} className="animate-spin shrink-0" />
                  Gemini AI is parsing and categorizing transactions...
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mb-6 bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle size={18} className="shrink-0" />
                  {errorMessage}
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Or</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              {/* Fallback Demo Button */}
              <button
                onClick={handleLoadDemo}
                disabled={uploadStatus === 'processing'}
                className="w-full bg-[#1b252a] hover:bg-gray-800 border border-gray-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Database size={16} className="text-moneta-green" />
                Load Demo Dataset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
