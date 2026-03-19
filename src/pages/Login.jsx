import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole, Zap, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLoginLogic } from '../hooks/useAuth';
import { useToastStore } from '../hooks/useToast';
import { SuccessModal } from '../components/modals';

const Login = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { success, error } = useToastStore();
    const { loginMutation, initialValues, validationSchema, onSubmit, signInWithGoogle } = useLoginLogic();

    // Show success modal when mutation succeeds
    useEffect(() => {
        if (loginMutation.isSuccess) {
            setShowSuccessModal(true);
            success('COMMUNICATION ESTABLISHED', 'Authentikasi berhasil. Menghubungkan ke mainframe...');
            // Auto-navigate after success modal closes
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginMutation.isSuccess, navigate, success]);

    // Show error toast on login failure
    useEffect(() => {
        if (loginMutation.isError) {
            error('AUTHENTICATION FAILED', 'Kredensial tidak valid. Periksa kembali data Anda.');
        }
    }, [loginMutation.isError, error]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center px-4 py-10 min-h-[calc(100vh-88px)]"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-[370px] bg-secondary/95 border border-[#3d2278]/90 shadow-[0_0_40px_rgba(61,34,120,0.5),inset_0_0_30px_rgba(0,0,0,0.3)] p-8"
            >
                <div className="flex justify-center mb-5 bg-light w-12 h-12 mx-auto items-center">
                    <LockKeyhole className="text-primary" size={30} />
                </div>
                <h1 className="text-center font-primary font-semibold text-light text-md tracking-[0.3em] leading-7 mb-2">
                    SECURITY CLEARANCE<br />REQUIRED
                </h1>
                <p className="text-center font-tertiary text-accent text-xs tracking-[0.15em] mb-8 flex items-center justify-center gap-1">
                    <span>&gt; Awaiting pilot credentials</span>
                    <span className="animate-pulse inline-block w-1.5 h-3 bg-accent align-middle ml-1" />
                </p>

                {/* Error Handling via TanStack Mutation */}
                {loginMutation.isError && (
                    <div className="mb-4 p-2 border border-red-500 bg-red-500/10 text-red-500 text-center font-primary text-[10px] tracking-widest animate-pulse uppercase">
                        [ERROR]: CREDENTIALS REJECTED. TRY AGAIN.
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form className="space-y-5">
                            <div>
                                <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                                    <span>[ COMMS_FREQUENCY / EMAIL ]</span>
                                    <ErrorMessage name="email" component="span" className="text-red-400" />
                                </label>
                                <Field type="email" name="email" placeholder="pilot@orbitask.nexus" className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-700 transition-all duration-200" />
                            </div>

                            <div>
                                <label className="block font-primary text-white text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                                    <span>[ ACCESS_CODE ]</span>
                                    <ErrorMessage name="password" component="span" className="text-red-400" />
                                </label>
                                <Field type="password" name="password" placeholder="••••••••" className="w-full bg-transparent border border-[#3d2278]/80 text-white font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-700 transition-all duration-200" />
                            </div>

                            <button
                                type="submit"
                                disabled={loginMutation.isPending} // Disable button if mutation is running
                                className="w-full flex items-center justify-center gap-4 text-accent bg-accent/30 border border-accent hover:text-white font-primary text-[10px] tracking-[0.25em] py-3.5 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98] mt-1"
                            >
                                <Zap size={16} />
                                <span>{loginMutation.isPending ? 'VERIFYING...' : 'INITIALIZE LINK'}</span>
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="mt-5 flex items-center justify-center gap-2">
                    <div className="h-px bg-[#3d2278]/40 flex-1"></div>
                    <span className="font-primary text-[8px] text-[#3d2278] tracking-widest">OR BYPASS VIA</span>
                    <div className="h-px bg-[#3d2278]/40 flex-1"></div>
                </div>

                <button
                    onClick={signInWithGoogle}
                    type="button"
                    className="w-full mt-5 flex items-center justify-center gap-3 text-cyan-400 border border-cyan-800 bg-cyan-900/20 hover:bg-cyan-900/50 hover:border-cyan-400 font-primary text-[10px] tracking-[0.25em] py-3 transition-all duration-300 active:scale-[0.98]"
                >
                    <Fingerprint size={16} />
                    <span>BIOMETRIC SCAN (GOOGLE)</span>
                </button>

                {/* Footer */}
                <div className="mt-7 space-y-2.5 text-center">
                    <p className="font-primary text-[9px] tracking-wider text-gray-500">
                        New recruit?{' '}
                        <Link to="/register" className="text-accent hover:text-red-300 transition-colors duration-200">
                            (Enlist Here)
                        </Link>
                    </p>
                </div>
            </motion.div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                title="COMMUNICATION ESTABLISHED"
                message="Authentikasi berhasil. Menghubungkan ke mainframe..."
                onClose={() => setShowSuccessModal(false)}
            />
        </motion.div>
    );
};

export default Login;