import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';

export const MissionLogModal = ({ isOpen, onClose, directive, onQuizGenerated }) => {
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!log.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await api.generateQuiz(log, 'medium'); // Default difficulty
      onQuizGenerated(result.quiz, log);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to transmit log. Connection to Worker AI unstable.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-sm" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg p-6 border border-cyan-500/30 bg-[#0a0a1a] shadow-[0_0_50px_rgba(6,182,212,0.1)] z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400"><X size={20} /></button>

          <h3 className="font-primary text-cyan-400 tracking-[0.2em] text-sm mb-6 flex items-center gap-2 border-b border-cyan-900/50 pb-2">
            <Cpu size={16} /> MISSION REPORT REQUIRED
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="font-secondary text-gray-400 text-xs leading-relaxed">
              Captain, to verify mission completion for <span className="text-cyan-300 font-bold">"{directive.title}"</span>, please submit a detailed log of your activities. 
              The AI Core will analyze this data to generate a competency assessment.
            </p>

            <textarea 
              value={log} 
              onChange={(e) => setLog(e.target.value)} 
              placeholder="Enter detailed mission log here..." 
              className="w-full h-32 bg-[#05000a] border border-cyan-900 text-cyan-100 font-secondary text-sm p-4 outline-none focus:border-cyan-400 resize-none transition-colors"
            />
            
            {error && <p className="text-red-500 text-xs font-primary tracking-widest">{error}</p>}

            <button 
              type="submit" 
              disabled={loading || !log.trim()} 
              className="mt-2 w-full py-3 bg-cyan-900/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-[#0a0a1a] font-primary text-xs tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'TRANSMITTING TO CORE...' : <>TRANSMIT LOG <Send size={14} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
