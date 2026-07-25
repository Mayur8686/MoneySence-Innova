import { Link } from 'react-router-dom';
import { ArrowRight, Bot, ShieldCheck, Zap, PieChart, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-moneta-dark font-sans text-white overflow-hidden selection:bg-moneta-green selection:text-[#0b1317]">
      
      {/* Background Animated Glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-moneta-green/5 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2.5 cursor-default select-none">
          <div className="w-10 h-10 rounded-full bg-moneta-green flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.5)]">
            <div className="w-4 h-4 bg-moneta-dark rounded-full"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">MoneySence<span className="text-moneta-green">.</span></span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors">
            Sign In
          </Link>
          {/* Routes to /register */}
          <Link to="/register" className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold text-sm px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-105">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-8 pt-16 pb-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-moneta-green/10 border border-moneta-green/30 text-moneta-green text-xs font-semibold px-4 py-1.5 rounded-full mb-8 shadow-inner">
          <Sparkles size={14} /> Next-Gen AI FinTech Platform for Smart Spenders
        </div>
        
        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Your Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-moneta-green via-emerald-300 to-cyan-400">Financial Command Center</span>
        </h1>
        
        <p className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate statement parsing, track detailed categories in Indian Rupees (₹), and converse with an AI financial agent built for your goals.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          {/* Routes to /register */}
          <Link to="/register" className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-[0_0_35px_rgba(52,211,153,0.4)] hover:scale-105">
            Get Started <ArrowRight size={18} />
          </Link>
          
          <Link to="/dashboard" className="bg-moneta-card hover:bg-gray-800 border border-gray-800 text-white font-medium text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:border-gray-600">
            View Live Demo
          </Link>
        </div>

        {/* INTERACTIVE MOCK DASHBOARD PREVIEW CARD */}
        <div className="bg-moneta-card border border-gray-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-left max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-moneta-green/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Mock Window Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-moneta-green/80"></div>
              <span className="text-xs text-gray-500 ml-2 font-mono">moneysence.ai/dashboard</span>
            </div>
            <span className="text-xs bg-moneta-green/10 text-moneta-green px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} /> Live Sync Active
            </span>
          </div>

          {/* Mock Content Inside */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0b1317] border border-gray-800 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider mb-1">Available to Spend</p>
              <p className="text-xl font-bold text-white">₹32,500</p>
              <p className="text-[10px] text-moneta-green mt-1">14.6% vs last month</p>
            </div>
            <div className="bg-[#0b1317] border border-gray-800 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider mb-1">Monthly Expenses</p>
              <p className="text-xl font-bold text-white">₹45,200</p>
              <p className="text-[10px] text-moneta-green mt-1">8.4% under budget</p>
            </div>
            <div className="bg-[#0b1317] border border-gray-800 p-4 rounded-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider mb-1">Financial Score</p>
              <p className="text-xl font-bold text-white">82 / 100</p>
              <p className="text-[10px] text-moneta-green mt-1">Top 15% of savers</p>
            </div>
          </div>

          {/* Mock AI Insight banner */}
          <div className="bg-gradient-to-r from-[#161f24] to-[#0f171a] border border-moneta-green/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-moneta-green/10 flex items-center justify-center text-moneta-green shrink-0">
              <Bot size={16} />
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="text-moneta-green font-semibold">Copilot Agent:</span> Moving ₹240 after payday puts you right on track for your year-end buffer goal.
            </p>
          </div>
        </div>

      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-8 pb-24 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Engineered for Complete Financial Clarity</h2>
          <p className="text-gray-400 text-sm">Everything you need to master your money in one unified workspace.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Bot size={22} className="text-moneta-green" />}
            title="AI Financial Coach"
            desc="Get plain-language answers and proactive budgeting guidance tailored precisely to your habits."
          />
          <FeatureCard 
            icon={<Zap size={22} className="text-cyan-400" />}
            title="Automated Statement Ingestion"
            desc="Drag and drop bank statement PDFs or CSVs for instant categorization in Indian Rupees."
          />
          <FeatureCard 
            icon={<ShieldCheck size={22} className="text-purple-400" />}
            title="Holistic Health Audit"
            desc="Real-time financial scoring tracking your emergency liquidity buffer and savings rate."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 py-8 text-center text-xs text-gray-500 relative z-10">
        <p>© 2026 MoneySence AI Technologies. Built for Hackathon Excellence.</p>
      </footer>

    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-moneta-card border border-gray-800 hover:border-gray-700 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 rounded-2xl bg-gray-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}