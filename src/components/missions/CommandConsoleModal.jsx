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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl p-6 md:p-8 border border-accent/50 bg-secondary shadow-[0_0_50px_rgb(var(--color-accent)_/_0.15)] z-10 overflow-hidden"
          >
            {/* Efek Garis Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,255,165,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* Sudut Frame Futuristik */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/50" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/50" />

            {/* Tombol Close */}
            <button onClick={onClose} className="absolute top-5 right-5 text-light/50 hover:text-red-400 transition-colors z-20">
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="p-4 border-b border-tertiary flex items-center gap-3 bg-primary/30 mb-6 relative z-10 -mx-2">
              <UserCircle className="text-accent animate-pulse" size={20} />
              <h2 className="font-primary text-xs md:text-sm tracking-[0.2em] text-accent uppercase">
                [ MISSION PARAMETER CONFIGURATION ]
              </h2>
            </div>

            <FormikProvider value={formikConfig}>
              <Form className="flex flex-col gap-6 relative z-10">

                {/* IDENTIFIKASI DIREKTIF */}
                <div className="flex flex-col gap-2">
                  <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase">
                    [ DIRECTIVE IDENTIFICATION ] *
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="ENTER OPERATION TARGET..."
                    className={`w-full bg-primary/50 border focus:border-accent p-3 font-secondary text-sm text-white outline-none transition-colors ${formikConfig.errors.title && formikConfig.touched.title ? 'border-red-500' : 'border-tertiary'}`}
                  />
                  <ErrorMessage name="title" component="span" className="text-red-400 font-primary text-[8px] tracking-widest flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full animate-pulse"></span> REQUIRED FIELD
                  </ErrorMessage>
                </div>

                {/* THREAT LEVEL (PRIORITY) */}
                <div className="flex flex-col gap-2">
                  <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase">
                    [ THREAT LEVEL / PRIORITY ]
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => formikConfig.setFieldValue('priority', 'STANDARD')}
                      className={`py-3 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'STANDARD' ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-tertiary/50 bg-primary/30 text-light/40 hover:border-blue-500/50 hover:text-blue-300'}`}
                    >
                      STANDARD
                    </button>
                    <button
                      type="button"
                      onClick={() => formikConfig.setFieldValue('priority', 'ELEVATED')}
                      className={`py-3 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'ELEVATED' || !formikConfig.values.priority ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-tertiary/50 bg-primary/30 text-light/40 hover:border-orange-500/50 hover:text-orange-300'}`}
                    >
                      ELEVATED
                    </button>
                    <button
                      type="button"
                      onClick={() => formikConfig.setFieldValue('priority', 'CRITICAL')}
                      className={`py-3 font-primary text-[10px] tracking-widest border transition-all ${formikConfig.values.priority === 'CRITICAL' ? 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-tertiary/50 bg-primary/30 text-light/40 hover:border-red-500/50 hover:text-red-300'}`}
                    >
                      CRITICAL
                    </button>
                  </div>
                </div>

                {/* KATEGORI & LOG */}
                <div className="flex flex-col gap-2 relative z-20">
                  <label className="font-primary text-[10px] text-light/70 tracking-widest uppercase flex items-center justify-between">
                    <span>[ ASSIGNMENT SECTOR ]</span>
                  </label>
                  <div className="flex flex-col md:flex-row gap-3">

                    {/* CUSTOM DROPDOWN UNTUK TOOLTIP HOVER */}
                    <div className="relative w-full md:w-1/3 group">
                      <Field
                        as="select"
                        name="category"
                        className="w-full bg-primary/50 border border-tertiary focus:border-accent text-white font-primary text-[10px] tracking-widest px-3 py-3 outline-none cursor-pointer transition-colors appearance-none"
                      >
                        <option value="GENERAL" className="bg-primary text-white">[ GENERAL ]</option>
                        <option value="LEARNING" className="bg-primary text-white">[ LEARNING ]</option>
                        <option value="WORK" className="bg-primary text-white">[ FIELD WORK ]</option>
                      </Field>
                      {/* Ikon panah ke bawah */}
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-accent">
                        ▼
                      </div>

                      {/* TOOLTIP MELAYANG (HOVER INSTAN) */}
                      <div className="absolute -bottom-12 left-0 w-max hidden group-hover:block z-50 animate-in fade-in zoom-in duration-200">
                        <div className="relative">
                          {/* Segitiga panah ke atas */}
                          <div className="absolute -top-1 left-4 w-2 h-2 bg-secondary border-t border-l border-accent rotate-45"></div>
                          <div className="bg-secondary/95 backdrop-blur-md border border-accent px-4 py-2 shadow-[0_0_15px_rgb(var(--color-accent)_/_0.3)] min-w-[180px]">
                            {formikConfig.values.category === 'GENERAL' && (
                              <p className="font-primary text-[8px] tracking-widest text-light/80 italic flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent inline-block animate-pulse"></span> SEND PICTURE → VALIDATION
                              </p>
                            )}
                            {(formikConfig.values.category === 'LEARNING' || formikConfig.values.category === 'WORK') && (
                              <p className="font-primary text-[8px] tracking-widest text-light/80 italic flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-accent inline-block animate-pulse"></span> MISSION SUMMARY → QUIZ
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Field
                      type="text"
                      name="mission_log"
                      placeholder="MISSION LOG / DETAILS (OPTIONAL)..."
                      className="flex-1 bg-primary/50 border border-tertiary focus:border-accent text-white font-secondary text-[12px] px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* GARIS PEMISAH */}
                <div className="border-t border-dashed border-tertiary/50 my-2 relative">
                  <span className="absolute -top-2 left-4 bg-secondary px-3 font-primary text-light/50 text-[9px] tracking-widest">
                    ESTIMATED REWARD
                  </span>
                </div>

                {/* FOOTER: REWARD & SUBMIT */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                  <div className="flex gap-4 font-primary text-[10px] tracking-widest">
                    <span className="text-accent flex items-center gap-1">★ +50 XP</span>
                    <span className="text-light flex items-center gap-1">● +10 CREDITS</span>
                  </div>

                  <div className="flex items-center justify-end gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-tertiary/50 text-light/50 hover:bg-red-950/30 hover:text-red-400 hover:border-red-500/50 font-primary text-[10px] tracking-widest transition-all uppercase"
                    >
                      ABORT
                    </button>
                    <button
                      type="submit"
                      disabled={isAdding}
                      className="flex-1 md:flex-none px-8 py-3 bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-[#0a0a1a] font-primary font-bold text-[10px] tracking-[0.2em] transition-all shadow-[0_0_15px_rgb(var(--color-accent)_/_0.2)] disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
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