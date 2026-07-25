import { Sidebar } from './Transactions'; // Reusing the sidebar we just made
import { Bell, Bot, Sparkles, Send } from 'lucide-react';

export default function Copilot() {
  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="copilot" />

      <main className="flex-1 flex flex-col p-10 overflow-hidden">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Tuesday, September 30, 2024</p>
            <h1 className="text-3xl font-bold text-white mb-2">Ask Copilot</h1>
            <p className="text-gray-400">A private, plain-language view of your money.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-moneta-green/10 text-moneta-green px-3 py-1.5 rounded-full text-xs font-bold">
               <div className="w-2 h-2 rounded-full bg-moneta-green"></div> Secure session
             </div>
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400"><Bell size={18} /></button>
            <button className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm">AM</button>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 bg-moneta-card border border-gray-800 rounded-2xl flex flex-col max-w-4xl w-full mx-auto overflow-hidden">
          
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-moneta-green/10 flex items-center justify-center text-moneta-green"><Bot size={20} /></div>
              <div>
                <h3 className="text-white font-semibold text-sm">Moneta Copilot</h3>
                <p className="text-gray-500 text-xs">Financial context, made human</p>
              </div>
            </div>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest border border-gray-700 px-3 py-1 rounded-full">Private</span>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="flex gap-4 max-w-2xl mb-8">
              <div className="w-8 h-8 rounded-full bg-moneta-green/10 flex-shrink-0 flex items-center justify-center text-moneta-green mt-1">
                <Sparkles size={14} />
              </div>
              <div>
                <div className="bg-[#1b252a] text-white text-sm p-4 rounded-2xl rounded-tl-none leading-relaxed">
                  Good morning, Alex. I have your September picture ready. What would you like to make clearer today?
                </div>
                <span className="text-gray-600 text-xs mt-2 block">9:42 AM</span>
              </div>
            </div>

            <div className="pl-12">
              <p className="text-gray-400 text-xs mb-3">Try asking</p>
              <div className="flex flex-wrap gap-2">
                <button className="border border-gray-700 hover:border-gray-500 text-gray-300 text-xs px-4 py-2 rounded-full transition-colors">Where can I comfortably cut back?</button>
                <button className="border border-gray-700 hover:border-gray-500 text-gray-300 text-xs px-4 py-2 rounded-full transition-colors">Am I on track for my buffer goal?</button>
                <button className="border border-gray-700 hover:border-gray-500 text-gray-300 text-xs px-4 py-2 rounded-full transition-colors">Explain my spending this month</button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 bg-[#0f171a]">
            <div className="relative">
              <input type="text" placeholder="Ask anything about your money..." className="w-full bg-[#161f24] border border-gray-700 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 text-sm outline-none focus:border-moneta-green transition-colors" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-moneta-green rounded-lg flex items-center justify-center text-[#0b1317] hover:bg-emerald-400 transition-colors">
                <Send size={16} />
              </button>
            </div>
            <p className="text-center text-gray-600 text-[10px] mt-3">Copilot uses your connected account activity. It does not make decisions for you.</p>
          </div>

        </div>
      </main>
    </div>
  );
}