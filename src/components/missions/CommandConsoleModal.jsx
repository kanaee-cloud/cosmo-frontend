// src/components/missions/CommandConsoleModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useCommandConsole } from '../../hooks/useCommandConsole';

export const CommandConsoleModal = ({ isOpen, onClose }) => {
  const { formikConfig, isAdding } = useCommandConsole(onClose);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);


  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop (Klik area luar untuk menutup) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a1a]/80 backdrop-blur-sm"
          />

          {/* Kotak Modal Console */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam form menutup modal
            className="relative w-full max-w-2xl p-6 md:p-8 border border-[#3d2278]/90 bg-secondary/95 shadow-[0_0_50px_rgba(61,34,120,0.5)] overflow-hidden z-10"
          >
            {/* Garis Scanline Futuristik */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(61,34,120,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* Tombol Tutup (X) */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-accent transition-colors z-20"
            >
              <X size={20} />
            </button>

            <h3 className="font-primary text-light tracking-[0.25em] text-sm mb-6 border-b border-[#3d2278]/50 pb-2 flex items-center gap-2">
              <span>&gt; COMMAND CONSOLE</span>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block w-1.5 h-3 bg-accent align-middle" />
            </h3>

            <Formik {...formikConfig}>
              {({ setFieldValue, values }) => (
                <Form className="flex flex-col gap-5 relative z-10">
                  
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 flex flex-col gap-1">
                      <Field type="text" name="title" placeholder="ENTER NEW DIRECTIVE (E.G. CLEAN CARGO BAY)..." className="w-full bg-[#0a0a1a]/50 border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-cyan-500 focus:bg-[#0a0a1a] transition-all duration-300" />
                      <ErrorMessage name="title" component="span" className="text-red-400 font-primary text-[8px] tracking-widest px-1" />
                    </div>
                    
                    <div className="w-full md:w-48 flex flex-col gap-1">
                      <Field as="select" name="category" className="w-full bg-[#0a0a1a]/50 border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-cyan-500 transition-all duration-300 cursor-pointer appearance-none">
                        <option value="GENERAL">GENERAL</option>
                        <option value="LEARNING">LEARNING</option>
                        <option value="WORK">WORK</option>
                      </Field>
                      <ErrorMessage name="category" component="span" className="text-red-400 font-primary text-[8px] tracking-widest px-1" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Field as="textarea" rows="3" name="mission_log" placeholder="MISSION LOG / DESCRIPTION DETAILS..." className="w-full bg-[#0a0a1a]/50 border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-cyan-500 focus:bg-[#0a0a1a] transition-all duration-300 resize-none" />
                    <ErrorMessage name="mission_log" component="span" className="text-red-400 font-primary text-[8px] tracking-widest px-1" />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start pt-2">
                    <div className="flex-1 w-full relative">
                      <input 
                        type="file" 
                        id="evidence_upload"
                        accept="image/*"
                        onChange={(e) => {
                          if(e.currentTarget.files.length > 0) setFieldValue("imageFile", e.currentTarget.files[0]);
                        }}
                        className="hidden" 
                      />
                      <motion.label 
                        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                        htmlFor="evidence_upload"
                        className={`w-full flex items-center justify-between px-4 py-3.5 border cursor-pointer transition-all duration-300 ${
                          values.imageFile ? 'bg-cyan-900/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-[#0a0a1a]/50 border-[#3d2278]/80 hover:border-accent/50'
                        }`}
                      >
                        <span className="font-secondary flex items-center gap-2 text-[10px] tracking-wider text-gray-400">
                          <ImageIcon size={14} className={values.imageFile ? "text-cyan-400" : "text-gray-500"} />
                          {values.imageFile ? `[ ${values.imageFile.name} ]` : 'ATTACH VISUAL EVIDENCE (OPTIONAL)...'}
                        </span>
                        <span className="font-primary text-[10px] text-accent tracking-widest">BROWSE</span>
                      </motion.label>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(138,109,252,0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      type="submit" 
                      disabled={isAdding}
                      className="w-full md:w-auto h-[46px] px-8 bg-accent/30 border border-accent text-accent hover:text-white font-primary text-[10px] tracking-[0.25em] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <AnimatePresence mode="wait">
                        {isAdding ? (
                          <motion.span key="syncing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            SYNCING...
                          </motion.span>
                        ) : (
                          <motion.span key="initiate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                            INITIATE <Send size={14} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>

                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};