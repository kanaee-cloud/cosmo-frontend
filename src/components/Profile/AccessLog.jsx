import { motion } from 'framer-motion';

export const AccessLog = ({ matrixColor, lastLogin, accountCreated }) => {
  return (
    <motion.div
        className="border-2 p-6 transition-all duration-500"
        style={{ borderColor: `${matrixColor.hex}99`, background: `linear-gradient(135deg, ${matrixColor.hex}15 0%, transparent 100%)` }}
        whileHover={{ borderColor: matrixColor.hex }}
    >
        <div className="mb-4">
        <p className="font-primary text-[10px] tracking-[0.3em] mb-3" style={{ color: matrixColor.hex }}>
            [ ACCESS LOG ]
        </p>
        </div>

        <div className="space-y-2 text-[9px] font-mono text-gray-400 uppercase">
        <p><span style={{ color: matrixColor.hex }}>{'>'}</span> PROFILE ACCESSED :: {new Date().toLocaleString()}</p>
        <p><span style={{ color: matrixColor.hex }}>{'>'}</span> LAST KNOWN LOGIN :: {lastLogin}</p>
        <p><span style={{ color: matrixColor.hex }}>{'>'}</span> ACCOUNT CREATED :: {accountCreated}</p>
        <p><span style={{ color: matrixColor.hex }}>{'>'}</span> STATUS: <span style={{ color: '#06FFA5' }}>ALL SYSTEMS OPERATIONAL</span></p>
        </div>
    </motion.div>
  );
};
