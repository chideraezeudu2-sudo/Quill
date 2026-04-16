/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { CommandMenu } from './components/CommandMenu';
import { Dashboard } from './components/Dashboard';
import { Reader } from './components/Reader';
import { Visualizer } from './components/Visualizer';
import { Intelligence } from './components/Intelligence';
import { Settings } from './components/Settings';

export type Tab = 'projects' | 'library' | 'blueprint' | 'intelligence' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <Dashboard />;
      case 'library':
        return <Reader />;
      case 'blueprint':
        return <Visualizer />;
      case 'intelligence':
        return <Intelligence />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden selection:bg-white/10">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <CommandMenu 
        open={isSearchOpen} 
        setOpen={setIsSearchOpen} 
        onSelectTab={(tab) => {
          setActiveTab(tab as Tab);
          setIsSearchOpen(false);
        }}
      />
    </div>
  );
}
