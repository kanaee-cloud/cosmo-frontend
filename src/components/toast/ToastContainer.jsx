import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

const ToastContainer = ({ toasts = [], onClose }) => {
  return (
    <div
      className="fixed top-5 right-5 z-[9999] pointer-events-none"
      style={{
        maxHeight: '100vh',
        overflow: 'visible',
      }}
    >
      <div className="pointer-events-auto flex flex-col">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={() => onClose(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToastContainer;
