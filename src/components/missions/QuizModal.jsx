  import React, { useState, useEffect, useRef } from 'react';
  import { createPortal } from 'react-dom';
  import { X, CheckCircle, AlertTriangle, Trophy } from 'lucide-react';
  import { motion, AnimatePresence } from 'framer-motion';

  export const QuizModal = ({ isOpen, onClose, quizQuestions, onQuizComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    
    // Use ref to clear timeout on unmount
    const timerRef = useRef(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentQuestion(0);
            setScore(0);
            setSelectedOption(null);
            setShowResult(false);
            setQuizFinished(false);
        }
    }, [isOpen]);

    // Cleanup timer
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleOptionSelect = (index) => {
      setSelectedOption(index);
    };

    const handleNext = () => {
      // Check answer
      const isCorrect = selectedOption === quizQuestions[currentQuestion].correct_index;
      if (isCorrect) setScore(s => s + 1);

      setShowResult(true);

      timerRef.current = setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(c => c + 1);
          setSelectedOption(null);
          setShowResult(false);
        } else {
          setQuizFinished(true);
          // Wait for user to click "Return" to close and submit
        }
      }, 1500); 
    };

    if (!isOpen || !quizQuestions || quizQuestions.length === 0) return null;

    return createPortal(
      <AnimatePresence>
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-md" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-2xl p-8 border-2 border-cyan-500/50 bg-[#05000a] shadow-[0_0_100px_rgba(6,182,212,0.2)] z-10"
          >
            {quizFinished ? (
              <div className="text-center py-10">
                <Trophy className="mx-auto text-yellow-500 mb-6" size={64} />
                <h2 className="font-primary text-2xl text-white tracking-widest mb-4">SIMULATION COMPLETE</h2>
                <p className="font-secondary text-cyan-400 text-lg mb-8">
                  SCORE: {score} / {quizQuestions.length}
                </p>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-400 text-sm mb-4">Rewards and XP will be transferred to your profile.</p>
                    <button 
                        onClick={() => onQuizComplete(score, quizQuestions.length)} 
                        className="px-8 py-3 bg-cyan-500 text-[#0a0a1a] font-primary font-bold tracking-widest hover:bg-cyan-400 transition-colors w-full md:w-auto mx-auto"
                    >
                    RETURN TO DECK
                    </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8 border-b border-cyan-900 pb-4">
                  <span className="font-primary text-cyan-500 text-xs tracking-widest">QUESTION {currentQuestion + 1} / {quizQuestions.length}</span>
                  <span className="font-primary text-gray-500 text-xs tracking-widest">DIFFICULTY: ADAPTIVE</span>
                </div>

                <h3 className="font-secondary text-white text-xl md:text-2xl mb-8 leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="grid gap-4 mb-8">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleOptionSelect(index)}
                      className={`w-full text-left p-4 border transition-all duration-300 font-secondary text-sm md:text-base relative overflow-hidden group
                        ${selectedOption === index ? 'border-cyan-400 bg-cyan-900/30 text-white' : 'border-gray-800 text-gray-400 hover:border-cyan-800 hover:text-gray-200'}
                        ${showResult && index === quizQuestions[currentQuestion].correct_index ? '!border-green-500 !bg-green-900/30 !text-green-400' : ''}
                        ${showResult && selectedOption === index && index !== quizQuestions[currentQuestion].correct_index ? '!border-red-500 !bg-red-900/30 !text-red-400' : ''}
                      `}
                      disabled={showResult}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="font-primary text-[10px] opacity-50">{String.fromCharCode(65 + index)}.</span>
                        {option}
                        
                        {/* Icons for Result */}
                        {showResult && index === quizQuestions[currentQuestion].correct_index && <CheckCircle size={18} className="ml-auto text-green-400" />}
                        {showResult && selectedOption === index && index !== quizQuestions[currentQuestion].correct_index && <AlertTriangle size={18} className="ml-auto text-red-400" />}
                      </span>
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-cyan-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 pointer-events-none" />
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleNext} 
                    disabled={selectedOption === null}
                    className="px-8 py-3 bg-cyan-900/40 border border-cyan-500/50 text-cyan-300 font-primary text-xs tracking-widest hover:bg-cyan-500 hover:text-[#0a0a1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'FINALIZE' : 'CONFIRM SELECTION'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </AnimatePresence>,
      document.body
    );
  };
