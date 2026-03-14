import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCaptainProfile } from './useProfile';
import { useActiveDirectives } from './useDirectives';
import { useBroadcasts } from './useBroadcast';

export const useDashboardLogic = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [selectedDirective, setSelectedDirective] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const openConsole = () => setIsConsoleOpen(true);
  const closeConsole = () => setIsConsoleOpen(false);

  const openDetail = (directive) => {
    setSelectedDirective(directive);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedDirective(null), 300); // Kosongkan setelah animasi selesai
  };
  

  const { data: profile, isLoading: profileLoading, isError: profileError } = useCaptainProfile();
  const { data: directives, isLoading: directivesLoading } = useActiveDirectives();

  const { data: broadcasts, isLoading: broadcastsLoading } = useBroadcasts();

  const handleEmergencyExit = async () => {
    await logout();
    navigate('/login');
  };

  

  return {
    profile, profileLoading, profileError,
    directives, directivesLoading,
    broadcasts, broadcastsLoading,
    handleEmergencyExit,
    isConsoleOpen, openConsole, closeConsole,
    selectedDirective, isDetailOpen, openDetail, closeDetail
  };
};