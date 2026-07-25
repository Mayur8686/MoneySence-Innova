import { Sidebar } from './Transactions';
import { Bell, ShieldCheck, Plus, Calendar, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Subscriptions() {
  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="subscriptions" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Recurring Tracking</p>
            <h1 className="text-3xl font-bold text-white mb-2">Subscriptions & Bills</h1>
            <p className="text-gray-400">Monitor active recurring charges and automated billing dates.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold text-sm px-4 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <Plus size={16} /> Add Subscription
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">AM</div>
          </div>
        </header>

        {/* Summary Card */}
        <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Monthly Recurring Outflow</p>
            <h2 className="text-3xl font-bold text-white">₹3,747 <span className="text-sm font-normal text-gray-500">/ month</span></h2>
          </div>
          <div className="bg-blue-900/20 border border-blue-800 text-blue-400 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <ShieldCheck size={16} /> 5 Active Subscriptions Monitored
          </div>
        </div>

        {/* Subscriptions List Grid */}
        <div className="grid grid-cols-2 gap-6">
          <SubCard name="Netflix Premium" category="Entertainment" amount="₹649" renewal="Renews in 3 days" color="bg-red-900/40 text-red-400" />
          <SubCard name="Amazon Prime" category="Shopping & Media" amount="₹1,499" renewal="Renews in 12 days" color="bg-blue-900/40 text-blue-400" />
          <SubCard name="Spotify Family" category="Music" amount="₹179" renewal="Renews in 18 days" color="bg-emerald-900/40 text-emerald-400" />
          <SubCard name="iCloud Storage (200GB)" category="Cloud & Utilities" amount="₹219" renewal="Renews in 24 days" color="bg-purple-900/40 text-purple-400" />
          <SubCard name="Jira & GitHub Pro" category="Productivity" amount="₹1,201" renewal="Renews in 28 days" color="bg-indigo-900/40 text-indigo-400" />
        </div>

      </main>
    </div>
  );
}

function SubCard({ name, category, amount, renewal, color }) {
  return (
    <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${color}`}>
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-white font-semibold text-base mb-0.5">{name}</h3>
          <p className="text-gray-500 text-xs mb-2">{category}</p>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={12} className="text-moneta-green" /> {renewal}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-white mb-2">{amount}</p>
        <button className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors">Cancel service</button>
      </div>
    </div>
  );
}