import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForum } from '../../hooks/useForum';

// Kategori yang diizinkan sesuai dengan skema Database kita
const POST_CATEGORIES = ['GENERAL', 'TIPS', 'SUPPORT', 'LORE'];

export default function CreatePostModal({ onClose, currentCategory }) {
  // Jika tab saat ini 'ALL', atur default ke 'GENERAL'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(
    currentCategory === 'ALL' ? 'GENERAL' : currentCategory
  );

  const { createPost } = useForum();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    createPost.mutate(
      { title, content, category },
      { 
        onSuccess: () => {
          onClose(); // Tutup modal otomatis jika sukses
        } 
      }
    );
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-sm" 
        />
        
        {/* Modal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-secondary border border-accent/50 flex flex-col shadow-[0_0_50px_rgba(6,255,165,0.15)] overflow-hidden"
        >
          {/* Efek Garis Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,255,165,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

          {/* HEADER */}
          <div className="p-5 border-b border-tertiary flex justify-between items-center bg-primary/30 relative z-10">
            <div className="flex items-center gap-3">
              <Radio className="text-accent animate-pulse" size={20} />
              <h2 className="font-primary text-lg tracking-[0.2em] text-accent uppercase">
                NEW TRANSMISSION
              </h2>
            </div>
            <button onClick={onClose} className="text-light/50 hover:text-red-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* FORM AREA */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6 relative z-10">
            
            {/* Input: Judul Transmisi */}
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase">
                [ TRANSMISSION SUBJECT ]
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ENTER SUBJECT..."
                maxLength={100}
                autoFocus
                className="w-full bg-primary/50 border border-tertiary focus:border-accent p-3 font-secondary text-sm text-white outline-none transition-colors duration-300 ease-in-out"
              />
            </div>

            {/* Input: Kategori */}
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase">
                [ FREQUENCY CHANNEL ]
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {POST_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    // PERUBAHAN DI SINI: duration-300 ease-in-out
                    className={`p-3 border font-primary text-[10px] tracking-widest transition-all duration-300 ease-in-out ${
                      category === cat
                        ? 'border-accent bg-accent/20 text-accent shadow-[0_0_10px_rgba(6,255,165,0.2)]'
                        : 'border-tertiary/50 bg-primary/30 text-light/50 hover:border-accent/50 hover:text-light'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Input: Konten Pesan */}
            <div className="flex flex-col gap-2">
              <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase">
                [ MESSAGE PAYLOAD ]
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="WRITE YOUR MESSAGE HERE..."
                className="w-full bg-primary/50 border border-tertiary focus:border-accent p-4 font-secondary text-sm text-white outline-none resize-none h-40 custom-scrollbar transition-colors duration-300 ease-in-out"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-tertiary/50">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white font-primary text-[10px] tracking-widest transition-colors duration-300 ease-in-out"
              >
                ABORT
              </button>
              <button
                type="submit"
                disabled={createPost.isPending || !title.trim() || !content.trim()}
                className="px-8 py-3 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-[#0a0a1a] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-primary text-[10px] tracking-[0.2em] shadow-[0_0_15px_rgba(6,255,165,0.2)] hover:shadow-[0_0_25px_rgba(6,255,165,0.5)]"
              >
                <Send size={14} />
                {createPost.isPending ? 'BROADCASTING...' : 'BROADCAST'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}