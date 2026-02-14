
import React from 'react';
import { Shield, Eye, Keyboard, ExternalLink, RefreshCw } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPageProps {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, updateSettings }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-gaming font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Customize your Nova Games experience and safety features.</p>
      </div>

      <div className="space-y-6">
        {/* Tab Cloaking */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Tab Cloaking</h3>
              <p className="text-slate-400 text-sm">Changes the tab name and icon to hide your gaming.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: 'none', name: 'None' },
              { id: 'google', name: 'Google' },
              { id: 'drive', name: 'Drive' },
              { id: 'classroom', name: 'Classroom' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => updateSettings({ cloak: option.id as any })}
                className={`py-3 px-4 rounded-xl border font-medium transition-all ${
                  settings.cloak === option.id 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </section>

        {/* Panic Key */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500/20 p-2 rounded-lg text-red-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Panic Switch</h3>
              <p className="text-slate-400 text-sm">Instantly redirect to a safe site with a single keypress.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Panic URL</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={settings.panicUrl}
                  onChange={(e) => updateSettings({ panicUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="https://google.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Panic Key</label>
              <div className="relative">
                <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="text"
                  value={settings.panicKey}
                  readOnly
                  onKeyDown={(e) => {
                    e.preventDefault();
                    updateSettings({ panicKey: e.key });
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                  placeholder="Press any key..."
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500 uppercase font-bold">Press to change</span>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
           <button 
             onClick={() => window.location.reload()}
             className="flex items-center gap-2 mx-auto text-slate-500 hover:text-white transition-colors text-sm"
           >
             <RefreshCw className="w-4 h-4" />
             Reload Application
           </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
