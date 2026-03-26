import React from 'react';
import { Bot, BrainCircuit, Cpu, Ghost, Skull, User } from 'lucide-react';

export const PRESET_AVATARS = {
  bot: Bot,
  brain: BrainCircuit,
  cpu: Cpu,
  ghost: Ghost,
  skull: Skull,
  user: User
};

export default function UserAvatar({ avatarId, className, size = 24 }) {
  const Icon = PRESET_AVATARS[avatarId] || Bot;
  return (
    <Icon 
      size={size} 
      className={`text-light transition-colors duration-500 ${className || ''}`} 
    />
  );
}
