import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Crosshair, CheckCircle, CircleDashed, Plus, 
  ArrowLeft, Zap, Users, Shield, Radar, Radio, UserPlus 
} from 'lucide-react';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import { useSocial } from '../../hooks/useSocial';
import UserAvatar from '../common/UserAvatar';
import monsterVideo from '../../assets/monster.mp4';

export const WorkspaceArena = ({ workspaceId, workspaceName, monsterName, onBack }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');

  const { useWorkspaceRaid, dealDamage, addRaidObjective, recruitAlly } = useWorkspaces();
  const { data: raid, isLoading } = useWorkspaceRaid(workspaceId);
  
  const { useFriendsList } = useSocial();
  const { data: friends } = useFriendsList();

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center font-primary text-accent text-xs tracking-[0.3em] animate-pulse">
      ESTABLISHING HOLO-LINK...
    </div>
  );
  if (!raid) return null;

  const hpPercentage = (raid.boss.currentHp / raid.boss.maxHp) * 100;
  const availableFriends = friends?.filter(f => !raid.members.some(m => m.id === f.id)) || [];

  const handleAddObjective = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addRaidObjective.mutate({ workspaceId, title: newTaskTitle }, { onSuccess: () => setNewTaskTitle('') });
  };

  const handleRecruit = () => {
    if (!selectedFriend) return;
    recruitAlly.mutate({ workspaceId, workspaceName, friendId: selectedFriend }, { onSuccess: () => setSelectedFriend('') });
  };

  return (
    <div className="relative w-full border border-accent/30 bg-[#0A0F15]/90 backdrop-blur-xl p-4 md:p-8 shadow-[inset_0_0_80px_rgba(6,182,212,0.05)]">
      
      {/* Decorative Cybernetic Background Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-accent to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      {/* --- TOP NAV / BACK --- */}
      <div className="relative z-20 flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-accent/5 hover:bg-accent/20 border border-accent/30 text-accent font-primary text-[10px] tracking-[0.2em] transition-all"
        >
          <ArrowLeft size={14} /> RETREAT
        </button>
        <div className="text-right">
          <p className="font-secondary text-[8px] text-accent/60 tracking-widest uppercase">COMBAT ZONE</p>
          <h3 className="font-primary text-white text-xs tracking-[0.3em] uppercase">{workspaceName}</h3>
        </div>
      </div>

      {/* --- MAIN DASHBOARD LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* LOKASI KIRI: BOSS HOLOGRAM & WEAPON PAYLOADS (TASKS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* BOSS PANEL */}
          <div className="relative border border-accent/20 bg-black/40 p-6 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50" />
            
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 mt-4">
              <div className="absolute inset-[-10px] border border-dashed border-accent/40 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[-20px] border border-accent/10 rounded-full border-t-accent/50 animate-[spin_10s_linear_infinite_reverse]" />
              
              <div className="w-full h-full rounded-full border-2 border-accent/80 overflow-hidden relative shadow-[0_0_40px_rgba(6,182,212,0.3)] bg-black">
                <video 
                  src={monsterVideo} autoPlay loop muted playsInline 
                  className={`w-full h-full object-cover transition-all duration-1000 ${raid.boss.isDefeated ? 'opacity-30 grayscale blur-[2px]' : 'opacity-100'}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay"></div>
                {raid.boss.isDefeated && (
                  <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center pointer-events-none">
                    <Crosshair size={50} className="text-red-500 animate-pulse drop-shadow-[0_0_10px_red]" />
                  </div>
                )}
              </div>
            </div>

            <h2 className={`font-primary text-xl md:text-2xl tracking-[0.3em] uppercase mb-4 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] ${raid.boss.isDefeated ? 'text-red-500 line-through' : 'text-accent'}`}>
              <ShieldAlert size={24} /> {monsterName || 'VOID ENTITY'}
            </h2>

            <div className="w-full max-w-lg bg-black/80 h-8 border-y border-accent/50 relative overflow-hidden skew-x-[-15deg] shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_10px,rgba(6,182,212,0.1)_10px,rgba(6,182,212,0.1)_11px)] bg-[length:11px_100%] pointer-events-none" />
              <motion.div 
                className={`h-full ${raid.boss.isDefeated ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-600 to-accent'}`}
                initial={{ width: "100%" }}
                animate={{ width: `${Math.max(0, hpPercentage)}%` }}
                transition={{ duration: 0.8, type: "spring" }}
              />
              <div className="absolute inset-0 flex items-center justify-center skew-x-[15deg]">
                <span className="font-primary text-white text-[10px] md:text-xs tracking-[0.3em] drop-shadow-md">
                  {raid.boss.isDefeated ? 'TARGET DESTROYED' : `INTEGRITY: ${raid.boss.currentHp} / ${raid.boss.maxHp}`}
                </span>
              </div>
            </div>
          </div>

          {/* OBJECTIVES PANEL */}
          <div className="border border-accent/20 bg-black/40 p-5">
            <h3 className="font-primary text-accent text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-accent/20 pb-2">
              <Zap size={14}/> WEAPON PAYLOADS (TASKS)
            </h3>

            {!raid.boss.isDefeated && (
              <form onSubmit={handleAddObjective} className="flex gap-2 mb-4">
                <input 
                  type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="LOAD NEW AMMUNITION..." 
                  className="flex-1 bg-accent/5 border border-accent/30 text-white font-secondary text-xs px-4 py-2 outline-none focus:border-accent focus:bg-accent/10 transition-all placeholder:text-accent/30" 
                />
                <button type="submit" disabled={addRaidObjective.isPending} className="px-6 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-black font-primary text-[10px] transition-all">
                  <Plus size={16} />
                </button>
              </form>
            )}
            
            {raid.directives.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-accent/30 bg-accent/5">
                <p className="text-accent/50 font-secondary text-[10px] tracking-widest">MAGAZINE EMPTY. LOAD TASKS TO DEAL DAMAGE.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                {raid.directives.map((task) => (
                  <div key={task.id} className={`flex flex-col md:flex-row justify-between md:items-center gap-3 p-3 border transition-all ${task.status === 'COMPLETED' ? 'border-accent/20 bg-accent/5 opacity-50' : 'border-accent/40 bg-accent/10 hover:border-accent'}`}>
                    <div className="flex items-start md:items-center gap-3">
                      {task.status === 'COMPLETED' ? <CheckCircle className="text-accent mt-0.5 md:mt-0 flex-shrink-0" size={16} /> : <CircleDashed className="text-accent/60 mt-0.5 md:mt-0 flex-shrink-0" size={16} />}
                      <div>
                        <span className={`font-secondary text-xs tracking-wide block ${task.status === 'COMPLETED' ? 'text-accent/50 line-through' : 'text-white'}`}>{task.title}</span>
                        <span className="font-primary text-[8px] tracking-[0.2em] text-accent/60 mt-1 block">
                          ATK PWR: {task.exp_reward || 100} DMG
                        </span>
                      </div>
                    </div>
                    {task.status !== 'COMPLETED' && (
                      <button 
                        onClick={() => dealDamage.mutate(task.id)}
                        disabled={dealDamage.isPending || raid.boss.isDefeated}
                        className="px-4 py-2 bg-accent/20 border border-accent/50 text-accent hover:bg-accent hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] font-primary text-[9px] tracking-[0.2em] transition-all flex-shrink-0 disabled:opacity-50"
                      >
                        {dealDamage.isPending ? 'FIRING...' : 'FIRE PAYLOAD'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* LOKASI KANAN: SQUADRON TELEMETRY & RECRUITMENT */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* PARTY MEMBERS */}
          <div className="border border-accent/20 bg-black/40 p-5 flex-1">
            <h3 className="font-primary text-accent text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-accent/20 pb-2">
              <Users size={14}/> SQUADRON TELEMETRY
            </h3>
            <div className="space-y-3 mb-6">
              {raid.members.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-2 border-l-2 border-accent/50 bg-accent/5">
                  <div className="w-8 h-8 bg-black border border-accent/50 flex justify-center items-center overflow-hidden">
                     {member.avatar_url ? <UserAvatar avatarId={member.avatar_url} size={18} className="opacity-80" /> : <Shield className="text-accent/60" size={16} />}
                  </div>
                  <div>
                    <span className="font-primary text-[10px] text-white tracking-[0.2em] block">{member.username}</span>
                    <span className="font-secondary text-[8px] text-accent/70 tracking-widest uppercase">Status: Online</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ======================================================= */}
            {/* GAMIFIED RECRUITMENT FORM (RADAR SCANNER LIST)          */}
            {/* ======================================================= */}
            {!raid.boss.isDefeated && availableFriends.length > 0 && (
              <div className="mt-auto pt-4 border-t border-dashed border-accent/30">
                
                {/* Radar Header */}
                <div className="flex items-center justify-between bg-accent/10 p-2 border border-accent/30 mb-3">
                  <div className="flex items-center gap-2">
                    <Radar size={14} className="text-accent animate-[spin_3s_linear_infinite]" />
                    <span className="font-primary text-[8px] text-accent tracking-[0.2em]">ALLIES DETECTED</span>
                  </div>
                  <span className="font-secondary text-[10px] text-accent/70 font-bold">{availableFriends.length} FOUND</span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Custom Interactive List */}
                  <div className="max-h-[140px] overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1">
                    {availableFriends.map(f => (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFriend(f.id)}
                        className={`group flex items-center gap-3 p-2 cursor-pointer transition-all border-l-2 ${
                          selectedFriend === f.id 
                          ? 'bg-accent/20 border-accent shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]' 
                          : 'bg-black/40 border-transparent hover:bg-accent/5 hover:border-accent/30'
                        }`}
                      >
                        <div className={`w-7 h-7 flex items-center justify-center overflow-hidden border ${selectedFriend === f.id ? 'border-accent' : 'border-accent/30'}`}>
                          {f.avatar_url ? <UserAvatar avatarId={f.avatar_url} size={16} /> : <UserPlus size={12} className="text-accent/50" />}
                        </div>
                        <span className={`font-secondary text-xs tracking-wider uppercase transition-colors ${selectedFriend === f.id ? 'text-white font-bold' : 'text-light/70 group-hover:text-light'}`}>
                          {f.username}
                        </span>
                        {/* Target Lock Animation */}
                        {selectedFriend === f.id && (
                          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ml-auto text-accent">
                            <Crosshair size={14} className="animate-pulse" />
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* SOS Transmit Button */}
                  <button 
                    onClick={handleRecruit}
                    disabled={!selectedFriend || recruitAlly.isPending}
                    className="group relative w-full flex justify-center items-center gap-2 p-3 mt-2 border border-red-500 bg-red-900/20 text-red-400 hover:bg-red-500 hover:text-white font-primary text-[10px] tracking-[0.2em] transition-all disabled:opacity-40 disabled:border-accent/30 disabled:text-accent/40 disabled:bg-transparent disabled:hover:bg-transparent overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-red-500 w-0 group-hover:w-full transition-all duration-500 ease-out opacity-20" />
                    <Radio size={14} className={`relative z-10 ${recruitAlly.isPending ? "animate-ping" : "group-hover:animate-pulse"}`} />
                    <span className="relative z-10">
                      {recruitAlly.isPending ? 'TRANSMITTING SOS...' : 'SEND SOS PROTOCOL'}
                    </span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};