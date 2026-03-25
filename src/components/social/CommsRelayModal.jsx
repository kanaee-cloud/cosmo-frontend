import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, UserPlus, Bell, Check, Users, Swords, ShieldOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocial } from '../../hooks/useSocial';
import { toast } from '../../hooks/useToast';

export const CommsRelayModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('INBOX'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Tambahkan declineAction di hook useSocial Anda
  const { useInbox, markAllAsRead, searchCaptains, sendFriendRequest, acceptAction, declineAction } = useSocial();
  const { data: notifications, isLoading: inboxLoading } = useInbox();

  // Mark all as read when modal opens
  useEffect(() => {
    if (isOpen) {
        markAllAsRead.mutate();
    }
  }, [isOpen]);

  // Handle Search Debounce
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
      onSuccess: () => toast.success("SUCCESS", "TRANSMISSION SENT!"),
      onError: () => toast.error("FAILED", "TRANSMISSION FAILED. MIGHT BE ALREADY PENDING.")
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-secondary/95 border border-light shadow-[0_0_50px_rgba(61,34,120,0.4)] overflow-hidden flex flex-col h-[550px]"
          >
            {/* Dekorasi Frame Sci-Fi */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent" />
            
            {/* Header & Tabs */}
            <div className="p-6 pb-0 border-b border-light/30 bg-primary/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-primary text-light tracking-[0.25em] text-sm flex items-center gap-3">
                  <Bell size={18} className="text-accent" /> COMMS RELAY
                </h3>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors"><X size={20} /></button>
              </div>
              
              <div className="flex gap-6">
                <button onClick={() => setActiveTab('INBOX')} className={`pb-3 font-primary text-[10px] tracking-widest border-b-2 transition-colors relative ${activeTab === 'INBOX' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  INCOMING 
                  {notifications?.filter(n => !n.is_read).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white px-1.5 py-0.5 rounded-sm text-[8px]">{notifications?.filter(n => !n.is_read).length}</span>
                  )}
                </button>
                <button onClick={() => setActiveTab('RADAR')} className={`pb-3 font-primary text-[10px] tracking-widest border-b-2 transition-colors ${activeTab === 'RADAR' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                  RADAR SCAN
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-primary/10">
              
              {/* TAB 1: INBOX */}
              {activeTab === 'INBOX' && (
                <div className="space-y-3">
                  {inboxLoading ? (
                    <p className="text-center font-primary text-[10px] text-accent animate-pulse mt-10">SYNCING FEED...</p>
                  ) : notifications?.length === 0 ? (
                    <div className="text-center border border-dashed border-light/30 p-8 text-gray-500 font-secondary text-[10px] tracking-widest mt-4">
                      NO NEW TRANSMISSIONS IN THIS SECTOR.
                    </div>
                  ) : (
                    notifications?.map(notif => (
                      <div key={notif.id} className={`p-4 border transition-colors ${notif.is_read ? 'border-gray-800 bg-primary/30 opacity-70' : 'border-light/60 bg-light/5 hover:border-accent/50'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                        
                        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                          {/* AVATAR ANTI-GENCET (flex-shrink-0) */}
                          <div className="w-10 h-10 rounded-full bg-dark border border-accent overflow-hidden flex items-center justify-center flex-shrink-0">
                            {notif.sender?.avatar_url ? <img src={notif.sender.avatar_url} alt="sender" className="w-full h-full object-cover" /> : <Users size={18} className="text-accent" />}
                          </div>
                          
                          {/* TEXT CONTAINER (min-w-0 untuk mengizinkan text-truncate) */}
                          <div className="flex-1 min-w-0">
                            <p className="font-primary text-xs text-light leading-relaxed">
                              <span className="text-cyan-400 font-bold">{notif.sender?.username}</span> {notif.message}
                            </p>
                            <span className="font-primary text-[8px] text-gray-500 tracking-widest mt-1.5 block">
                              {new Date(notif.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        {/* TOMBOL AKSI (Akan turun ke bawah di mobile, di kanan di desktop) */}
                        {!notif.is_read && (
                          <div className="flex items-center gap-2 flex-shrink-0 mt-2 sm:mt-0 w-full sm:w-auto">
                            
                            {/* Tombol Reject/Decline (Universal untuk semua tipe) */}
                            <button 
                              onClick={() => declineAction?.mutate({ notificationId: notif.id, relatedId: notif.related_id, type: notif.type })}
                              className="flex-1 sm:flex-none px-3 py-2 bg-gray-900/50 border border-gray-700 text-gray-400 hover:bg-red-900/30 hover:border-red-500 hover:text-red-400 font-primary text-[9px] tracking-widest transition-all flex justify-center items-center gap-1.5"
                              title="Decline"
                            >
                              <X size={12} /> <span className="sm:hidden">DECLINE</span>
                            </button>

                            {/* Tombol Accept Friend Request */}
                            {notif.type === 'FRIEND_REQUEST' && (
                              <button 
                                onClick={() => acceptAction.mutate({ type: notif.type, relatedId: notif.related_id, notificationId: notif.id })}
                                className="flex-1 sm:flex-none px-4 py-2 bg-green-900/20 border border-green-500 text-green-400 hover:bg-green-500 hover:text-dark font-primary text-[9px] tracking-widest transition-all flex justify-center items-center gap-1.5 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                              >
                                <Check size={12} /> ACCEPT
                              </button>
                            )}

                            {/* Tombol Join Raid */}
                            {notif.type === 'WORKSPACE_INVITE' && (
                              <button 
                                onClick={() => acceptAction.mutate({ type: notif.type, relatedId: notif.related_id, notificationId: notif.id })}
                                className="flex-1 sm:flex-none px-4 py-2 bg-red-900/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-primary text-[9px] tracking-widest transition-all flex justify-center items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
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

              {/* TAB 2: RADAR SCAN */}
              {activeTab === 'RADAR' && (
                <div>
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ENTER CAPTAIN'S USERNAME..." 
                      className="w-full bg-primary/50 border border-light/30 text-light font-primary text-[10px] tracking-wider pl-12 pr-4 py-3.5 outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-3">
                       <div className="w-8 h-8 border border-dashed border-accent rounded-full animate-spin-slow"></div>
                       <p className="font-primary text-[10px] text-accent tracking-widest">SCANNING SECTOR...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map(user => (
                        <div key={user.id} className="p-3 border border-light/30 bg-primary/40 flex items-center justify-between hover:border-accent/50 transition-colors">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* AVATAR ANTI-GENCET RADAR */}
                            <div className="w-10 h-10 rounded-full bg-dark border border-cyan-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                              {user.avatar_url ? <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : <Users size={16} className="text-gray-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-primary text-[11px] text-light tracking-widest truncate">{user.username}</p>
                              <p className="font-secondary text-[9px] text-cyan-400 mt-0.5 flex items-center gap-1">
                                <Zap size={8} /> EXP: {user.fuel_cells}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleAddFriend(user.id)}
                            disabled={sendFriendRequest.isPending}
                            className="flex-shrink-0 px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-dark font-primary text-[9px] tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <UserPlus size={12} /> ADD
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length >= 3 ? (
                    <div className="text-center border border-dashed border-red-900/50 bg-red-900/10 p-8 mt-4">
                      <ShieldOff size={24} className="text-red-500 mx-auto mb-3 opacity-50" />
                      <p className="text-red-400 font-secondary text-[10px] tracking-widest">NO SIGNALS DETECTED MATCHING "{searchQuery}".</p>
                    </div>
                  ) : (
                    <p className="text-center text-gray-600 font-secondary text-[10px] mt-10 tracking-widest">INPUT AT LEAST 3 CHARACTERS TO INITIATE SCAN.</p>
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