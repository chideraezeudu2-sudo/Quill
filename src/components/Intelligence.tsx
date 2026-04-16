import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export function Intelligence() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "I've analyzed the recent repository changes. The architectural health of 'quill-core' has improved by 4%. Would you like a summary of the deleted technical debt?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm processing the 'quill-core' dependency graph to answer that. One moment..." 
      }]);
    }, 1000);
  };

  return (
    <div className="flex h-full overflow-hidden bg-zinc-950">
      {/* Sidebar: Capabilities */}
      <aside className="w-80 border-r border-white/5 flex flex-col p-8 space-y-12">
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em] px-2">Intelligence Hub</p>
          <div className="space-y-1">
            <HubItem active>Onboarding Search</HubItem>
            <HubItem>Tech Spec Generator</HubItem>
            <HubItem>Vulnerability Scan</HubItem>
            <HubItem>Newsletter Logs</HubItem>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em] px-2">Insights</p>
          <div className="p-6 glass rounded-3xl space-y-4">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Health</span>
                <span className="text-xl font-bold text-white tracking-tighter">84.2%</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Drift Detected</span>
                <span className="text-xs font-bold text-indigo-400 leading-none">3 Modules unstable</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-zinc-950/20 relative overflow-hidden">
        {/* Atmospheric mesh light for the chat area */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex-1 overflow-y-auto px-12 py-20 space-y-16 custom-scrollbar mask-fade relative z-10 font-medium">
          <div className="max-w-3xl mx-auto space-y-16">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "flex items-start gap-10",
                    msg.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-3 h-3 rounded-full shrink-0 mt-1.5 transition-shadow duration-1000",
                    msg.role === 'assistant' 
                      ? "bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)]" 
                      : "bg-white/30"
                  )} />
                  <div className={cn(
                    "flex-1 text-[15px] leading-relaxed tracking-tight transition-colors duration-500",
                    msg.role === 'assistant' ? "text-zinc-200" : "text-white text-right"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-12 pt-0 relative z-20">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-brand/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none duration-1000" />
            <div className="relative glass rounded-[40px] p-2.5 flex items-center gap-3 border-white/[0.06] shadow-2xl backdrop-blur-3xl group-focus-within:border-brand/30 transition-all duration-500">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to Quill Intelligence..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-8 py-5 text-base font-semibold tracking-tight placeholder:text-zinc-700"
              />
              <button 
                onClick={handleSend}
                className="w-14 h-14 bg-white text-zinc-950 rounded-[28px] flex items-center justify-center font-black text-xs hover:bg-zinc-200 transition-all shrink-0 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
              >
                SEND
              </button>
            </div>
            
            <div className="flex items-center gap-6 mt-6 px-4">
               <PromptSuggestion>Summarize quill-api health</PromptSuggestion>
               <PromptSuggestion>Explain module-federation</PromptSuggestion>
               <PromptSuggestion>Check vulnerabilities</PromptSuggestion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function HubItem({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden",
      active ? "bg-white/[0.06] text-white" : "text-zinc-500 hover:text-zinc-300"
    )}>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      {active && (
        <motion.div 
          layoutId="intelligence-nav"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-indigo-500 rounded-r-full"
        />
      )}
    </button>
  );
}

function PromptSuggestion({ children }: { children: ReactNode }) {
  return (
    <button className="text-[10px] font-bold text-zinc-600 hover:text-indigo-400 uppercase tracking-widest transition-colors">
      {children}
    </button>
  );
}
