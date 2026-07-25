import { Sidebar } from './Transactions';
import { Bell, BarChart2, TrendingUp, TrendingDown, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="analytics" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Financial Intelligence</p>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-gray-400">Deep dive into your spending patterns and category velocity.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">AM</div>
          </div>
        </header>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <MetricCard title="Total Inflow (Sep)" amount="₹78,400" change="+12.3%" isPositive={true} />
          <MetricCard title="Total Outflow (Sep)" amount="₹45,200" change="-4.1%" isPositive={true} />
          <MetricCard title="Net Savings Rate" amount="42.3%" change="+5.2%" isPositive={true} />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          
          {/* Income vs Expenses Bar Representation */}
          <div className="col-span-8 bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Income vs Expenses Velocity</h3>
                <p className="text-gray-400 text-sm">Monthly comparison over the last 6 months</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-moneta-green"></div><span className="text-gray-400">Income</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div><span className="text-gray-400">Expenses</span></div>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 pt-10 px-4 border-b border-gray-800">
              <BarGroup month="Apr" income="60" expense="45" />
              <BarGroup month="May" income="65" expense="50" />
              <BarGroup month="Jun" income="70" expense="42" />
              <BarGroup month="Jul" income="75" expense="55" />
              <BarGroup month="Aug" income="82" expense="48" />
              <BarGroup month="Sep" income="90" expense="45" isCurrent={true} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 pt-3 px-4">
              <span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep (Current)</span>
            </div>
          </div>

          {/* Velocity Breakdown */}
          <div className="col-span-4 bg-moneta-card border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">Spending Velocity</h3>
                <BarChart2 size={18} className="text-moneta-green" />
              </div>
              <p className="text-gray-400 text-sm mb-6">You are spending ₹1,420 less per day compared to last month.</p>
            </div>

            <div className="flex flex-col gap-4">
              <VelocityStat label="Weekday Average" amount="₹1,250 / day" />
              <VelocityStat label="Weekend Average" amount="₹2,180 / day" />
              <VelocityStat label="Largest Single Day" amount="₹4,500 (Sep 12)" />
            </div>

            <div className="bg-[#0b1317] border border-gray-800 p-4 rounded-xl mt-6">
              <p className="text-xs text-moneta-green font-semibold mb-1">AI Recommendation</p>
              <p className="text-gray-400 text-xs">Weekend dining represents 60% of variance. Consider setting a weekend cap.</p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

function MetricCard({ title, amount, change, isPositive }) {
  return (
    <div className="bg-moneta-card border border-gray-800 p-6 rounded-2xl">
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-2xl font-bold text-white">{amount}</h4>
        <span className={`text-xs font-semibold flex items-center gap-1 ${isPositive ? 'text-moneta-green' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
    </div>
  );
}

function BarGroup({ month, income, expense, isCurrent }) {
  return (
    <div className="flex flex-col items-center gap-2 h-full justify-end flex-1">
      <div className="w-full flex items-end justify-center gap-1.5 h-full">
        <div style={{ height: `${income}%` }} className={`w-3 rounded-t ${isCurrent ? 'bg-moneta-green shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 'bg-moneta-green/60'}`}></div>
        <div style={{ height: `${expense}%` }} className={`w-3 rounded-t ${isCurrent ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'bg-cyan-400/60'}`}></div>
      </div>
    </div>
  );
}

function VelocityStat({ label, amount }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm">{amount}</span>
    </div>
  );
}