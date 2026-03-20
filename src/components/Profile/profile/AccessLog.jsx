export const AccessLog = ({ lastLogin, accountCreated }) => {
  return (
    <div className="p-4 md:p-5 flex-1 transition-colors duration-500">
      <div className="mb-4">
        <p className="font-secondary text-[10px] md:text-xs text-light/60 tracking-[0.2em] transition-colors duration-500">
          [ ACCESS LOG ]
        </p>
      </div>

      <div className="space-y-3 text-[9px] md:text-[10px] font-mono uppercase break-words text-light leading-relaxed transition-colors duration-500">
        <p>
          <span className="text-accent mr-2 transition-colors duration-500">{'>'}</span> 
          SYS_TIME: <br/>
          <span className="text-light ml-4 transition-colors duration-500">{new Date().toLocaleString()}</span>
        </p>
        <p>
          <span className="text-accent mr-2 transition-colors duration-500">{'>'}</span> 
          LAST_LOGIN: <br/>
          <span className="text-light ml-4 transition-colors duration-500">{lastLogin || 'N/A'}</span>
        </p>
        <p>
          <span className="text-accent mr-2 transition-colors duration-500">{'>'}</span> 
          CREATED_AT: <br/>
          <span className="text-light ml-4 transition-colors duration-500">{accountCreated || 'N/A'}</span>
        </p>
      </div>
    </div>
  );
};