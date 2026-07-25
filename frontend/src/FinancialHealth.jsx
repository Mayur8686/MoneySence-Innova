import { Sidebar } from './Transactions';
import { Bell, Heart, ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

export default function FinancialHealth() {
  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="health" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Stability Audit</p>
            <h1 className="text-3xl font-bold text-white mb-2">Financial Health</h1>
            <p className="text-gray-400">Holistic scoring of your liquidity, emergency buffer, and debt load.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">AM</div>
          </div>
        </header>

        {/* Top Score Showcase */}
        <div className="bg-moneta-card border border-gray-800 rounded-3xl p-8 mb-8 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-moneta-green/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#34d399" strokeWidth="10" strokeDasharray="251" strokeDashoffset="45" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">82</span>
                <span className="text-[10px] font-semibold text-moneta-green uppercase tracking-widest mt-1">Very Healthy</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-moneta-green/10 text-moneta-green text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Award size={14} /> Top 15% of Users
                </span>
                <span className="text-gray-500 text-xs">Updated today</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your financial foundation is solid</h2>
              <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
                Your emergency fund covers 4.5 months of expenses, and your monthly savings rate exceeds the benchmark for your income tier.
              </p>
            </div>
          </div>

          <div className="bg-[#0b1317] border border-gray-800 p-6 rounded-2xl text-center relative z-10 min-w-[200px]">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Score Change</p>
            <p className="text-3xl font-bold text-moneta-green flex items-center justify-center gap-1">
              <ArrowUpRight size={24} /> +4 pts
            </p>
            <p className="text-gray-400 text-xs mt-1">Since last month</p>
          </div>
        </div>

        {/* Pillar Breakdown Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          
          <PillarCard 
            icon={<ShieldCheck size={20} className="text-moneta-green"/>} 
            title="Emergency Buffer" 
            status="Strong" 
            statusColor="text-moneta-green bg-moneta-green/10" 
            desc="You have ₹1,45,000 saved across liquid accounts. Recommended target is ₹1,20,000."
          />

          <PillarCard 
            icon={<CheckCircle2 size={20} className="text-blue-400"/>} 
            title="Debt-to-Income Ratio" 
            status="Low Risk" 
            statusColor="text-blue-400 bg-blue-900/20" 
            desc="Your monthly liabilities consume only 12% of your inflow. Well under the 30% safety ceiling."
          />

          <PillarCard 
            icon={<TrendingUp size={20} className="text-purple-400"/>} 
            title="Savings Consistency" 
            status="Consistent" 
            statusColor="text-purple-400 bg-purple-900/20" 
            desc="You have successfully transferred money to savings for 6 consecutive months post-payday."
          />

          <PillarCard 
            icon={<AlertTriangle size={20} className="text-yellow-400"/>} 
            title="Subscription Creep" 
            status="Attention" 
            statusColor="text-yellow-400 bg-yellow-900/20" 
            desc="Active recurring charges increased by 12% over the last quarter. Review 3 minor services."
          />

        </div>

      </main>
    </div>
  );
}

function PillarCard({ icon, title, status, statusColor, desc }) {
  return (
    <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}