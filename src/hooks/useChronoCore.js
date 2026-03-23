import { useState, useEffect, useRef } from 'react';
import { usePomodoro } from './usePomodoro'; // Import Hook Supabase

export const useChronoCore = () => {
  const DEFAULT_FOCUS = 25 * 60;
  const DEFAULT_BREAK = 5 * 60;

  const [taskInput, setTaskInput] = useState('');
  const [focusDuration, setFocusDuration] = useState(DEFAULT_FOCUS); 
  const [breakDuration] = useState(DEFAULT_BREAK); 

  const [currentPhase, setCurrentPhase] = useState('focus'); 
  const [timeLeft, setTimeLeft] = useState(focusDuration);
  const [isRunning, setIsRunning] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 
  const [statusText, setStatusText] = useState('WARP DRIVE CHARGING');
  const [rewardMessage, setRewardMessage] = useState(null); 

  const rewardTimeoutRef = useRef(null);

  // === INTEGRASI SUPABASE ===
  const { logSession, usePomodoroTasks, addTask, toggleTaskCompletion, deleteTask } = usePomodoro();
  const { data: tasksList = [], isLoading: isTasksLoading } = usePomodoroTasks();
  const { mutate: logSessionMutate } = logSession; // Ekstrak fungsi stabil untuk mencegah loop dependency

  // Update Tab Title
  useEffect(() => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    document.title = `[ ${m}:${s} ] ${currentPhase === 'focus' ? 'WARP DRIVE' : 'COOLING'}`;
    return () => { document.title = 'Cosmo Dashboard'; };
  }, [timeLeft, currentPhase]);

  // === MESIN TIMER (Bebas Loop) ===
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      
      if (currentPhase === 'focus') {
        const minutesCompleted = Math.floor(focusDuration / 60);
        
        // 1. Tulis ke Database Supabase
        logSessionMutate({ durationMinutes: minutesCompleted, sessionType: 'FOCUS' });

        // 2. Beri Pesan Sukses
        setRewardMessage(`SESSION LOGGED: +${minutesCompleted} MINUTES FOCUS`);
        if (rewardTimeoutRef.current) clearTimeout(rewardTimeoutRef.current);
        rewardTimeoutRef.current = setTimeout(() => setRewardMessage(null), 6000); 

        // 3. Pindah ke mode Istirahat
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
  }, [isRunning, timeLeft, currentPhase, focusDuration, breakDuration, logSessionMutate]);

  // Cleanup timeout saat komponen mati
  useEffect(() => {
    return () => {
      if (rewardTimeoutRef.current) clearTimeout(rewardTimeoutRef.current);
    };
  }, []);

  const isTimerAltered = currentPhase === 'focus' ? timeLeft !== focusDuration : timeLeft !== breakDuration;
  const isLocked = isRunning || isTimerAltered || currentPhase === 'break'; 
  
  // Baca format is_completed dari Supabase
  const allTasksDone = tasksList.length > 0 && tasksList.every(t => t.is_completed);

  let dynamicStatusText = statusText;
  if (currentPhase === 'focus' && isRunning && allTasksDone) {
    dynamicStatusText = 'ALL DIRECTIVES CLEARED // MAINTAIN REVIEW COURSE';
  }

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
      setStatusText(!isRunning ? 'ENGAGED // COUNTING' : 'SYSTEM PAUSED');
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

  // === HANDLERS DATABASE ===
  const handleAddTask = () => {
    if (taskInput.trim() !== '' && !isLocked) {
      addTask.mutate(taskInput);
      setTaskInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  };

  const completeTask = (id, currentStatus) => {
    toggleTaskCompletion.mutate({ taskId: id, isCompleted: !currentStatus });
  };

  const removeTask = (id) => {
    deleteTask.mutate(id);
  };

  const formatTime = (seconds) => {
    if (seconds == null) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getMainButtonText = () => {
    if (currentPhase === 'break') return isRunning ? 'COOLING IN PROGRESS' : 'RESUME COOLING';
    if (isRunning) return 'PAUSE SYSTEM';
    return isTimerAltered ? 'RESUME WARP' : 'ENGAGE FOCUS';
  };

  return {
    task: taskInput, setTask: setTaskInput, tasksList, isTasksLoading,
    focusDuration, breakDuration, currentPhase, timeLeft, isRunning, isModalOpen, setIsModalOpen,
    isConfirmModalOpen, setIsConfirmModalOpen, statusText, rewardMessage,
    isTimerAltered, isLocked, allTasksDone, dynamicStatusText, 
    toggleTimer, confirmEngage, resetTimer, handleApplyNewTime,
    handleAddTask, handleKeyPress, completeTask, removeTask, formatTime, getMainButtonText
  };
};