import React, { useState } from 'react';
import { MessageSquare, Plus, Flame, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForum } from '../hooks/useForum';
import ForumThreadModal from '../components/Forum/ForumThreadModal';
import CreatePostModal from '../components/Forum/CreatePostModal';
import UserAvatar from '../components/common/UserAvatar';

const CATEGORIES = [
  { id: 'ALL', label: 'ALL CHANNELS', icon: <MessageSquare size={14} /> },
  { id: 'GENERAL', label: 'GENERAL COMMS', icon: <Cpu size={14} /> },
  { id: 'TIPS', label: 'TACTICAL TIPS', icon: <Flame size={14} /> },
  { id: 'SUPPORT', label: 'SOS SUPPORT', icon: <ShieldAlert size={14} /> },
];

export default function Forum() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const { usePosts } = useForum();
  const { data: posts, isLoading } = usePosts(activeCategory);

  return (
    <div className="min-h-screen w-full p-4 md:p-8 text-text max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-tertiary pb-6">
        <div>
          <h1 className="font-primary text-3xl tracking-[0.2em] text-accent uppercase mb-2">
            COMMS NETWORK
          </h1>
          <p className="font-secondary text-xs text-light/50 tracking-widest uppercase">
            GLOBAL DISCUSSION CHANNELS
          </p>
        </div>
        <button 
          onClick={() => setIsCreatingPost(true)}
          className="flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent text-accent font-primary text-xs tracking-widest hover:bg-accent hover:text-[#0a0a1a] transition-all shadow-[0_0_15px_rgba(6,255,165,0.2)]"
        >
          <Plus size={16} /> NEW THREAD
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* SIDEBAR CATEGORY */}
        <div className="w-full lg:w-64 flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 p-4 border transition-all duration-300 font-primary text-[10px] tracking-widest text-left ${
                activeCategory === cat.id 
                  ? 'border-accent bg-accent/10 text-accent shadow-[inset_4px_0_0_rgba(6,255,165,1)]' 
                  : 'border-tertiary/30 bg-secondary text-light/50 hover:border-tertiary hover:text-light'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* THREAD LIST */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {isLoading ? (
            <div className="p-10 text-center font-primary text-accent animate-pulse text-xs tracking-widest border border-dashed border-tertiary">
              SCANNING FREQUENCIES...
            </div>
          ) : posts?.length === 0 ? (
            <div className="p-10 text-center font-secondary text-light/50 text-xs tracking-widest border border-dashed border-tertiary">
              NO TRANSMISSIONS DETECTED IN THIS CHANNEL.
            </div>
          ) : (
            posts?.map(post => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedPost(post)}
                className="p-5 bg-secondary border border-tertiary hover:border-accent/50 cursor-pointer transition-all group flex flex-col sm:flex-row gap-4 justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-primary text-[8px] tracking-widest px-2 py-0.5 border border-tertiary text-light/70 bg-primary">
                      {post.category}
                    </span>
                    <span className="font-secondary text-[10px] text-light/40">
                      • {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-primary text-sm md:text-base tracking-widest text-white group-hover:text-accent transition-colors truncate mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-dark border border-accent overflow-hidden flex justify-center items-center">
                       {post.author?.avatar_url ? <UserAvatar avatarId={post.author.avatar_url} size={14} /> : <div className="w-full h-full bg-accent/20" />}
                    </div>
                    <span className="font-secondary text-[10px] text-cyan-400">
                      {post.author?.username || 'UNKNOWN PILOT'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-center sm:border-l sm:border-tertiary/50 sm:pl-4">
                  <div className="flex items-center gap-2 text-light/50 group-hover:text-accent transition-colors">
                    <MessageSquare size={16} />
                    <span className="font-primary text-xs">{post.replies?.[0]?.count || 0}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* MODALS */}
      {selectedPost && (
        <ForumThreadModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      {isCreatingPost && (
        <CreatePostModal onClose={() => setIsCreatingPost(false)} currentCategory={activeCategory} />
      )}
    </div>
  );
}