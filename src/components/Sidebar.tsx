import { motion } from 'motion/react';
import { 
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Tab } from '../App';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems = [
  { id: 'projects' as Tab, label: 'Projects' },
  { id: 'library' as Tab, label: 'Library' },
  { id: 'blueprint' as Tab, label: 'Blueprint' },
  { id: 'intelligence' as Tab, label: 'Intelligence' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 h-full glass border-r border-white/5 flex flex-col z-50 overflow-hidden">
      <div 
        className="p-8 pb-12 flex items-center gap-4 group cursor-pointer" 
        onClick={() => onTabChange('projects')}
      >
        <div className="relative shrink-0">
          <svg 
            viewBox="0 0 24 24" 
            className="w-9 h-9 text-white transform group-hover:rotate-12 transition-all duration-700 ease-in-out"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            <path d="M16 8 L2 22" className="opacity-30" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M17.5 15 L9 15" className="opacity-50" strokeWidth="1" />
          </svg>
          <div className="absolute inset-0 bg-brand/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-zinc-500 group-hover:from-white group-hover:to-brand transition-all duration-700 leading-none">
            Quill
          </span>
          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1 leading-none group-hover:text-zinc-400 transition-colors duration-700">Architecture</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
              activeTab === item.id 
                ? "glass-nav-active text-white" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <span className={cn(
              "text-[15px] font-semibold tracking-tight transition-transform duration-300",
              activeTab === item.id ? "translate-x-1" : "group-hover:translate-x-0.5"
            )}>
              {item.label}
            </span>
            
            {activeTab === item.id && (
              <motion.div
                layoutId="active-nav-dot"
                className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <button
          onClick={() => onTabChange('settings')}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 text-zinc-500 hover:text-white",
            activeTab === 'settings' && "glass-nav-active text-white"
          )}
        >
          <span className="text-[14px] font-medium tracking-tight">Settings</span>
        </button>

        <div className="p-4 rounded-2xl glass-accent border-white/[0.03] flex items-center justify-between group cursor-pointer hover:border-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/5" />
            <div className="flex flex-col">
              <p className="text-xs font-bold text-white tracking-tight">Chidera</p>
              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-none">Pro</p>
            </div>
          </div>
          <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
        </div>
      </div>
    </aside>
  );
}
