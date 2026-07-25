import { useState, useRef } from 'react';
import { Sidebar } from './Transactions';
import { UploadCloud, FileText, Database, FileSpreadsheet, Bell, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function UploadStatement() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [aiResult, setAiResult] = useState(null);

  // Reference for the hidden file input
  const fileInputRef = useRef(null);

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
      const response = await fetch("https://moneysence-innova.onrender.com/api/upload", {
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
      window.dispatchEvent(new Event('moneta_data_updated'));

    } catch (err) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "Failed to connect to the AI engine. Is the FastAPI backend running?");
      setUploadStatus('error');
    }
  };

  // Demo fallback that safely uploads a standard mock CSV dataset to FastAPI
  const handleDemoLoad = async () => {
    const demoCsvContent = `Date,Description,Amount,Type\n2026-09-02,Salary Credited,75000.00,Credit\n2026-09-03,Apartment Rent,18000.00,Debit\n2026-09-05,Groceries Store,3200.00,Debit\n2026-09-10,Electricity Bill,1450.00,Debit\n2026-09-15,Dining Out,1850.00,Debit\n2026-09-20,Mutual Fund Investment,5000.00,Debit`;
    const demoFile = new File([demoCsvContent], "demo_statement.csv", { type: "text/csv" });
    processFile(demoFile);
  };

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="upload" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Statement Ingestion</p>
            <h1 className="text-3xl font-bold text-white mb-2">Upload Statement</h1>
            <p className="text-gray-400">Import your bank statements for automated AI categorization.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">
              {(localStorage.getItem("name") || "U").substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="max-w-3xl flex flex-col gap-8">

          {/* Upload Card */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Select Bank Statement</h2>
              <p className="text-gray-400 text-sm">Upload CSV or PDF files from your UPI apps, cards, or bank accounts.</p>
            </div>

            {/* Drag & Drop Area (Now Clickable!) */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv, .pdf, .txt"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer text-center mb-6
                ${isDragging
                  ? 'border-moneta-green bg-moneta-green/5'
                  : 'border-gray-700 bg-[#0b1317] hover:border-gray-500'
                }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-moneta-green/20 text-moneta-green' : 'bg-gray-800 text-gray-400'}`}>
                <UploadCloud size={28} />
              </div>
              <p className="text-white font-semibold text-sm mb-1">Drag and drop or click to upload</p>
              <p className="text-gray-500 text-xs mb-4">Supports CSV, TXT, and PDF bank extracts up to 10MB</p>

              <div className="flex gap-4">
                <span className="flex items-center gap-1 text-xs text-gray-400"><FileSpreadsheet size={14}/> CSV / TXT Parser</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><FileText size={14}/> PDF / OCR</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-800"></div>
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Or fallback option</span>
              <div className="flex-1 h-px bg-gray-800"></div>
            </div>

            {/* Demo Dataset Button */}
            <button
              onClick={handleDemoLoad}
              disabled={uploadStatus === 'processing'}
              className="w-full bg-[#1b252a] hover:bg-gray-800 border border-gray-700 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Database size={16} className="text-moneta-green" />
              Load Demo Transaction Dataset
            </button>

            {/* Status Feedback */}
            {uploadStatus === 'processing' && (
              <div className="mt-6 bg-blue-900/20 border border-blue-800 text-blue-300 p-4 rounded-xl flex items-center gap-3 text-sm animate-pulse">
                <Loader2 size={18} className="animate-spin shrink-0" />
                AI Agent is parsing and categorizing transactions...
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="mt-6 bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                {errorMessage}
              </div>
            )}

            {uploadStatus === 'success' && aiResult && (
              <div className="mt-6 bg-moneta-green/10 border border-moneta-green/30 text-moneta-green p-4 rounded-xl flex flex-col gap-3 text-sm">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 size={18} />
                  Successfully categorized {aiResult.transactions?.length || 0} transactions and updated dashboard!
                </div>
                {/* Temporary JSON view to prove it works */}
                <div className="bg-[#0b1317] p-3 rounded-lg border border-gray-800 overflow-x-auto max-h-40">
                  <pre className="text-xs text-gray-400 font-mono">
                    {JSON.stringify(aiResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Previous Upload History */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <h3 className="text-white font-semibold text-base mb-4">Recent Statement Imports</h3>
            <div className="flex flex-col gap-3">
              <HistoryRow filename="september_hdfc_statement.pdf" date="Sep 30, 2026" status="Processed" count="42 transactions" />
              <HistoryRow filename="august_upi_export.csv" date="Aug 31, 2026" status="Processed" count="128 transactions" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function HistoryRow({ filename, date, status, count }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#0b1317] border border-gray-800/80 rounded-xl">
      <div className="flex items-center gap-3">
        <FileText size={18} className="text-moneta-green" />
        <div>
          <p className="text-white text-sm font-medium">{filename}</p>
          <p className="text-gray-500 text-xs">{date} · {count}</p>
        </div>
      </div>
      <span className="text-xs font-medium px-2.5 py-1 bg-moneta-green/10 text-moneta-green rounded-full flex items-center gap-1">
        <CheckCircle2 size={12} /> {status}
      </span>
    </div>
  );
}
