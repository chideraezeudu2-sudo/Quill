import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function Settings() {
  return (
    <div className="h-full overflow-y-auto px-8 py-12 lg:px-20 lg:py-24 flex justify-center custom-scrollbar">
      <div className="max-w-4xl w-full">
        <header className="mb-20">
          <h1 className="text-4xl font-bold text-white tracking-tighter">Settings</h1>
          <p className="text-zinc-500 mt-2 font-medium">Configure Quill's behavior and architectural enforcement.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <aside className="space-y-1">
            <NavItem active>Appearance</NavItem>
            <NavItem>Versioning</NavItem>
            <NavItem>Security</NavItem>
            <NavItem>Notifications</NavItem>
            <NavItem>Account</NavItem>
            <NavItem>Integrations</NavItem>
          </aside>

          <section className="md:col-span-2 space-y-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">Style Guide Enforcer</h3>
                <p className="text-sm text-zinc-500 font-medium">Pick the architectural "vibe" that Quill should enforce.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <VibeCard title="Technical" description="Precision & Data" active />
                <VibeCard title="Minimalist" description="Linear/Apple Feel" />
                <VibeCard title="Community" description="Playful & Social" />
                <VibeCard title="Enterprise" description="Strict & Robust" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">Semantic Versioning</h3>
                  <p className="text-sm text-zinc-500 font-medium">Automatically suggest version bumps based on code changes.</p>
                </div>
                <div className="w-10 h-5 rounded-full bg-indigo-600 relative cursor-pointer">
                   <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="glass-card p-8 rounded-[40px] space-y-6">
                 <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-[10px] font-black tracking-tighter text-indigo-400">GPT-4</div>
                    <div className="flex flex-col">
                        <p className="font-bold text-white tracking-tight">Active Rule: Major API Drift Protection</p>
                        <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-1 leading-none">Global Enforcement • 15 Repositories</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/80">
                    Enforced by Intelligence Hub
                 </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function NavItem({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center px-5 py-3 rounded-2xl text-sm font-bold transition-all relative overflow-hidden group",
      active ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-zinc-200"
    )}>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      {active && (
        <motion.div 
          layoutId="settings-nav-dot"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-500 rounded-r-full"
        />
      )}
    </button>
  );
}

function VibeCard({ title, description, active }: { title: string; description: string; active?: boolean }) {
  return (
    <div className={cn(
      "p-8 rounded-[32px] border transition-all duration-300 cursor-pointer group hover:border-white/10",
      active ? "glass border-indigo-500/40 shadow-2xl" : "glass-accent border-transparent"
    )}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={cn("text-lg font-bold tracking-tight", active ? "text-white" : "text-zinc-400")}>{title}</h4>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_indigo]" />}
      </div>
      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-tight group-hover:text-zinc-400 transition-colors">{description}</p>
    </div>
  );
}
