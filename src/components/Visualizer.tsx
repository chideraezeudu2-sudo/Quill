import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import mermaid from 'mermaid';
import { cn } from '../lib/utils';

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter',
});

const functions = [
  { id: 'f1', name: 'processPayment', service: 'billing-service', file: 'payment.ts', connections: 12 },
  { id: 'f2', name: 'validateToken', service: 'auth-service', file: 'auth.ts', connections: 45 },
  { id: 'f3', name: 'getUserProfile', service: 'user-service', file: 'user.ts', connections: 8 },
  { id: 'f4', name: 'encryptData', service: 'crypto-utils', file: 'crypto.ts', connections: 24 },
  { id: 'f5', name: 'sendEmailNotification', service: 'notification-service', file: 'mailer.ts', connections: 15 },
  { id: 'f6', name: 'generateReport', service: 'analytics-engine', file: 'reports.ts', connections: 7 },
];

export function Visualizer() {
  const [selectedFunc, setSelectedFunc] = useState(functions[0]);
  const [isZenMode, setIsZenMode] = useState(false);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
      const graphDefinition = `
        graph LR
          A[Client] -- Request --> B(${selectedFunc.name})
          B -- Scans --> C[Database]
          B -- Notifies --> D[Metrics]
          D -- Alert --> E[Admin]
          B -- Call --> F[External API]
          style B fill:#6366f1,stroke:#fff,stroke-width:2px,color:#fff
          style A fill:#18181b,stroke:#3b82f6
          style C fill:#18181b,stroke:#22c55e
          style D fill:#18181b,stroke:#a855f7
          style E fill:#18181b,stroke:#ef4444
          style F fill:#18181b,stroke:#f59e0b
      `.trim();

      mermaid.render('diagram-' + Math.random().toString(36).substr(2, 9), graphDefinition).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      });
    }
  }, [selectedFunc]);

  return (
    <div className="h-full flex overflow-hidden bg-zinc-950 relative">
      {/* Background technical grain/pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <AnimatePresence>
        {!isZenMode && (
          <motion.aside 
            initial={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-85 border-r border-white/5 flex flex-col overflow-hidden shrink-0 relative z-10 glass"
          >
            <div className="p-10 pb-12 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-white tracking-tighter">Blueprint</h2>
                <div className="px-2 py-0.5 rounded bg-brand/10 border border-brand/20 text-[8px] font-black text-brand uppercase tracking-widest">Live</div>
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Query logic topology..." 
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl py-3.5 px-6 text-xs text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-brand/30 transition-all font-bold tracking-tight shadow-xl"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 pb-12 space-y-2 custom-scrollbar mask-fade">
              {functions.map((func) => (
                <button
                  key={func.id}
                  onClick={() => setSelectedFunc(func)}
                  className={cn(
                    "w-full px-6 py-4 rounded-[24px] flex flex-col items-start transition-all group relative overflow-hidden border border-transparent",
                    selectedFunc.id === func.id 
                      ? "bg-white/[0.08] border-white/[0.08] text-white shadow-2xl" 
                      : "text-zinc-600 hover:bg-white/[0.03] hover:text-zinc-300"
                  )}
                >
                  <span className="text-base font-black tracking-tight mb-1 transition-transform duration-500 group-hover:translate-x-1">{func.name}</span>
                  <div className="flex items-center gap-3">
                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.2em] group-hover:text-zinc-500">{func.service}</span>
                  </div>
                  {selectedFunc.id === func.id && (
                    <motion.div 
                      layoutId="viz-sidebar-dot"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-brand rounded-r-full shadow-[0_0_15px_rgba(99,102,241,1)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-8 mt-auto relative z-20">
               <div className="p-8 glass rounded-[32px] space-y-6 border border-brand/20 bg-brand/[0.01] shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-brand/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative z-10">
                    <p className="text-[9px] font-black text-brand uppercase tracking-[0.3em] leading-none mb-3">Architectural Impact</p>
                    <p className="text-[13px] text-zinc-400 leading-relaxed font-bold tracking-tight">Affects <b>4 modules</b>. Critical drift detected in <b>Billing</b>.</p>
                  </div>
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className={cn(
        "flex-1 relative bg-zinc-950/20 backdrop-blur-3xl flex flex-col transition-all duration-500 overflow-hidden",
        isZenMode && "fixed inset-0 z-[60] bg-zinc-950"
      )}>
        <header className="px-8 py-6 flex items-center justify-between border-b border-white/[0.03]">
          <div className="flex items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tighter">{selectedFunc.name}</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Logic Flow Diagram</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] uppercase font-bold text-zinc-700 tracking-widest">Type:</span>
               <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">D3/Mermaid</span>
            </div>
          </div>
          <button 
            onClick={() => setIsZenMode(!isZenMode)}
            className="px-5 py-2 bg-white text-zinc-950 font-bold rounded-full text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-colors"
          >
            {isZenMode ? 'Back to Dashboard' : 'View Fullscreen'}
          </button>
        </header>

        <div className="flex-1 overflow-hidden flex items-center justify-center p-20 relative bg-dot-pattern">
          {/* Background dots */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <motion.div 
            key={selectedFunc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex items-center justify-center"
            ref={mermaidRef}
          />

          <div className="absolute bottom-12 right-12 flex flex-col gap-4">
             <div className="p-8 glass rounded-[32px] border border-white/5 min-w-[280px] shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Active Node</p>
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                </div>
                <div className="space-y-4">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Reference</span>
                      <span className="text-sm font-bold text-zinc-300">{selectedFunc.file}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Topology</span>
                      <span className="text-sm font-bold text-zinc-300">{selectedFunc.connections} Peer Nodes</span>
                   </div>
                   <button className="w-full mt-4 py-3 bg-white/[0.03] hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl border border-white/5 transition-all">
                      View Raw Architecture
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
