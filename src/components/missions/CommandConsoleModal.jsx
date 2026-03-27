import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, UserCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormikProvider, Form, Field, ErrorMessage } from 'formik';
import { useCommandConsole } from '../../hooks/useCommandConsole';

export const CommandConsoleModal = ({ isOpen, onClose, initialTitle = '' }) => {
  const { formikConfig, isAdding } = useCommandConsole(onClose, initialTitle);

  // Pastikan formik initialValues untuk priority diatur ke 'ELEVATED' jika kosong
  if (!formikConfig.initialValues.priority) {
    formikConfig.initialValues.priority = 'ELEVATED';
  }

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl p-6 border-2 border-light bg-primary shadow-[0_0_50px_rgba(138,109,252,0.2)] z-10"
          >
            {/* Sudut Frame Futuristik */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            {/* Tombol Close */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-20">
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="bg-light text-primary p-2 mb-6 mt-4 md:mt-0 flex items-center gap-2 font-primary font-bold tracking-[0.2em] text-xs md:text-sm">
              <UserCircle size={18} /> [ MISSION PARAMETER CONFIGURATION ]
            </div>

            <FormikProvider value={formikConfig}>
                <Form className="flex flex-col gap-6 relative z-10">
                  
                  {/* IDENTIFIKASI DIREKTIF */}
                  <div className="flex flex-col gap-2">
                    <label className="font-primary text-cyan-400 text-[10px] tracking-widest">DIRECTIVE IDENTIFICATION *</label>
                    <Field 
                      type="text" 
                      name="title" 
                      placeholder="Enter Operation Target..." 
                      className={`w-full bg-transparent border text-cyan-300 font-secondary text-sm px-4 py-3 outline-none transition-colors ${formikConfig.errors.title && formikConfig.touched.title ? 'border-red-500' : 'border-cyan-900 focus:border-cyan-400'}`} 
                    />
                    <ErrorMessage name="title" component="span" className="text-red-500 font-primary text-[8px] tracking-widest flex items-center gap-1"><span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span> REQUIRED FIELD</ErrorMessage>
                  </div>

                  {/* THREAT LEVEL (PRIORITY) */}
                  <div className="flex flex-col gap-2">
                    <label className="font-primary text-cyan-400 text-[10px] tracking-widest">THREAT LEVEL (PRIORITY)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button type="button" onClick={() => formikConfig.setFieldValue('priority', 'STANDARD')} className={`py-2 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'STANDARD' ? 'border-[#3b82f6] bg-[#3b82f6]/20 text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-gray-800 text-gray-500 hover:border-[#3b82f6]/50'}`}>STANDARD</button>
                      <button type="button" onClick={() => formikConfig.setFieldValue('priority', 'ELEVATED')} className={`py-2 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'ELEVATED' || !formikConfig.values.priority ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'border-gray-800 text-gray-500 hover:border-orange-500/50'}`}>ELEVATED</button>
                      <button type="button" onClick={() => formikConfig.setFieldValue('priority', 'CRITICAL')} className={`py-2 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'CRITICAL' ? 'border-red-600 bg-red-600/20 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'border-gray-800 text-gray-500 hover:border-red-600/50'}`}>CRITICAL</button>
                    </div>
                  </div>

                  {/* KATEGORI & LOG */}
                  <div className="flex flex-col gap-2">
                    <label className="font-primary text-cyan-400 text-[10px] tracking-widest flex items-center justify-between">
                      <span>ASSIGNMENT SECTOR (CATEGORY)</span>
                      {/* Live Validation Guidance */}
                      <span className="text-[8px] text-cyan-500/80 animate-pulse bg-cyan-900/30 px-2 py-0.5 border border-cyan-800/50">
                        {formikConfig.values.category === 'GENERAL' && 'REQ: SEND PICTURE -> VALIDATION'}
                        {(formikConfig.values.category === 'LEARNING' || formikConfig.values.category === 'WORK') && 'REQ: MISSION SUMMARY -> QUIZ'}
                      </span>
                    </label>
                    <div className="flex flex-col md:flex-row gap-3">
                      <Field as="select" name="category" className="w-full md:w-1/3 bg-primary border border-cyan-900 text-cyan-300 font-secondary text-[10px] px-3 py-3 outline-none focus:border-cyan-400 cursor-pointer transition-colors hover:border-cyan-500/50 hover:bg-cyan-900/10">
                        <option value="GENERAL">[ GENERAL OPS ]</option>
                        <option value="LEARNING">[ KNOWLEDGE BASE ]</option>
                        <option value="WORK">[ FIELD WORK ]</option>
                      </Field>
                      <Field type="text" name="mission_log" placeholder="Mission Log / Details (Optional)..." className="flex-1 bg-transparent border border-cyan-900 text-cyan-300 font-secondary text-[10px] px-3 py-3 outline-none focus:border-cyan-400" />
                    </div>
                  </div>

                  {/* GARIS PEMISAH */}
                  <div className="border-t border-dashed border-gray-700 my-2 relative">
                     <span className="absolute -top-3 left-4 bg-primary px-2 font-primary text-cyan-500 text-[10px] tracking-widest">ESTIMATED REWARD</span>
                  </div>

                  {/* FOOTER: REWARD & SUBMIT */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                    <div className="flex gap-4 font-primary text-[10px] tracking-widest">
                      <span className="text-cyan-400">★ +50 XP</span>
                      <span className="text-yellow-500">● +10 CREDITS</span>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <button type="button" onClick={onClose} className="font-primary text-gray-500 hover:text-red-500 text-[10px] tracking-widest transition-colors uppercase">
                        ABORT
                      </button>
                      <button type="submit" disabled={isAdding} className="flex-1 md:flex-none px-8 py-3 bg-yellow-500 text-[#0a0a1a] hover:bg-yellow-400 font-primary font-bold text-[10px] tracking-[0.2em] transition-colors disabled:opacity-50">
                        {isAdding ? 'SYNCING...' : 'DEPLOY TO RADAR'}
                      </button>
                    </div>
                  </div>

                </Form>
            </FormikProvider>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};