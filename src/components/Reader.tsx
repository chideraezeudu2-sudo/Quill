import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Reader() {
  const [isCodeToEnglish, setIsCodeToEnglish] = useState(false);
  const [isExpertMode, setIsExpertMode] = useState(false);

  return (
    <div className="flex h-full overflow-hidden bg-zinc-950">
      {/* Left Documentation Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 space-y-10 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] px-2">Navigation</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white/[0.03] border border-white/[0.05] rounded-xl py-2 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
            />
          </div>
        </div>

        <nav className="flex-1 space-y-8">
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-4">Core</p>
            <div className="space-y-1">
              <NavItem active>Introduction</NavItem>
              <NavItem>Setup Guide</NavItem>
              <NavItem>Architecture</NavItem>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-4">Deep Dive</p>
            <div className="space-y-1">
              <NavItem>Authentication</NavItem>
              <NavItem>API Reference</NavItem>
              <div className="pl-4 space-y-1 mt-1 border-l border-white/5 ml-2">
                <NavItem subItem>REST Endpoints</NavItem>
                <NavItem subItem>GraphQL Schema</NavItem>
              </div>
              <NavItem>Persistence</NavItem>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-12 py-20 lg:px-24 custom-scrollbar bg-zinc-950/20 backdrop-blur-3xl">
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-10">
            <span>Docs</span>
            <span>/</span>
            <span className="text-zinc-400">Core</span>
            <span>/</span>
            <span className="text-white">Introduction</span>
          </div>

          <h1 className="text-6xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9]">Introduction</h1>
          <p className="text-xl text-zinc-400 leading-relaxed font-medium mb-16">
            Connecting your technical debt to human understanding. Quill analyzes your repository architecture to generate documentation that never goes stale.
          </p>

          <section className="space-y-12 pb-24">
            <div className="glass-card p-10 rounded-[40px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">The Sync Engine</h2>
                <button className="px-4 py-1.5 rounded-full bg-white/[0.05] text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/5">
                  Source Code
                </button>
              </div>
              <p className="text-zinc-400 leading-relaxed mb-10 font-medium">
                Quill implements a real-time event-driven analyzer that hooks into your Git provider. Every commit is cross-referenced with your existing knowledge graph.
              </p>
              
              <div className="bg-black/40 rounded-3xl p-8 font-mono text-sm overflow-x-auto border border-white/[0.03] shadow-2xl relative">
                <div className="flex items-center gap-1.5 absolute top-4 left-6">
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <pre className="text-zinc-300 mt-6 leading-relaxed">
{`async function quillSync(commit: Commit) {
  // Extract structural changes
  const delta = await analyzer.diff(commit.tree);
  
  // Update internal mapping
  await blueprint.update(delta);
  
  // Re-generate relevant doc segments
  return await intelligence.reconcile(delta);
}`}
                </pre>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Next Steps</h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                To begin, you will need to authenticate your GitHub account and specify which repositories you would like Mirror to monitor.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="p-6 glass-card rounded-3xl group cursor-pointer border border-white/5">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Tutorial</p>
                    <p className="font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">Quickstart Guide</p>
                 </div>
                 <div className="p-6 glass-card rounded-3xl group cursor-pointer border border-white/5">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Reference</p>
                    <p className="font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">API Documentation</p>
                 </div>
              </div>
            </div>
          </section>
        </article>
      </div>

      {/* Right Magic Rail */}
      <aside className="w-80 border-l border-white/5 flex flex-col p-8 space-y-12 bg-zinc-950">
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em]">Perspectives</p>
            <FeatureToggle 
              active={isCodeToEnglish} 
              onChange={setIsCodeToEnglish}
              title="Summary Mode"
              description="Summarize logic into natural prose."
            />
            <FeatureToggle 
              active={isExpertMode} 
              onChange={setIsExpertMode}
              title="Expert Level"
              description="Toggle between technical and concept views."
            />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em]">Navigation</p>
            <button className="w-full flex items-center justify-between px-2 font-bold text-zinc-500 hover:text-white transition-colors">
              <span className="text-xs uppercase tracking-widest">Logic Visualization</span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </button>
            <button className="w-full flex items-center justify-between px-2 font-bold text-zinc-500 hover:text-white transition-colors">
              <span className="text-xs uppercase tracking-widest">Blast Radius</span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </button>
          </div>
        </div>

        <div className="mt-auto">
           <div className="p-6 glass-card rounded-3xl border border-indigo-500/20 bg-indigo-500/[0.02] shadow-[0_0_40px_rgba(99,102,241,0.05)]">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Quill Intelligence</p>
              <p className="text-sm font-semibold text-white leading-relaxed mb-6">Ask me anything about this repository's structure.</p>
              <div className="flex items-center gap-2">
                 <input 
                   placeholder="Ask architectural question..." 
                   className="flex-1 bg-white/5 border border-white/5 rounded-xl h-10 px-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
                 />
                 <button className="h-10 w-10 shrink-0 bg-white rounded-xl text-zinc-950 flex items-center justify-center font-bold text-xs">GO</button>
              </div>
           </div>
        </div>
      </aside>
    </div>
  );
}

function NavItem({ children, active, subItem }: { children: ReactNode; active?: boolean; subItem?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all group relative overflow-hidden",
      active ? "bg-white/[0.06] text-white shadow-sm" : "text-zinc-500 hover:text-zinc-200"
    )}>
      <span className={cn(
        "relative z-10",
        subItem ? "text-xs pl-2" : ""
      )}>{children}</span>
      {active && (
        <motion.div 
          layoutId="active-nav-bg"
          className="absolute inset-0 bg-white/[0.02] pointer-events-none"
        />
      )}
    </button>
  );
}

function FeatureToggle({ active, onChange, title, description }: { active: boolean; onChange: (v: boolean) => void; title: string, description: string }) {
  return (
    <div className={cn(
      "p-5 rounded-3xl border transition-all duration-300 cursor-pointer group",
      active ? "bg-white/[0.04] border-indigo-500/30 shadow-2xl" : "bg-white/[0.02] border-transparent hover:border-white/5"
    )} onClick={() => onChange(!active)}>
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-xs font-bold uppercase tracking-widest transition-colors", active ? "text-white" : "text-zinc-400")}>{title}</span>
        <div className={cn(
          "w-8 h-4 rounded-full relative transition-colors duration-300",
          active ? "bg-indigo-600" : "bg-zinc-800"
        )}>
           <motion.div 
             animate={{ x: active ? 18 : 2 }}
             className="absolute top-1 w-2 h-2 bg-white rounded-full shadow-sm"
           />
        </div>
      </div>
      <p className="text-[10px] text-zinc-500 leading-tight font-medium group-hover:text-zinc-400 transition-colors">{description}</p>
    </div>
  );
}
