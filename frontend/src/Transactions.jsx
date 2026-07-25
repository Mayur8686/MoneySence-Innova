import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, CreditCard, Upload, Bot, BarChart2, Heart, 
  PieChart, Bell, MessageSquare, Settings, ChevronRight, 
  Search, Filter, MoreHorizontal, Sparkles, ArrowRight, LogOut 
} from 'lucide-react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

useEffect(() => {

    const uid = localStorage.getItem("uid");

    fetch(`https://moneysence-innova.onrender.com/transactions?uid=${uid}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTransactions(data);
        });

}, []);

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="transactions" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Tuesday, September 30, 2026</p>
            <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-gray-400">Every movement, clearly accounted for.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-6 bg-moneta-green rounded-full cursor-pointer"></div>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <Link to="/profile" className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center hover:scale-105 transition-transform">AM</Link>
          </div>
        </header>

        <div className="flex gap-6 mb-6 text-sm font-medium">
          <button className="bg-moneta-green/10 text-moneta-green px-4 py-2 rounded-full">All activity</button>
          <button className="text-gray-400 hover:text-white px-4 py-2">Income</button>
          <button className="text-gray-400 hover:text-white px-4 py-2">Expenses</button>
        </div>

        <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-[#0b1317] border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <Search size={18} className="text-gray-500" />
              <input type="text" placeholder="Search merchants or categories" className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600 text-sm" />
            </div>
            <button className="bg-[#0b1317] border border-gray-800 rounded-xl px-4 py-3 flex items-center gap-2 text-gray-300 text-sm hover:text-white">
              <Filter size={16} /> All
            </button>
          </div>

         <div className="flex flex-col">

  {transactions.map((item, index) => (

    <TransactionRow
      key={index}
      initials={item.merchant.substring(0, 2).toUpperCase()}
      color={
        item.type === "Credit"
          ? "bg-green-900/40 text-green-400"
          : "bg-blue-900/40 text-blue-400"
      }
      name={item.merchant}
      category={item.paymentType}
      time={item.date}
      amount={`${item.type === "Credit" ? "+" : "-"}₹${item.amount}`}
      isPositive={item.type === "Credit"}
      hideBorder={index === transactions.length - 1}
    />

  ))}

</div>
        </div>
      </main>
    </div>
  );
}

function TransactionRow({ initials, color, name, category, time, amount, isPositive, status = "Cleared", hideBorder }) {
  return (
    <div className={`flex items-center justify-between py-4 ${hideBorder ? '' : 'border-b border-gray-800/60'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${color}`}>{initials}</div>
        <div>
          <p className="text-white font-medium text-sm mb-0.5">{name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{category}</span><span>·</span><span>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${status === 'Pending' ? 'bg-orange-900/20 text-orange-400' : 'bg-moneta-green/10 text-moneta-green'}`}>{status}</span>
        <span className={`font-semibold text-sm w-24 text-right ${isPositive ? 'text-moneta-green' : 'text-white'}`}>{amount}</span>
        <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal size={16} /></button>
      </div>
    </div>
  );
}

export function Sidebar({ activePage }) {
  const getNavClass = (page) => 
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm ${activePage === page ? 'bg-moneta-green/10 text-moneta-green font-medium' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`;

  return (
    <aside className="w-64 border-r border-gray-800 p-6 flex flex-col justify-between overflow-y-auto scrollbar-hide">
      <div>
        {/* CHANGED FROM <Link to="/"> TO A STATIC <div> */}
        <div className="flex items-center gap-2 mb-8 cursor-default">
          <div className="w-8 h-8 rounded-full bg-moneta-green flex items-center justify-center">
            <div className="w-3 h-3 bg-moneta-dark rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">MoneySence<span className="text-moneta-green">.</span></span>
        </div>

        <p className="text-xs font-semibold text-gray-500 tracking-wider mb-3 uppercase">Workspace</p>
        
        <nav className="flex flex-col gap-1.5">
          <Link to="/dashboard" className={getNavClass('dashboard')}><Home size={18} /> Dashboard</Link>
          <Link to="/transactions" className={getNavClass('transactions')}><CreditCard size={18} /> Transactions</Link>
          <Link to="/upload" className={getNavClass('upload')}><Upload size={18} /> Upload Statement</Link>
          <Link to="/insights" className={getNavClass('insights')}><Bot size={18} /> AI Insights</Link>
          <Link to="/analytics" className={getNavClass('analytics')}><BarChart2 size={18} /> Analytics</Link>
          <Link to="/health" className={getNavClass('health')}><Heart size={18} /> Financial Health</Link>
          <Link to="/budget" className={getNavClass('budget')}><PieChart size={18} /> Budget Planner</Link>
          <Link to="/subscriptions" className={getNavClass('subscriptions')}><Bell size={18} /> Subscriptions</Link>
          <Link to="/copilot" className={getNavClass('copilot')}><MessageSquare size={18} /> AI Financial Coach</Link>
        </nav>
      </div>
      {/* ... rest of the sidebar code ... */}

      <div className="pt-6 border-t border-gray-800/60 mt-4">
        <Link to="/profile" className="flex items-center justify-between cursor-pointer group mb-2 px-2 hover:bg-gray-800/40 py-2 rounded-xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a3636] text-moneta-green flex items-center justify-center text-xs font-bold border border-moneta-green/20">AM</div>
            <span className="text-gray-300 text-sm font-medium group-hover:text-white">Alex Morgan</span>
          </div>
          <ChevronRight size={16} className="text-gray-500 group-hover:text-white" />
        </Link>
        
        <div className="flex flex-col gap-1">
          {/* UPDATE THIS LINK TO /settings */}
          <Link to="/settings" className="flex items-center gap-3 text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors">
            <Settings size={18} /> Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 text-red-400 hover:text-red-300 px-2 py-2 text-sm font-medium transition-colors">
            <LogOut size={18} /> Log out
          </Link>
        </div>
      </div>
    </aside>
  );
}