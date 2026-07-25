import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './Transactions';
import UploadModal from './UploadModal';
import {
  LineChart, ArrowUpRight, ArrowDownRight,
  Bell, Sparkles, ChevronRight, Bot, Lightbulb, MoreHorizontal, Plus, Activity,
  PieChart, TrendingDown, Tag, Loader2
} from 'lucide-react';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for live AI data fetched from the backend (Gemini-parsed statements)
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const uid = localStorage.getItem("uid");

  // Fetch fresh AI dashboard data for the logged-in user
  useEffect(() => {
    if (!uid) {
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`https://moneysence-innova.onrender.com/api/dashboard/${uid}`);
        const result = await response.json();
        if (result.status === "success") {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();

    // --- REAL-TIME GLOBAL SYNC LISTENER ---
    // Re-fetches fresh data instantly whenever an upload completes anywhere in the app
    window.addEventListener('moneta_data_updated', fetchDashboardData);
    return () => window.removeEventListener('moneta_data_updated', fetchDashboardData);
  }, [uid]);

  // --- DYNAMIC CALCULATIONS FROM AI DATA ---
  const healthScore = dashboardData?.health_score ?? 85;
  const recentTransactions = dashboardData?.transactions || [];

  // 1. Calculate Total Monthly Expenses (sum of all debits)
  const totalExpenses = recentTransactions
    .filter(tx => tx.type?.toLowerCase() === "debit")
    .reduce((acc, tx) => acc + Number(tx.amount || 0), 0);

  // 2. Group expenses by category for the Category Mix
  const categoryTotals = recentTransactions
    .filter(tx => tx.type?.toLowerCase() === "debit")
    .reduce((acc, tx) => {
      const cat = tx.category || "General";
      acc[cat] = (acc[cat] || 0) + Number(tx.amount || 0);
      return acc;
    }, {});

  // Find the top spending category
  const topCategoryEntry = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const topCategoryName = topCategoryEntry ? topCategoryEntry[0] : "N/A";
  const topCategoryAmount = topCategoryEntry ? topCategoryEntry[1] : 0;

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">

      <Sidebar activePage="dashboard" />
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">

        {/* Header */}
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Tuesday, September 30, 2026</p>
            <h1 className="text-4xl font-bold text-white mb-2">Good morning, {localStorage.getItem("name") || "User"}</h1>
            <p className="text-gray-400">Here are your spending insights at a glance.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold text-sm px-4 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)] cursor-pointer"
            >
              <Plus size={16} /> Import Data
            </button>
            <div className="w-px h-6 bg-gray-700 mx-2"></div>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Bell size={18} />
            </button>

            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              {(localStorage.getItem("name") || "U").substring(0, 2).toUpperCase()}
            </Link>
          </div>
        </header>

        {/* 1. AI Insights Card */}
        <div className="bg-gradient-to-r from-[#161f24] to-[#0f171a] border border-moneta-green/20 rounded-3xl p-6 mb-8 flex items-center justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-moneta-green/5 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-moneta-green/10 flex items-center justify-center text-moneta-green shrink-0 mt-1">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                Copilot Briefing <Sparkles size={14} className="text-moneta-green" />
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
                {isLoading ? (
                  <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading your latest insights...</span>
                ) : dashboardData ? (
                  <>Your financial score is strong at <span className="text-moneta-green font-bold">{healthScore}</span>. Based on your recent transactions, Gemini AI suggests keeping an eye on your spending!</>
                ) : (
                  <>No statements uploaded yet. Click <span className="text-moneta-green font-semibold">Import Data</span> to let Gemini AI analyze your first bank statement.</>
                )}
              </p>
            </div>
          </div>

          <Link
            to="/copilot"
            className="bg-moneta-card border border-gray-700 hover:border-gray-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap relative z-10 block"
          >
            Ask a question
          </Link>
        </div>

        {/* 2. Overview Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard title="Available to Spend" amount="₹32,500" trend="14.6% vs last month" icon={<Activity size={16}/>} isPositive={true} />
          <StatCard title="Monthly Expenses" amount={`₹${totalExpenses.toLocaleString()}`} trend="8.4% under budget" icon={<TrendingDown size={16}/>} isPositive={true} />
          <StatCard title="Savings Rate" amount="24.8%" trend="2.1% higher this month" icon={<ArrowUpRight size={16}/>} isPositive={true} />
          <StatCard title="Top Category" amount={topCategoryName} trend={`₹${topCategoryAmount.toLocaleString()} this month`} icon={<Tag size={16}/>} isNeutral={true} />
        </div>

        {/* 3. Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-8">

          {/* Expense Chart */}
          <div className="col-span-8 bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Spending Trend</h3>
                <p className="text-gray-400 text-sm">Your expenses over the last 5 months</p>
              </div>
              <div className="flex items-center gap-2 text-sm bg-moneta-dark px-3 py-1.5 rounded-lg border border-gray-800">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div><span className="text-gray-300">Expenses</span>
              </div>
            </div>

            <div className="h-56 w-full relative">
               <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                 <line x1="0" y1="30" x2="500" y2="30" stroke="#1f2937" strokeWidth="1"/>
                 <line x1="0" y1="75" x2="500" y2="75" stroke="#1f2937" strokeWidth="1"/>
                 <line x1="0" y1="120" x2="500" y2="120" stroke="#1f2937" strokeWidth="1"/>
                 <path d="M0,100 Q125,75 250,110 T500,60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />

                 <circle cx="250" cy="110" r="4" fill="#0b1317" stroke="#22d3ee" strokeWidth="2" />
               </svg>
               <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-2">
                 <span>₹80k</span><span>₹60k</span><span>₹40k</span><span>₹20k</span><span>₹0</span>
               </div>
               <div className="absolute bottom-[-15px] left-8 w-full flex justify-between text-[10px] text-gray-500 pr-4">
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
               </div>
            </div>
          </div>

          {/* Category Chart */}
          <div className="col-span-4 bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Category Mix</h3>
                <p className="text-gray-400 text-sm">September to date</p>
              </div>
              <PieChart size={18} className="text-gray-500" />
            </div>

            <div className="flex flex-col items-center gap-6 mt-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1f2937" strokeWidth="14" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a78bfa" strokeWidth="14" strokeDasharray="15 251.2" strokeDashoffset="-236" className="transition-all duration-1000" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#60a5fa" strokeWidth="14" strokeDasharray="35 251.2" strokeDashoffset="-201" className="transition-all duration-1000" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fcd34d" strokeWidth="14" strokeDasharray="45 251.2" strokeDashoffset="-156" className="transition-all duration-1000" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#34d399" strokeWidth="14" strokeDasharray="156 251.2" strokeDashoffset="0" className="transition-all duration-1000" />
                </svg>
              </div>

              <div className="flex flex-col gap-2.5 w-full">
                {Object.entries(categoryTotals).length > 0 ? (
                  Object.entries(categoryTotals).map(([category, amount], idx) => {
                    const colors = ["bg-moneta-green", "bg-yellow-400", "bg-blue-400", "bg-purple-400", "bg-pink-400"];
                    return (
                      <LegendItem
                        key={idx}
                        color={colors[idx % colors.length]}
                        label={category}
                        amount={`₹${amount.toLocaleString()}`}
                      />
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-xs text-center">No expense categories found.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Row */}
        <div className="grid grid-cols-12 gap-6">

          {/* Recent Transactions */}
          <div className="col-span-8 bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Recent Transactions</h3>
                <p className="text-gray-400 text-sm">Latest movement across accounts</p>
              </div>

              <Link
                to="/transactions"
                className="text-moneta-green text-sm font-semibold flex items-center gap-1 hover:text-white transition-colors"
              >
                View all <ChevronRight size={16} />
              </Link>
            </div>

            <div className="flex flex-col">
              {recentTransactions.length > 0 ? (
                recentTransactions.slice(0, 4).map((tx, index) => (
                  <TransactionRow
                    key={index}
                    initials={(tx.description || "?").substring(0, 2).toUpperCase()}
                    color="bg-gray-800 text-white"
                    name={tx.description}
                    category={tx.category}
                    time={tx.date}
                    amount={tx.type?.toLowerCase() === "debit" ? `-₹${tx.amount}` : `+₹${tx.amount}`}
                    isPositive={tx.type?.toLowerCase() === "credit"}
                    hideBorder={index === Math.min(recentTransactions.length, 4) - 1}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm mt-4">No recent transactions found.</p>
              )}
            </div>
          </div>

          {/* Financial Score */}
          <div className="col-span-4 bg-moneta-card border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg mb-1">Financial Score</h3>
              <Lightbulb size={18} className="text-moneta-green" />
            </div>

            <div className="flex flex-col items-center justify-center flex-1 my-6">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#34d399" strokeWidth="10" strokeDasharray="251" strokeDashoffset={251 - (251 * healthScore) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{healthScore}</span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-1">
                    {healthScore > 80 ? 'Excellent' : healthScore > 60 ? 'Good' : 'Fair'}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm text-center px-4">
                You are in the top <span className="text-white font-semibold">15%</span> of savers this month. Keep it up!
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

// --- Reusable Sub-components ---

function StatCard({ title, amount, trend, icon, isPositive, isNeutral }) {
  const trendColor = isNeutral ? 'text-gray-400' : (isPositive ? 'text-moneta-green' : 'text-red-400');
  const IconComponent = isNeutral ? ArrowUpRight : (isPositive ? ArrowUpRight : ArrowDownRight);

  return (
    <div className="bg-moneta-card border border-gray-800 p-5 rounded-2xl flex flex-col justify-between hover:border-gray-600 transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-xs font-semibold tracking-wider uppercase group-hover:text-gray-300 transition-colors">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-moneta-green">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-2">{amount}</p>
        <p className={`text-xs flex items-center gap-1 ${trendColor}`}>
          {!isNeutral && <IconComponent size={14} />}
          {trend}
        </p>
      </div>
    </div>
  );
}

function LegendItem({ color, label, amount }) {
  return (
    <div className="flex items-center justify-between text-sm w-full">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="text-gray-400">{label}</span>
      </div>
      <span className="text-white font-medium">{amount}</span>
    </div>
  );
}

function TransactionRow({ initials, color, name, category, time, amount, isPositive, hideBorder }) {
  return (
    <div className={`flex items-center justify-between py-4 ${hideBorder ? '' : 'border-b border-gray-800/60'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${color}`}>
          {initials}
        </div>
        <div>
          <p className="text-white font-medium text-sm mb-0.5">{name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{category}</span>
            <span>·</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className={`font-semibold text-sm w-24 text-right ${isPositive ? 'text-moneta-green' : 'text-white'}`}>{amount}</span>
        <button className="text-gray-500 hover:text-white transition-colors cursor-pointer"><MoreHorizontal size={16} /></button>
      </div>
    </div>
  );
}
