import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, CircleDashed, Image as ImageIcon, FileText, Activity, Radio, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMissionOperations } from '../../hooks/useMissionOperations';
import { MissionLogModal } from './MissionLogModal';
import { QuizModal } from './QuizModal';
import { EvidenceUploadModal } from './EvidenceUploadModal';

export const DirectiveDetailModal = ({ isOpen, onClose, directive, setActiveDirective }) => {
  const { engageDirective, completeDirective } = useMissionOperations(setActiveDirective);
  
  const [showLogModal, setShowLogModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState([]);
  const [missionLogText, setMissionLogText] = useState('');

  const [generateError, setGenerateError] = useState(null);
  const [engageStatus, setEngageStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Fitur UX: Kunci scroll halaman belakang
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Reset status when modal opens/directive changes
  useEffect(() => {
      setEngageStatus(null);
  }, [directive]);

  const handleEngage = () => {
    if (directive) {
        engageDirective.mutate(directive.id, {
            onSuccess: () => {
                setEngageStatus('success');
                // Optimistic update so UI reflects change instantly without re-select
                setActiveDirective({ ...directive, status: 'IN_PROGRESS' });
                setTimeout(() => setEngageStatus(null), 3000);
            },
            onError: () => {
                setEngageStatus('error');
                setTimeout(() => setEngageStatus(null), 3000);
            }
        });
    }
  };

  const handleTransmit = () => {
    if (directive.category === 'LEARNING' || directive.category === 'WORK') {
      setShowLogModal(true);
    } else {
      setShowEvidenceModal(true);
    }
  };

  const handleQuizGenerated = (quizData, logText) => {
    setGeneratedQuiz(quizData);
    setMissionLogText(logText);
    setShowQuizModal(true);
  };

  const handleQuizComplete = (score, total) => {
    const xpEarned = score * 20 + 50; 
    const percentage = Math.round((score / total) * 100);
    const feedback = `[ SIMULATION REPORT ]\nACCURACY: ${percentage}%\nCORRECT: ${score}/${total}\nProficiency assessed as ${percentage >= 80 ? 'EXCEPTIONAL' : percentage >= 50 ? 'STANDARD' : 'SUB-OPTIMAL'}.`;

    completeDirective.mutate({ 
      id: directive.id, 
      xp: xpEarned, 
      mission_log: missionLogText,
      ai_feedback: feedback,
      validation_score: percentage
    });
    setShowQuizModal(false);
    onClose();
  };

  const handleValidationComplete = (xpAwarded, evidenceUrl, aiFeedback, validationScore) => {
    completeDirective.mutate({ 
      id: directive.id, 
      xp: xpAwarded, 
      evidence_link: evidenceUrl,
      ai_feedback: aiFeedback,
      validation_score: validationScore 
    });
    setShowEvidenceModal(false);
    onClose();
  };

  return (
    <>
      {createPortal(
        <AnimatePresence>
      {isOpen && directive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop (Klik luar untuk tutup) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
          />

          {/* Kotak Modal Detail */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 md:p-8 border border-cyan-900/80 bg-secondary/95 shadow-[0_0_50px_rgba(6,182,212,0.15)] custom-scrollbar z-10"
          >
            {/* Garis Scanline Futuristik */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* Tombol Tutup */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400 transition-colors z-20">
              <X size={20} />
            </button>

            {/* HEADER: Tipe & Status */}
            <div className="flex items-center gap-3 mb-6 border-b border-cyan-900/50 pb-4">
              {directive.status === 'IN_PROGRESS' ? (
                <CheckCircle className="text-orange-400 animate-pulse" size={24} />
              ) : (
                <CircleDashed className="text-gray-400" size={24} />
              )}
              <div>
                <h3 className="font-primary text-light tracking-[0.2em] text-lg uppercase leading-tight">
                  {directive.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-primary text-[8px] text-accent tracking-widest bg-accent/10 px-2 py-0.5 border border-accent/20">
                    CATEGORY: {directive.category}
                  </span>
                  <span className={`font-primary text-[8px] tracking-widest px-2 py-0.5 border ${
                    directive.status === 'IN_PROGRESS' ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' : 'text-gray-400 border-gray-600 bg-gray-800'
                  }`}>
                    STATUS: {directive.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-primary text-cyan-400 text-[10px] tracking-[0.2em] mb-2 flex items-center gap-2">
                <FileText size={14} /> [ MISSION LOG DETAILS ]
              </h4>
              <div className="bg-primary/50 border border-light/40 p-4 text-gray-300 font-secondary text-sm leading-relaxed whitespace-pre-wrap">
                {directive.mission_log}
              </div>
            </div>

            {directive.evidence_link && (
              <div className="mb-6">
                <h4 className="font-primary text-cyan-400 text-[10px] tracking-[0.2em] mb-2 flex items-center gap-2">
                  <ImageIcon size={14} /> [ VISUAL EVIDENCE ATTACHED ]
                </h4>
                <div className="relative group rounded-sm overflow-hidden border border-light/40 bg-primary">
                  <img 
                    src={directive.evidence_link} 
                    alt="Mission Evidence" 
                    className="w-full h-auto max-h-[300px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-[200%] animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <AnimatePresence>
                {engageStatus && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0 }}
                        className={`mb-4 p-3 border ${engageStatus === 'success' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-red-500 bg-red-500/10 text-red-500'} font-primary text-[10px] tracking-widest text-center`}
                    >
                        {engageStatus === 'success' ? '[ PROTOCOL ENGAGED SUCCESSFULLY ]' : '[ ERROR: ENGAGEMENT FAILED ]'}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
               <button
                 onClick={handleEngage}
                 disabled={directive.status !== 'PENDING' || engageDirective.isPending}
                 className={`py-4 border flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden ${
                   directive.status !== 'PENDING'
                     ? 'border-gray-800 bg-gray-900/50 text-gray-600 cursor-not-allowed' 
                     : 'border-orange-500/50 bg-orange-900/10 text-orange-400 hover:bg-orange-900/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                 }`}
               >
                 {engageDirective.isPending ? (
                     <>
                        <CircleDashed className="animate-spin text-orange-400" size={24} />
                        <span className="font-primary text-xs tracking-[0.2em]">ENGAGING...</span>
                     </>
                 ) : (
                     <>
                        <Radio size={24} className={directive.status === 'IN_PROGRESS' ? 'text-orange-500' : 'animate-pulse'} />
                        <span className="font-primary text-xs tracking-[0.2em]">
                        {directive.status === 'IN_PROGRESS' || directive.status === 'DONE' ? 'PROTOCOLS ENGAGED' : 'ENGAGE PROTOCOLS'}
                        </span>
                     </>
                 )}
               </button>

               <button
                 onClick={handleTransmit}
                 disabled={directive.status !== 'IN_PROGRESS'}
                 className={`py-4 border flex flex-col items-center justify-center gap-2 transition-all ${
                   directive.status !== 'IN_PROGRESS'
                     ? 'border-gray-800 bg-gray-900/50 text-gray-600 cursor-not-allowed'
                     : 'border-cyan-500/50 bg-cyan-900/10 text-cyan-400 hover:bg-cyan-900/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                 }`}
               >
                 <Send size={24} />
                 <span className="font-primary text-xs tracking-[0.2em]">TRANSMIT DATA</span>
               </button>
            </div>

            <div className="mt-8 pt-4 border-t border-[#3d2278]/40 flex justify-between items-center text-gray-500 font-secondary text-[9px] tracking-widest">
              <span className="flex items-center gap-1"><Activity size={12} /> RECORDED: {new Date(directive.created_at).toLocaleString()}</span>
              <span>ID: {directive.id.split('-')[0]}</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )}

      <MissionLogModal 
        isOpen={showLogModal} 
        onClose={() => setShowLogModal(false)} 
        directive={directive}
        onQuizGenerated={handleQuizGenerated}
      />

      <QuizModal 
        isOpen={showQuizModal} 
        onClose={() => setShowQuizModal(false)}
        quizQuestions={generatedQuiz}
        onQuizComplete={handleQuizComplete}
      />

      <EvidenceUploadModal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
        directive={directive}
        onValidationComplete={handleValidationComplete}
      />
    </>
  );
};