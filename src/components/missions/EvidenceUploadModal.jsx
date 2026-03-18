import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useValidateMission } from '../../hooks/useValidateMission';
import { useEvidenceUpload } from '../../hooks/useEvidenceUpload';

export const EvidenceUploadModal = ({ isOpen, onClose, directive, onValidationComplete }) => {
  const [file, setFile] = useState(null);
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const { mutate: validateMission } = useValidateMission();
  const { mutate: uploadEvidence, isPending: uploading } = useEvidenceUpload();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUploadAndValidate = async () => {
    if (!file) return;

    setError(null);

    uploadEvidence(
        { file, directory: `proofs/${directive.id}` },
        {
            onSuccess: (publicUrl) => {
                setUploadedUrl(publicUrl);
                setValidating(true);

                // 3. Send to Worker for Validation
                validateMission({
                    title: directive.title,
                    description: directive.mission_log || directive.description || "Physical Task",
                    imageUrl: publicUrl,
                    directiveId: directive.id
                }, {
                    onError: (err) => console.error("AI Analysis Node Error:", err)
                });

                // 4. Immediate Feedback to User (Optimistic UI)
                setValidating(false);
                setValidationResult({
                    isValid: true, 
                    reasoning: "Transmission received. Analysis node active. You may close this channel.",
                    processing: true
                });
            },
            onError: (err) => {
                console.error(err);
                setError("Transmission failed. Check connection or file type.");
                setValidating(false);
            }
        }
    );
  };


  const handleFinish = () => {
    onClose();
    // Reset state setelah modal tertutup agar fresh saat dibuka lagi
    setTimeout(() => {
      setFile(null);
      setValidationResult(null);
      setError(null);
      setUploadedUrl(null);
    }, 300);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-sm" />

        {/* Modal Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md p-6 border border-cyan-500/30 bg-[#05000a] shadow-[0_0_50px_rgba(6,182,212,0.1)] z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-cyan-400"><X size={20} /></button>

          <h3 className="font-primary text-cyan-400 tracking-[0.2em] text-sm mb-6 flex items-center gap-2 border-b border-cyan-900/50 pb-2">
            <ShieldCheck size={16} /> VALIDATION PROTOCOL
          </h3>

          {!validationResult ? (
            
            // TAMPILAN 1: FORM UPLOAD
            <div className="flex flex-col gap-6">
              <p className="font-secondary text-gray-400 text-xs leading-relaxed text-center">
                Visual confirmation required for directive: <br/><span className="text-white font-bold">{directive?.title}</span>.
                Upload photographic evidence for AI verification.
              </p>

              <div className="flex flex-col gap-2">
                <input type="file" id="proof_upload" accept="image/*" onChange={handleFileChange} className="hidden" />
                <label 
                  htmlFor="proof_upload" 
                  className={`w-full h-32 flex flex-col items-center justify-center border-2 border-dashed cursor-pointer transition-all ${file ? 'border-cyan-500 bg-cyan-900/20' : 'border-gray-800 hover:border-cyan-500 hover:bg-gray-900'}`}
                >
                  <Upload size={24} className={`mb-2 ${file ? 'text-cyan-400' : 'text-gray-600'}`} />
                  <span className="font-primary text-[10px] tracking-widest text-gray-400 text-center px-4">
                    {file ? file.name : 'CLICK TO UPLOAD EVIDENCE'}
                  </span>
                </label>
              </div>

              {error && <p className="text-red-500 text-xs text-center font-primary">{error}</p>}

              <button 
                onClick={handleUploadAndValidate}
                disabled={!file || uploading || validating}
                className="w-full py-3 bg-cyan-900/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-[#0a0a1a] font-primary text-xs tracking-[0.2em] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? 'UPLOADING...' : validating ? 'AI ANALYZING...' : 'INITIATE VALIDATION'}
              </button>
            </div>

          ) : (
            
            // TAMPILAN 2: HASIL VALIDASI
            <div className="text-center animate-in fade-in zoom-in duration-300">
              {/* PERBAIKAN SINTAKS TERNARY DI SINI */}
              {validationResult.isValid ? (
                <>
                  <ShieldCheck size={48} className={`mx-auto mb-4 ${validationResult.processing ? 'text-cyan-400 animate-pulse' : 'text-green-500'}`} />
                  <h4 className={`font-primary text-lg tracking-widest mb-2 ${validationResult.processing ? 'text-cyan-400' : 'text-green-400'}`}>
                    {validationResult.processing ? 'TRANSMISSION RECEIVED' : 'VALIDATION SUCCESS'}
                  </h4>
                  
                  {/* AI FEEDBACK SECTION */}
                  <div className="bg-cyan-900/10 border border-cyan-500/30 p-4 mb-4 text-left">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-primary text-[10px] text-cyan-400 tracking-widest">STATUS LOG</span>
                        {!validationResult.processing && <span className="font-primary text-xs text-white bg-cyan-900/50 px-2 py-1 border border-cyan-500/50 rounded-sm">SCORE: {validationResult.validation_score || 100}%</span>}
                     </div>
                     <p className="font-secondary text-gray-300 text-xs leading-relaxed">
                        {validationResult.reasoning || validationResult.ai_feedback}
                     </p>
                  </div>

                  {!validationResult.processing && (
                    <div className="bg-cyan-900/20 border border-cyan-500/50 p-3 mb-6">
                       <span className="block font-primary text-[10px] text-cyan-400 tracking-widest">XP AWARDED</span>
                       <span className="font-primary text-2xl text-white">{validationResult.xp_awarded} FC</span>
                    </div>
                  )}
                  
                  <button onClick={handleFinish} className="w-full py-3 bg-cyan-600 text-white font-primary text-xs tracking-widest hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                    {validationResult.processing ? 'CLOSE CHANNEL' : 'ACCEPT REWARD'}
                  </button>
                </>
              ) : (
                <>
                  <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                  <h4 className="font-primary text-red-500 text-lg tracking-widest mb-2">VALIDATION FAILED</h4>
                  <div className="bg-red-900/10 border border-red-500/30 p-4 mb-6 text-left">
                     <span className="block font-primary text-[10px] text-red-400 tracking-widest mb-1">REASONING</span>
                     <p className="font-secondary text-gray-300 text-xs leading-relaxed">{validationResult.ai_feedback || validationResult.reasoning || "Evidence does not match directive parameters."}</p>
                  </div>
                  <button onClick={() => setValidationResult(null)} className="w-full py-3 bg-red-900/20 border border-red-500 text-red-500 font-primary text-xs tracking-widest hover:bg-red-900/40 transition-colors">
                    RETRY UPLOAD
                  </button>
                </>
              )}
            </div>
            
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};