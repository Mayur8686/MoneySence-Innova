import { Sidebar } from './Transactions';
import { Bell, Settings as SettingsIcon, Shield, Globe, Lock, User, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen bg-moneta-dark font-sans overflow-hidden">
      <Sidebar activePage="settings" />

      <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
        <header className="flex justify-between items-end mb-8">
          <div>
            <p className="text-moneta-green text-sm font-semibold tracking-wider uppercase mb-2">Preferences & Security</p>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Configure your application preferences and security protocols.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Bell size={18} /></button>
            <div className="w-10 h-10 rounded-full bg-[#1a3636] border border-moneta-green/30 text-moneta-green font-bold text-sm flex items-center justify-center">AM</div>
          </div>
        </header>

        <div className="max-w-3xl flex flex-col gap-6">
          
          {/* General Preferences */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={20} className="text-moneta-green" />
              <h2 className="text-lg font-semibold text-white">Localization & Display</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <SettingRow label="Base Currency" desc="Display amounts across the app">
                <select className="bg-[#0b1317] border border-gray-800 text-white text-sm rounded-xl px-4 py-2 outline-none">
                  <option>₹ Indian Rupee (INR)</option>
                  <option>$ US Dollar (USD)</option>
                </select>
              </SettingRow>
              <SettingRow label="Date Format" desc="Preferred system date structure">
                <select className="bg-[#0b1317] border border-gray-800 text-white text-sm rounded-xl px-4 py-2 outline-none">
                  <option>DD / MM / YYYY</option>
                  <option>MM / DD / YYYY</option>
                </select>
              </SettingRow>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-moneta-green" />
              <h2 className="text-lg font-semibold text-white">AI & Budget Alerts</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <ToggleRow title="Weekly AI Briefings" desc="Receive AI financial summaries in your inbox or dashboard" defaultChecked={true} />
              <ToggleRow title="Over-budget Warnings" desc="Instant notifications when approaching category limits" defaultChecked={true} />
              <ToggleRow title="Subscription Reminders" desc="Alerts 3 days before recurring renewals" defaultChecked={false} />
            </div>
          </div>

          {/* Security */}
          <div className="bg-moneta-card border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-moneta-green" />
              <h2 className="text-lg font-semibold text-white">Security & Authentication</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-white text-sm font-medium">Google Authentication</p>
                  <p className="text-gray-500 text-xs">Connected as alex.morgan@example.com</p>
                </div>
                <span className="text-xs bg-moneta-green/10 text-moneta-green px-3 py-1 rounded-full font-medium">Connected</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4 mt-2">
            {saved && (
              <span className="text-moneta-green text-sm flex items-center gap-1">
                <CheckCircle2 size={16} /> Changes saved successfully!
              </span>
            )}
            <button 
              onClick={handleSave}
              className="bg-moneta-green hover:bg-emerald-400 text-[#0b1317] font-bold px-6 py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            >
              Save Preferences
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-800/60 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ title, desc, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between border-b border-gray-800/60 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full transition-colors relative p-1 ${checked ? 'bg-moneta-green' : 'bg-gray-800'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-moneta-dark transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );
}