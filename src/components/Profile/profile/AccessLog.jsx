export const AccessLog = ({ lastLogin, accountCreated }) => {
  return (
    <div className="p-4 md:p-5 flex-1">
      <div className="mb-4">
        <p className="font-secondary text-[10px] md:text-xs text-[#6a6a9a] tracking-[0.2em]">
          [ ACCESS LOG ]
        </p>
      </div>

      <div className="space-y-3 text-[9px] md:text-[10px] font-mono uppercase break-words text-[#c9bfe6] leading-relaxed">
        <p>
          <span className="text-[#ff0055] mr-2">{'>'}</span> 
          SYS_TIME: <br/>
          <span className="text-[#00f0ff] ml-4">{new Date().toLocaleString()}</span>
        </p>
        <p>
          <span className="text-[#ff0055] mr-2">{'>'}</span> 
          LAST_LOGIN: <br/>
          <span className="text-[#00f0ff] ml-4">{lastLogin || 'N/A'}</span>
        </p>
        <p>
          <span className="text-[#ff0055] mr-2">{'>'}</span> 
          CREATED_AT: <br/>
          <span className="text-[#00f0ff] ml-4">{accountCreated || 'N/A'}</span>
        </p>
      </div>
    </div>
  );
};