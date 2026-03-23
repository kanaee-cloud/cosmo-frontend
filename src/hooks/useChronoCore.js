import { useState, useEffect } from 'react';

export const useChronoCore = () => {
  // --- KONSTANTA ---
  const DEFAULT_FOCUS = 25 * 60;
  const DEFAULT_BREAK = 5 * 60;

  // --- STATE MANAGEMENT ---
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);
  
  const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS); 
  const breakDuration = DEFAULT_BREAK; 

  const [currentPhase, setCurrentPhase] = useState('focus'); 
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 
  
  const [statusText, setStatusText] = useState('WARP DRIVE CHARGING');
  const [rewardMessage, setRewardMessage] = useState(null); 

  // --- TAB TITLE LIVE UPDATE ---
  useEffect(() => {
    const formatTabTime = (seconds) => {
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };
    
    const phaseName = currentPhase === 'focus' ? 'WARP DRIVE' : 'COOLING';
    document.title = `[ ${formatTabTime(timeLeft)} ] ${phaseName} - Cosmo`;
    
    return () => { document.title = 'Cosmo Dashboard'; };
  }, [timeLeft, currentPhase]);

  // --- TIMER ENGINE & SIKLUS OTOMATIS ---
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      
      if (currentPhase === 'focus') {
        setRewardMessage(`MISSION ACCOMPLISHED: +${Math.floor(focusDuration / 60)} FUEL CELLS`);
        setTimeout(() => setRewardMessage(null), 6000); 

        setCurrentPhase('break');
        setTimeLeft(breakDuration);
        setStatusText('SYSTEM COOLING // DO NOT DISTURB');
        
      } else {
        setIsRunning(false);
        setCurrentPhase('focus');
        setTimeLeft(focusDuration);
        setStatusText('COOLING COMPLETE // READY FOR RE-ENGAGE');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentPhase, focusDuration, breakDuration]);

  // --- VARIABEL STATUS & LOGIKA REVIEW MODE ---
  const isTimerAltered = currentPhase === 'focus' ? timeLeft !== focusDuration : timeLeft !== breakDuration;
  const isLocked = isRunning || isTimerAltered || currentPhase === 'break'; 
  
  // Deteksi jika list tugas tidak kosong DAN semua tugas berstatus done: true
  const allTasksDone = tasksList.length > 0 && tasksList.every(t => t.done);

  // Manipulasi teks status saat mode review aktif
  let dynamicStatusText = statusText;
  if (currentPhase === 'focus' && isRunning && allTasksDone) {
    dynamicStatusText = 'ALL DIRECTIVES CLEARED // MAINTAIN REVIEW COURSE';
  }

  // --- HANDLERS ---
  const toggleTimer = () => {
    if (currentPhase === 'break') {
      setIsRunning(!isRunning);
      setStatusText(isRunning ? 'COOLING PAUSED' : 'SYSTEM COOLING // DO NOT DISTURB');
      return;
    }

    if (!isRunning && !isTimerAltered) {
      setIsConfirmModalOpen(true);
    } else {
      setIsRunning(!isRunning);
      if (!isRunning) setStatusText('ENGAGED // COUNTING');
      else setStatusText('SYSTEM PAUSED');
    }
  };

  const confirmEngage = () => {
    setIsConfirmModalOpen(false);
    setIsRunning(true);
    setStatusText('ENGAGED // COUNTING');
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setCurrentPhase('focus');
    setTimeLeft(focusDuration);
    setStatusText('WARP DRIVE CHARGING // RESET');
  };

  const handleApplyNewTime = (newTimeInSeconds) => {
    setFocusDuration(newTimeInSeconds);
    if (currentPhase === 'focus') {
      setTimeLeft(newTimeInSeconds);
      setIsRunning(false);
      setStatusText('CORE CALIBRATED // STANDBY');
    }
  };

  const handleAddTask = () => {
    if (task.trim() !== '' && !isLocked) {
      setTasksList([...tasksList, { id: Date.now(), text: task, done: false }]);
      setTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  const completeTask = (id) => {
    setTasksList(tasksList.map(t => t.id === id ? { ...t, done: true } : t));
  };

  const removeTask = (id) => {
    setTasksList(tasksList.filter(t => t.id !== id));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getMainButtonText = () => {
    if (currentPhase === 'break') {
      return isRunning ? 'COOLING IN PROGRESS' : 'RESUME COOLING';
    }
    if (isRunning) return 'PAUSE SYSTEM';
    return isTimerAltered ? 'RESUME WARP' : 'ENGAGE FOCUS';
  };

  return {
    task, setTask, tasksList, focusDuration, breakDuration,
    currentPhase, timeLeft, isRunning, isModalOpen, setIsModalOpen,
    isConfirmModalOpen, setIsConfirmModalOpen, statusText, rewardMessage,
    isTimerAltered, isLocked, allTasksDone, dynamicStatusText, // Export state baru
    toggleTimer, confirmEngage, resetTimer, handleApplyNewTime,
    handleAddTask, handleKeyPress, completeTask, removeTask, formatTime, getMainButtonText
  };
};