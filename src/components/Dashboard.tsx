import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const repositories = [
  { id: 1, name: 'quill-core', health: 92, lastSync: '2m ago', prs: 3 },
  { id: 2, name: 'quill-api', health: 78, lastSync: '15m ago', prs: 1 },
  { id: 3, name: 'quill-ui', health: 95, lastSync: '1h ago', prs: 5 },
  { id: 4, name: 'docs-engine', health: 64, lastSync: '3h ago', prs: 0 },
  { id: 5, name: 'arch-analyzer', health: 88, lastSync: '22m ago', prs: 2 },
  { id: 6, name: 'semantic-search', health: 91, lastSync: '5m ago', prs: 4 },
];

export function Dashboard() {
  return (
    <div className="h-full overflow-y-auto px-8 py-12 lg:px-16 lg:py-20 custom-scrollbar">
      <header className="flex items-end justify-between mb-20">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">Repositories</h1>
          <p className="text-zinc-500 mt-2 font-medium">Monitoring architectural health across your fleet.</p>
        </div>
        <button className="px-6 py-2.5 bg-white text-zinc-950 font-bold rounded-full hover:bg-zinc-200 transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          Sync Repositories
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-24">
        {repositories.map((repo, idx) => (
          <RepoCard key={repo.id} repo={repo} index={idx} />
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Active Pull Requests</h2>
          <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
            View All PRs
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-center justify-between p-6 glass-card rounded-3xl group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                <div>
                  <p className="font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors">Implement module federation for docs-engine</p>
                  <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest mt-1">quill-core • Created 4h ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">Analyzing</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: typeof repositories[0]; index: number; key?: number | string }) {
  const getHealthColor = (health: number) => {
    if (health > 90) return 'text-indigo-400';
    if (health > 70) return 'text-zinc-300';
    return 'text-zinc-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass rounded-[40px] p-10 relative flex flex-col h-80 border border-white/[0.04] overflow-hidden group shadow-2xl"
    >
      {/* Dynamic Mesh Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-start justify-between mb-10 relative z-10">
        <div className="flex-1">
          <h3 className="text-2xl font-black text-zinc-100 tracking-tighter transition-all duration-300 group-hover:text-white">
            {repo.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.25em]">Service Module</span>
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.25em]">v2.4.0</span>
          </div>
        </div>
        <div className={cn("text-xl font-bold tracking-tighter", getHealthColor(repo.health))}>
          {repo.health}%
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest opacity-60">Architectural Integrity</span>
        </div>
        <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${repo.health}%` }}
            transition={{ duration: 2, delay: 0.5 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "h-full rounded-full transition-shadow duration-1000",
              repo.health > 80 ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]' : 'bg-zinc-600'
            )} 
          />
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/[0.06] flex items-center justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Last Analysis</span>
          <span className="text-[11px] font-bold text-zinc-400 tracking-tight">{repo.lastSync}</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end gap-1">
              <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Active Refactors</span>
              <span className="text-[11px] font-bold text-white tracking-tight">{repo.prs}</span>
           </div>
        </div>
      </div>
      
      {/* Premium Highlight Bloom */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
    </motion.div>
  );
}
