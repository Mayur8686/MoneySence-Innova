import { Sidebar } from './Transactions';
import { Bell, Sparkles, TrendingUp, TrendingDown, ShieldCheck, Wallet, LineChart, Tag } from 'lucide-react';

export default function Insights() {
  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="insights" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Tuesday, September 30, 2024</p>
            <h1 className="text-3xl font-bold text-white mb-2">Insights</h1>
            <p className="text-gray-400">Patterns worth a closer look.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-6 bg-moneta-green rounded-full cursor-pointer"></div>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400"><Bell size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm">AM</button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 bg-[#0b1317] border border-gray-800 p-1 rounded-xl">
            <button className="bg-[#1b252a] text-white text-sm font-medium px-4 py-1.5 rounded-lg shadow">Spending</button>
            <button className="text-gray-400 hover:text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors">Net Worth</button>
          </div>
          <div className="flex gap-4 text-sm font-medium">
            <button className="text-gray-500 hover:text-gray-300">3 months</button>
            <button className="bg-moneta-green/10 text-moneta-green px-3 py-1 rounded-full">6 months</button>
            <button className="text-gray-500 hover:text-gray-300">1 year</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Main Chart */}
          <div className="col-span-2 bg-moneta-card border border-gray-800 rounded-2xl p-6">
             <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Spending rhythm</h3>
                <p className="text-gray-400 text-sm">A steady month is a powerful month.</p>
              </div>
              <span className="text-moneta-green text-sm font-bold flex items-center gap-1"><TrendingUp size={16}/> +8.2%</span>
            </div>
            
            <div className="h-56 w-full relative">
               <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                 <line x1="0" y1="30" x2="500" y2="30" stroke="#1f2937" strokeWidth="1"/>
                 <line x1="0" y1="75" x2="500" y2="75" stroke="#1f2937" strokeWidth="1"/>
                 <line x1="0" y1="120" x2="500" y2="120" stroke="#1f2937" strokeWidth="1"/>
                 <path d="M0,80 Q125,75 250,90 T500,60" fill="none" stroke="#22d3ee" strokeWidth="2" />
                 
                 {/* Tooltip line and dot */}
                 <line x1="150" y1="20" x2="150" y2="130" stroke="#4b5563" strokeWidth="1" strokeDasharray="4"/>
                 <circle cx="150" cy="78" r="4" fill="#0b1317" stroke="#22d3ee" strokeWidth="2" />
               </svg>
               {/* Floating Tooltip */}
               <div className="absolute left-[130px] top-[90px] bg-[#1b252a] border border-gray-700 px-3 py-2 rounded-lg shadow-lg">
                 <p className="text-white text-xs font-semibold">Jun</p>
                 <p className="text-cyan-400 text-xs">spend : $3910</p>
               </div>
               
               <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-2">
                 <span>$6.0k</span><span>$4.5k</span><span>$3.0k</span><span>$1.5k</span><span>$0.0k</span>
               </div>
               <div className="absolute bottom-[-20px] left-8 w-full flex justify-between text-[10px] text-gray-500 pr-4">
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
               </div>
            </div>
          </div>

          {/* Signals Column */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
             <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Signals</h3>
                <p className="text-gray-400 text-sm">What changed recently</p>
              </div>
              <Sparkles size={16} className="text-moneta-green" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#1b252a] rounded-xl p-4 flex gap-3 border border-gray-800/50">
                <TrendingDown size={18} className="text-moneta-green mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Dining is softer</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Your dining spend is down 18% from August.</p>
                </div>
              </div>
              <div className="bg-[#1b252a] rounded-xl p-4 flex gap-3 border border-gray-800/50">
                <ShieldCheck size={18} className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Income is consistent</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Three months above your average baseline.</p>
                </div>
              </div>
              <div className="bg-[#1b252a] rounded-xl p-4 flex gap-3 border border-gray-800/50">
                <Wallet size={18} className="text-moneta-green mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Buffer is growing</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">You added $540 to your safety net this quarter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stat Cards */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard title="Average Monthly Spend" amount="$3,748" trend="3.8% less than prior period" icon={<Wallet size={16}/>} />
          <StatCard title="Savings Rate" amount="24.8%" trend="5.2 pts above your baseline" icon={<LineChart size={16}/>} />
          <StatCard title="Largest Variable" amount="Dining" trend="$84 below its 6-month average" icon={<Tag size={16}/>} />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, amount, trend, icon }) {
  return (
    <div className="bg-moneta-card border border-gray-800 p-5 rounded-2xl flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-xs font-semibold tracking-wider uppercase">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-gray-800/80 flex items-center justify-center text-moneta-green">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-2">{amount}</p>
        <p className="text-xs flex items-center gap-1 text-moneta-green"><TrendingUp size={14} /> {trend}</p>
      </div>
    </div>
  );
}