import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRegisterLogic } from '../hooks/useAuth';

const Register = () => {
  const { registerMutation, initialValues, validationSchema, onSubmit } = useRegisterLogic();

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center px-4 py-10 min-h-[calc(100vh-88px)]"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-[420px] bg-secondary/95 border border-light/90 shadow-[0_0_40px_rgba(61,34,120,0.5),inset_0_0_30px_rgba(0,0,0,0.3)] p-8"
      >
        <h1 className="text-center font-semibold font-primary text-light text-md tracking-[0.35em] leading-7 mb-2">
          NEW PILOT INDUCTION
        </h1>
        <p className="text-center font-secondary text-accent text-[9px] tracking-[0.15em] mb-7 flex items-center justify-center gap-1">
          <span>&gt; Enter credentials to begin mission...</span>
        </p>

        {/* Error Handling via TanStack Mutation */}
        {registerMutation.isError && (
          <div className="mb-4 p-2 border border-red-500 bg-red-500/10 text-red-500 text-center font-primary text-[10px] tracking-widest animate-pulse uppercase">
            [ERROR]: {registerMutation.error?.message || 'ENLISTMENT FAILED'}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4">
              {/* Field Callsign */}
              <div>
                <label className="block font-primary text-text text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                  <span>[ PILOT CALLSIGN ]</span>
                  <ErrorMessage name="callsign" component="span" className="text-red-400" />
                </label>
                <div className="relative">
                  <Field type="text" name="callsign" placeholder="E.G. STARDUST_9" className="w-full bg-transparent border border-light/80 text-text font-secondary text-[10px] tracking-wider px-4 py-3 pr-8 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200 uppercase" />
                  {values.callsign && <span className="absolute right-3 top-1/2 -translate-y-1/2 font-secondary text-accent text-[11px] animate-pulse pointer-events-none">|</span>}
                </div>
              </div>

              {/* Field Email */}
              <div>
                <label className="block font-primary text-text text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                  <span>[ SECURE COMMS FREQUENCY ]</span>
                  <ErrorMessage name="email" component="span" className="text-red-400" />
                </label>
                <Field type="email" name="email" placeholder="pilot@orbitask.nexus" className="w-full bg-transparent border border-light/80 text-text font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200 lowercase" />
              </div>

              {/* Field Password */}
              <div>
                <label className="block font-primary text-text text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                  <span>[ UNIQUE ACCESS CODE ]</span>
                  <ErrorMessage name="password" component="span" className="text-red-400" />
                </label>
                <Field type="password" name="password" placeholder="••••••••" className="w-full bg-transparent border border-light/80 text-text font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200" />
              </div>

              {/* Field Confirm Password */}
              <div>
                <label className="block font-primary text-text text-[9px] tracking-[0.25em] mb-2 flex justify-between">
                  <span>[ CONFIRM ACCESS CODE ]</span>
                  <ErrorMessage name="confirmPassword" component="span" className="text-red-400" />
                </label>
                <Field type="password" name="confirmPassword" placeholder="••••••••" className="w-full bg-transparent border border-light/80 text-text font-secondary text-[10px] tracking-wider px-4 py-3 outline-none focus:border-light/70 focus:shadow-[0_0_12px_rgba(138,109,252,0.25)] placeholder:text-gray-600 transition-all duration-200" />
              </div>

              <button
                type="submit"
                disabled={registerMutation.isPending} // Menggunakan TanStack isPending
                className="w-full bg-accent/30 border border-accent text-accent hover:text-white font-primary text-[10px] tracking-[0.25em] py-3.5 hover:bg-accent disabled:opacity-50 disabled:hover:bg-accent/30 transition-all duration-300 active:scale-[0.98] mt-1"
              >
                {registerMutation.isPending ? 'ENCRYPTING DATA...' : 'COMMENCE ENLISTMENT'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center">
          <p className="font-primary text-[9px] tracking-wider text-gray-500">
            Already have clearance?{' '}
            <Link to="/login" className="text-accent hover:text-red-300 transition-colors duration-200">
              (Access Core Here)
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;