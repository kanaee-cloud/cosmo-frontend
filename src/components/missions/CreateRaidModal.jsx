// src/components/missions/CreateRaidModal.jsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaces } from '../../hooks/useWorkspaces';

export const CreateRaidModal = ({ isOpen, onClose }) => {
  const [operationName, setOperationName] = useState('');
  const [monsterName, setMonsterName] = useState('VOID LEVIATHAN');
  const { createWorkspace } = useWorkspaces();

  const handleSummon = (e) => {
    e.preventDefault();
    if (!operationName) return;
    
    createWorkspace.mutate(
      { name: operationName, monsterName: monsterName },
      { onSuccess: () => {
          setOperationName('');
          onClose();
      }}
    );
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-6 border border-red-900/80 bg-secondary/95 shadow-[0_0_50px_rgba(255,0,85,0.2)] z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-400"><X size={20} /></button>
          
          <h3 className="font-primary text-red-500 tracking-[0.2em] text-sm mb-6 flex items-center gap-2 border-b border-red-900/50 pb-2">
            <Skull size={16} /> SUMMON BOSS RAID
          </h3>

          <form onSubmit={handleSummon} className="flex flex-col gap-4">
            <div>
              <label className="font-secondary text-[10px] text-gray-400 tracking-widest mb-1 block">OPERATION NAME (WORKSPACE)</label>
              <input type="text" value={operationName} onChange={(e) => setOperationName(e.target.value)} placeholder="e.g. Website Redesign" className="w-full bg-primary border border-light text-text font-secondary text-xs px-4 py-3 outline-none focus:border-red-500" required />
            </div>
            <div>
              <label className="font-secondary text-[10px] text-gray-400 tracking-widest mb-1 block">TARGET MONSTER NAME</label>
              <input type="text" value={monsterName} onChange={(e) => setMonsterName(e.target.value)} className="w-full bg-primary border border-light text-text font-secondary text-xs px-4 py-3 outline-none focus:border-red-500" required />
            </div>
            
            <button type="submit" disabled={createWorkspace.isPending} className="mt-4 px-6 py-3 bg-red-900/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-primary text-[10px] tracking-[0.2em] transition-colors disabled:opacity-50">
              {createWorkspace.isPending ? 'SUMMONING...' : 'INITIATE RAID'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};