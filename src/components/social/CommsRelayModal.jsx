import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, UserPlus, Bell, Check, Users, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocial } from '../../hooks/useSocial';

export const CommsRelayModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('INBOX'); // INBOX atau RADAR
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Pastikan useSocial sudah mengekspor acceptAction, bukan acceptRequest
  const { useInbox, searchCaptains, sendFriendRequest, acceptAction } = useSocial();
  const { data: notifications, isLoading: inboxLoading } = useInbox();

  // Handle Search dengan sedikit delay (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setIsSearching(true);
        try {
          const results = await searchCaptains(searchQuery);
          setSearchResults(results);
        } catch (err) { console.error(err); }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // UX Esc & Body Scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('keydown', handleEsc); };
  }, [isOpen, onClose]);

  const handleAddFriend = (userId) => {
    sendFriendRequest.mutate(userId, {
      onSuccess: () => alert("TRANSMISSION SENT!"),
      onError: () => alert("TRANSMISSION FAILED. MIGHT BE ALREADY PENDING.")
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-secondary/95 border border-light shadow-[0_0_50px_rgba(61,34,120,0.3)] overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header & Tabs */}
            <div className="p-6 pb-0 border-b border-light/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-primary text-light tracking-[0.25em] text-sm flex items-center gap-2">
                  <Bell size={16} className="text-accent" /> COMMS RELAY
                </h3>
                <button onClick={onClose} className="text-gray-500 hover:text-accent"><X size={20} /></button>
              </div>
              
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('INBOX')} className={`pb-3 font-primary text-[10px] tracking-widest border-b-2 transition-colors ${activeTab === 'INBOX' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  INCOMING ({notifications?.filter(n => !n.is_read).length || 0})
                </button>
                <button onClick={() => setActiveTab('RADAR')} className={`pb-3 font-primary text-[10px] tracking-widest border-b-2 transition-colors ${activeTab === 'RADAR' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  RADAR SCAN
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              {/* TAB 1: INBOX */}
              {activeTab === 'INBOX' && (
                <div className="space-y-4">
                  {inboxLoading ? (
                    <p className="text-center font-primary text-[10px] text-accent animate-pulse mt-10">SYNCING FEED...</p>
                  ) : notifications?.length === 0 ? (
                    <div className="text-center border border-dashed border-light/50 p-8 text-gray-500 font-secondary text-[10px] tracking-widest mt-4">
                      NO NEW TRANSMISSIONS.
                    </div>
                  ) : (
                    notifications?.map(notif => (
                      <div key={notif.id} className={`p-4 border ${notif.is_read ? 'border-gray-800 bg-primary/30' : 'border-light/80 bg-light/10'} flex items-center justify-between gap-4`}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-dark border border-accent overflow-hidden flex items-center justify-center">
                            {notif.sender?.avatar_url ? <img src={notif.sender.avatar_url} alt="sender" /> : <Users size={20} className="text-accent" />}
                          </div>
                          <div>
                            <p className="font-secondary text-[12px] text-light">
                              <span className="text-cyan-400 font-bold">{notif.sender?.username}</span> {notif.message}
                            </p>
                            <span className="font-primary text-[8px] text-gray-500 tracking-widest mt-1 block">
                              {new Date(notif.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Tombol Aksi (Hanya muncul jika belum dibaca) */}
                        {!notif.is_read && (
                          <div className="flex-shrink-0">
                            {notif.type === 'FRIEND_REQUEST' && (
                              <button 
                                onClick={() => acceptAction.mutate({ type: notif.type, relatedId: notif.related_id, notificationId: notif.id })}
                                className="px-3 py-1.5 bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-dark font-primary text-[9px] tracking-widest transition-colors flex items-center gap-1"
                              >
                                <Check size={12} /> ACCEPT
                              </button>
                            )}

                            {notif.type === 'WORKSPACE_INVITE' && (
                              <button 
                                onClick={() => acceptAction.mutate({ type: notif.type, relatedId: notif.related_id, notificationId: notif.id })}
                                className="px-3 py-1.5 bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-primary text-[9px] tracking-widest transition-colors flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                              >
                                <Swords size={12} /> JOIN RAID
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: RADAR (Search Users) */}
              {activeTab === 'RADAR' && (
                <div>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ENTER CAPTAIN'S USERNAME..." 
                      className="w-full bg-primary border border-light/80 text-text font-secondary text-[10px] tracking-wider pl-10 pr-4 py-3 outline-none focus:border-cyan-500"
                    />
                  </div>

                  {isSearching ? (
                    <p className="text-center font-primary text-[10px] text-accent animate-pulse">SCANNING SECTOR...</p>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map(user => (
                        <div key={user.id} className="p-3 border border-light/40 bg-primary/50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-dark border border-cyan-800 overflow-hidden">
                              {user.avatar_url ? <img src={user.avatar_url} alt="avatar" /> : <Users size={16} className="text-gray-500 m-auto h-full" />}
                            </div>
                            <div>
                              <p className="font-primary text-[12px] text-light tracking-widest">{user.username}</p>
                              <p className="font-secondary text-[9px] text-cyan-400">EXP: {user.fuel_cells}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAddFriend(user.id)}
                            disabled={sendFriendRequest.isPending}
                            className="px-3 py-1.5 border border-accent text-accent hover:bg-accent hover:text-white font-primary text-[9px] tracking-widest transition-colors"
                          >
                            <UserPlus size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length >= 3 ? (
                    <p className="text-center text-gray-500 font-secondary text-[10px] mt-8 tracking-widest">NO SIGNALS DETECTED.</p>
                  ) : (
                    <p className="text-center text-gray-600 font-secondary text-[10px] mt-8 tracking-widest">INPUT AT LEAST 3 CHARACTERS TO SCAN.</p>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};