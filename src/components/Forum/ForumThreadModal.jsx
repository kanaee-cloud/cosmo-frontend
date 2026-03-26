import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForum } from '../../hooks/useForum';
import UserAvatar from '../common/UserAvatar';

export default function ForumThreadModal({ post, onClose }) {
  const [replyText, setReplyText] = useState('');
  const { useReplies, createReply } = useForum();
  const { data: replies, isLoading } = useReplies(post.id);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    createReply.mutate({ postId: post.id, content: replyText }, {
      onSuccess: () => setReplyText('')
    });
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-sm" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] bg-secondary border border-tertiary flex flex-col shadow-[0_0_50px_rgba(61,34,120,0.3)]"
        >
          <div className="p-5 border-b border-tertiary flex justify-between items-start bg-primary/30">
            <div>
              <span className="font-primary text-[8px] tracking-widest text-accent border border-accent/30 px-2 py-0.5 mb-2 inline-block">{post.category}</span>
              <h2 className="font-primary text-lg md:text-xl tracking-widest text-white">{post.title}</h2>
              <p className="font-secondary text-[10px] text-light/50 mt-1">BY {post.author?.username || 'UNKNOWN'} • {new Date(post.created_at).toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="text-light/50 hover:text-red-400"><X size={20} /></button>
          </div>

          {/* CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-primary/10">
            {/* Main Post Content */}
            <div className="mb-8 pb-8 border-b border-tertiary/50">
              <p className="font-secondary text-sm leading-relaxed text-light/90 whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Replies */}
            <div className="space-y-4">
              <h4 className="font-primary text-[10px] text-accent tracking-widest mb-4">TRANSMISSION LOGS ({replies?.length || 0})</h4>
              
              {isLoading ? (
                <div className="text-center font-primary text-[10px] text-tertiary animate-pulse">SYNCING REPLIES...</div>
              ) : replies?.map(reply => (
                <div key={reply.id} className="bg-primary/40 border border-tertiary/50 p-4 flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-dark border border-cyan-800 flex-shrink-0 flex items-center justify-center">
                    {reply.author?.avatar_url ? <UserAvatar avatarId={reply.author.avatar_url} size={20} /> : <Cpu size={14} className="text-cyan-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-secondary text-[10px] text-cyan-400 font-bold">{reply.author?.username}</span>
                      <span className="font-secondary text-[8px] text-light/30">{new Date(reply.created_at).toLocaleString()}</span>
                    </div>
                    <p className="font-secondary text-xs text-light/80 whitespace-pre-wrap">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REPLY INPUT */}
          <div className="p-4 border-t border-tertiary bg-primary/50 flex gap-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="ENTER YOUR RESPONSE..."
              className="flex-1 bg-transparent border border-tertiary focus:border-accent p-3 font-secondary text-xs text-white outline-none resize-none h-12 custom-scrollbar"
            />
            <button 
              onClick={handleSendReply}
              disabled={createReply.isPending || !replyText.trim()}
              className="px-6 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-[#0a0a1a] transition-colors disabled:opacity-50 flex items-center gap-2 font-primary text-[10px] tracking-widest"
            >
              <Send size={14} /> {createReply.isPending ? 'SENDING...' : 'REPLY'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}