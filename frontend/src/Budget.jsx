import { useState } from 'react';
import { Sidebar } from './Transactions';
import { Bell, PieChart, Plus, AlertCircle, CheckCircle2, MoreHorizontal, X } from 'lucide-react';

export default function Budget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    { category: 'Housing & Rent', spent: 18500, limit: 20000, color: 'bg-moneta-green' },
    { category: 'Dining & Food', spent: 8400, limit: 8000, color: 'bg-yellow-400', isOver: true },
    { category: 'Transport & Fuel', spent: 4200, limit: 6000, color: 'bg-blue-400' },
    { category: 'Shopping & Apparel', spent: 3150, limit: 5000, color: 'bg-purple-400' },
    { category: 'Utilities & Bills', spent: 2800, limit: 3500, color: 'bg-indigo-400' },
  ]);

  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);
  const totalLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="budget" />

      {/* Add Budget Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-moneta-card border border-gray-800 rounded-3xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Create New Budget</h3>
            <p className="text-gray-400 text-sm mb-6">Set monthly spending limits for automated AI alerts.</p>
            
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Category Name</label>
                <input type="text" placeholder="e.g. Entertainment" className="w-full bg-[#0b1317] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-moneta-green" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Monthly Limit (₹)</label>
                <input type="number" placeholder="5000" className="w-full bg-[#0b1317] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-moneta-green" />
              </div>
            </div>

            <button onClick={() => setIsModalOpen(false)} className="w-full bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold py-3.5 rounded-xl transition-colors">
              Save Budget Limit
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Spending Control</p>
            <h1 className="text-3xl font-bold text-white mb-2">Budget Planner</h1>
            <p className="text-gray-400">Track category caps and maintain your monthly savings targets.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold text-sm px-4 py-2.5 rounded-full flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            >
              <Plus size={16} /> Add Budget
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">AM</div>
          </div>
        </header>

        {/* Summary Banner */}
        <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Monthly Budget Utilization</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">₹{totalSpent.toLocaleString()}</span>
              <span className="text-gray-500 text-sm">of ₹{totalLimit.toLocaleString()} limit</span>
            </div>
          </div>
          <div className="bg-moneta-green/10 border border-moneta-green/20 text-moneta-green px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> 84% on track this month
          </div>
        </div>

        {/* Budget Progress Cards Grid */}
        <div className="grid grid-cols-2 gap-6">
          {budgets.map((b, idx) => {
            const percentage = Math.min(Math.round((b.spent / b.limit) * 100), 100);
            return (
              <div key={idx} className="bg-moneta-card border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3 h-3 rounded-full ${b.color}`}></div>
                      <h3 className="text-white font-semibold text-base">{b.category}</h3>
                    </div>
                    {b.isOver ? (
                      <span className="text-xs font-semibold px-2.5 py-1 bg-red-900/30 text-red-400 rounded-full flex items-center gap-1">
                        <AlertCircle size={12} /> Over budget
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">{percentage}% used</span>
                    )}
                  </div>

                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-2xl font-bold text-white">₹{b.spent.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs">Limit: ₹{b.limit.toLocaleString()}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      style={{ width: `${percentage}%` }} 
                      className={`h-full rounded-full transition-all duration-500 ${b.isOver ? 'bg-red-400' : 'bg-moneta-green'}`}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-800/60 mt-4 text-xs text-gray-400">
                  <span>Remaining: ₹{(b.limit - b.spent).toLocaleString()}</span>
                  <button className="hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}