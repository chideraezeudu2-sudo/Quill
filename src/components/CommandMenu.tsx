import { ReactNode } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelectTab: (tab: string) => void;
}

export function CommandMenu({ open, setOpen, onSelectTab }: CommandMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl glass rounded-[32px] overflow-hidden shadow-2xl relative border-white/[0.08]"
          >
            <div className="flex items-center px-8 border-b border-white/[0.05]">
              <Command.Input
                placeholder="Search across repositories and documentation..."
                className="w-full h-20 bg-transparent border-none focus:ring-0 text-white placeholder-zinc-500 text-lg font-medium tracking-tight"
              />
              <div className="px-3 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                ESC
              </div>
            </div>

            <Command.List className="max-h-[380px] overflow-y-auto p-4 space-y-2 custom-scrollbar">
              <Command.Empty className="py-16 text-center text-sm text-zinc-500 font-medium tracking-tight">
                No architectural patterns found.
              </Command.Empty>

              <Command.Group heading={<p className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Navigation</p>}>
                <Item onSelect={() => onSelectTab('projects')}>Jump to Repositories</Item>
                <Item onSelect={() => onSelectTab('library')}>Browse Library</Item>
                <Item onSelect={() => onSelectTab('blueprint')}>Open Visualizer</Item>
                <Item onSelect={() => onSelectTab('intelligence')}>Ask Intelligence Hub</Item>
              </Command.Group>

              <Command.Separator className="h-[1px] bg-white/[0.03] my-4 mx-4" />

              <Command.Group heading={<p className="px-4 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Deep Links</p>}>
                <Item>API Reference Guide</Item>
                <Item>Architecture Design Patterns</Item>
                <Item>Security Audit Logs</Item>
              </Command.Group>
            </Command.List>
            
            <div className="p-5 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em] px-10">
               <span>Search</span>
               <span>Navigate</span>
               <span>Select</span>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}

function Item({ children, onSelect }: { children: ReactNode; onSelect?: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold text-zinc-400 aria-selected:bg-white/[0.06] aria-selected:text-white transition-all cursor-pointer group relative overflow-hidden"
    >
      <span className="relative z-10 transition-transform duration-300 group-aria-selected:translate-x-1">{children}</span>
      <div className="opacity-0 group-aria-selected:opacity-100 transition-opacity w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
    </Command.Item>
  );
}
