import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, ShieldAlert, Crosshair, CheckCircle, CircleDashed, Plus } from 'lucide-react';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import { useSocial } from '../../hooks/useSocial';

export const WorkspaceArena = ({ workspaceId, workspaceName, monsterName }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');

  const { useWorkspaceRaid, dealDamage, addRaidObjective, recruitAlly } = useWorkspaces();
  const { data: raid, isLoading } = useWorkspaceRaid(workspaceId);
  
  // Tarik daftar teman untuk fitur Recruit
  const { useFriendsList } = useSocial();
  const { data: friends } = useFriendsList();

  if (isLoading) return <div className="p-8 text-accent animate-pulse text-center tracking-widest text-xs font-primary transition-colors duration-500">ESTABLISHING CONNECTION TO RAID INSTANCE...</div>;
  if (!raid) return null;

  const hpPercentage = (raid.boss.currentHp / raid.boss.maxHp) * 100;

  // Filter teman yang belum ada di dalam party ini
  const availableFriends = friends?.filter(f => !raid.members.some(m => m.id === f.id)) || [];

  const handleAddObjective = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addRaidObjective.mutate({ workspaceId, title: newTaskTitle }, {
      onSuccess: () => setNewTaskTitle('')
    });
  };

  const handleRecruit = () => {
    if (!selectedFriend) return;
    recruitAlly.mutate({ workspaceId, workspaceName, friendId: selectedFriend }, {
      onSuccess: () => setSelectedFriend('')
    });
  };

  return (
    <div className="p-6 md:p-8 border border-accent/50 bg-primary shadow-[0_0_50px_rgb(var(--color-accent)_/_0.1)] relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-accent/10 blur-[100px] pointer-events-none transition-colors duration-500" />

      {/* 1. HEADER ARENA & BOSS HP BAR */}
      <div className="mb-10 text-center relative z-10">
        <h2 className={`font-primary text-xl md:text-3xl tracking-[0.3em] uppercase mb-2 flex justify-center items-center gap-3 transition-colors duration-500 ${raid.boss.isDefeated ? 'text-green-500 line-through opacity-50' : 'text-accent'}`}>
          <ShieldAlert size={28} /> {monsterName || 'VOID LEVIATHAN'}
        </h2>
        <p className="font-secondary text-light/70 text-[10px] tracking-widest uppercase mb-6 transition-colors duration-500">
          OPERATION: {workspaceName}
        </p>

        {/* BOSS HEALTH BAR */}
        <div className="w-full max-w-2xl mx-auto bg-secondary h-6 md:h-8 border-2 border-accent/50 relative overflow-hidden skew-x-[-10deg] transition-colors duration-500">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent/50 to-accent"
            initial={{ width: "100%" }}
            animate={{ width: `${Math.max(0, hpPercentage)}%` }}
            transition={{ duration: 1, type: "spring" }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-primary text-white text-[10px] md:text-xs tracking-[0.2em] mix-blend-difference">
            {raid.boss.isDefeated ? 'MONSTER SLAIN' : `HP: ${raid.boss.currentHp} / ${raid.boss.maxHp}`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* 2. DAFTAR TUGAS (CO-OP DIRECTIVES) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b border-tertiary pb-2 mb-4 transition-colors duration-500">
            <h3 className="font-primary text-accent text-xs tracking-widest flex items-center gap-2 transition-colors duration-500">
              <Crosshair size={14}/> CO-OP OBJECTIVES
            </h3>
          </div>

          {/* Quick Add Objective Form */}
          {!raid.boss.isDefeated && (
            <form onSubmit={handleAddObjective} className="flex gap-2 mb-4">
              <input 
                type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="LOAD NEW AMMUNITION (TASK)..." 
                className="flex-1 bg-primary border border-tertiary text-text font-secondary text-[10px] px-3 py-2 outline-none focus:border-accent transition-colors duration-500" 
              />
              <button type="submit" disabled={addRaidObjective.isPending} className="px-4 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-primary transition-colors duration-500">
                <Plus size={16} />
              </button>
            </form>
          )}
          
          {raid.directives.length === 0 ? (
            <p className="text-light/50 font-secondary text-[10px] tracking-widest text-center py-8 border border-dashed border-tertiary transition-colors duration-500">
              NO OBJECTIVES SET. THE MONSTER IS DORMANT.
            </p>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {raid.directives.map((task) => (
                <div key={task.id} className={`flex justify-between items-center p-3 border transition-colors duration-500 ${task.status === 'COMPLETED' ? 'border-tertiary/50 bg-primary/40' : 'border-tertiary bg-secondary/80'}`}>
                  <div className="flex items-center gap-3">
                    {task.status === 'COMPLETED' ? <CheckCircle className="text-green-500" size={16} /> : <CircleDashed className="text-light/50" size={16} />}
                    <div>
                      <span className={`font-secondary text-sm block transition-colors duration-500 ${task.status === 'COMPLETED' ? 'text-light/50 line-through' : 'text-text'}`}>{task.title}</span>
                      <span className={`font-primary text-[8px] tracking-widest transition-colors duration-500 ${task.status === 'COMPLETED' ? 'text-light/40' : 'text-accent'}`}>
                        ATK PWR: {task.exp_reward || 100} DMG
                      </span>
                    </div>
                  </div>
                  {task.status !== 'COMPLETED' && (
                    <button 
                      onClick={() => dealDamage.mutate(task.id)}
                      disabled={dealDamage.isPending}
                      className="px-3 py-1.5 bg-accent/10 border border-accent/50 text-accent hover:bg-accent hover:text-primary font-primary text-[8px] tracking-[0.2em] transition-colors duration-500"
                    >
                      {dealDamage.isPending ? 'FIRING...' : 'DEAL DMG'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. PARTY MEMBERS & RECRUITMENT */}
        <div>
          <h3 className="font-primary text-accent text-xs tracking-widest border-b border-tertiary pb-2 mb-4 flex items-center gap-2 transition-colors duration-500">
            <Swords size={14}/> RAID PARTY
          </h3>
          <div className="space-y-2 mb-6">
            {raid.members.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-secondary/50 border border-tertiary transition-colors duration-500">
                <div className="w-8 h-8 rounded-full bg-primary border border-accent/50 overflow-hidden flex justify-center items-center transition-colors duration-500">
                   {member.avatar_url ? <img src={member.avatar_url} alt="avatar" /> : <span className="text-accent font-primary text-[10px]">{member.username?.charAt(0).toUpperCase()}</span>}
                </div>
                <span className="font-secondary text-xs text-light tracking-wider transition-colors duration-500">{member.username}</span>
              </div>
            ))}
          </div>

          {/* Form Recruit Ally */}
          {!raid.boss.isDefeated && availableFriends.length > 0 && (
            <div className="p-3 border border-dashed border-tertiary bg-secondary/30 transition-colors duration-500">
              <label className="font-primary text-[8px] text-accent tracking-widest mb-2 block transition-colors duration-500">RECRUIT ALLY FROM FRIENDLIST</label>
              <div className="flex flex-col gap-2">
                <select 
                  value={selectedFriend} 
                  onChange={(e) => setSelectedFriend(e.target.value)}
                  className="w-full bg-primary border border-tertiary text-text font-secondary text-[10px] px-2 py-2 outline-none transition-colors duration-500"
                >
                  <option value="">-- SELECT ALLY --</option>
                  {availableFriends.map(f => (
                    <option key={f.id} value={f.id}>{f.username}</option>
                  ))}
                </select>
                <button 
                  onClick={handleRecruit}
                  disabled={!selectedFriend || recruitAlly.isPending}
                  className="w-full p-2 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-primary font-primary text-[9px] tracking-widest transition-colors duration-500 disabled:opacity-50"
                >
                  {recruitAlly.isPending ? 'TRANSMITTING...' : 'SEND INVITE'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};