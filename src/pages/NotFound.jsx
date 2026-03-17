import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const STAR_COUNT = 50;
const PARTICLE_COUNT = 3;

const ComputerIcon = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_30px_rgba(138,109,252,0.5)]"
  >
    <rect x="25" y="20" width="70" height="55" fill="none" stroke="#8A6DFC" strokeWidth="3" />
    <rect x="30" y="25" width="60" height="45" fill="#0a0a1a" stroke="#FF006E" strokeWidth="2" />
    
    {[30, 35, 40, 45, 50, 55, 60].map((y) => (
      <line key={y} x1="30" y1={y} x2="90" y2={y} stroke="#FF006E" strokeWidth="1" opacity="0.3" />
    ))}

    <rect x="50" y="77" width="20" height="8" fill="#8A6DFC" />
    <rect x="45" y="85" width="30" height="3" fill="#8A6DFC" />

    <path
      d="M 95 40 L 105 30 L 110 35 L 100 50"
      stroke="#FF006E"
      strokeWidth="2"
      fill="none"
      strokeDasharray="3,2"
      opacity="0.7"
    />
    <circle cx="110" cy="35" r="3" fill="#FF006E" opacity="0.8" />
  </svg>
);

export default function NotFound() {
  const navigate = useNavigate();

  const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    width: Math.random() * 3,
    height: Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.7,
    duration: Math.random() * 3 + 2,
  }));

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    duration: 4 + i,
    delay: i * 0.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0f0f1e] flex flex-col items-center justify-center font-primary overflow-hidden relative">
      {/* Background stars */}
      <div className="absolute inset-0 opacity-20">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Computer Icon */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ComputerIcon />
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-7xl font-black mb-2 text-[#FF006E] tracking-widest glitch-text">
            ERROR:
          </h1>
          <h2 className="text-7xl md:text-8xl font-black mb-6 text-[#FF006E] tracking-widest glitch-text">
            404
          </h2>
        </motion.div>

        {/* Signal Lost Badge */}
        <motion.div
          className="mb-8 border-2 border-[#FF006E] px-6 py-3 inline-block bg-[#FF006E]/5 neon-glow"
          animate={{ textShadow: ['0 0 10px #FF006E', '0 0 20px #FF006E', '0 0 10px #FF006E'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[#FF006E] text-lg md:text-xl font-mono tracking-[0.2em]">
            [ SIGNAL LOST ]
          </p>
        </motion.div>

        {/* Warning Message */}
        <motion.div
          className="mb-12 max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-400 text-xs md:text-sm font-mono leading-relaxed tracking-wider">
            ⚠ WARNING: Connection to designated sector terminated. 
            Navigation systems offline. Recommend immediate return to base.
            Life support: NOMINAL. Oxygen: ADEQUATE.
          </p>
        </motion.div>

        {/* FTL Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="relative px-8 py-4 border-2 border-[#FF006E] text-[#FF006E] font-mono font-bold tracking-widest text-sm uppercase neon-button"
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px rgba(255, 0, 110, 0.8), inset 0 0 10px rgba(255, 0, 110, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          [ ENGAGE FTL TO BASE ]
        </motion.button>

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#FF006E] rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </motion.div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        .glitch-text {
          position: relative;
          text-shadow: 
            2px 0 #8A6DFC,
            -2px 0 #FF006E,
            0 0 20px rgba(255, 0, 110, 0.5);
        }

        .neon-glow {
          box-shadow: 0 0 10px rgba(255, 0, 110, 0.6), 
                      inset 0 0 10px rgba(255, 0, 110, 0.1),
                      0 0 20px rgba(138, 109, 252, 0.3);
        }

        .neon-button {
          background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), transparent);
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(255, 0, 110, 0.5), 
                      inset 0 0 10px rgba(255, 0, 110, 0.1);
        }

        .neon-button:hover {
          background: linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(138, 109, 252, 0.1));
        }
      `}</style>
    </div>
  );
}
