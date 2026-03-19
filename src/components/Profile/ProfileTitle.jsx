export const ProfileTitle = () => {
  return (
    <div className="border-b-2 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2 border-[#3b2b5a]">
      <div>
        <h1 className="font-press text-lg md:text-xl tracking-widest uppercase text-[#c9bfe6] drop-shadow-[0_0_8px_rgba(201,191,230,0.5)]">
          [ SYSTEM PROFILE ]
        </h1>
      </div>
      <div className="text-[#ff0055] font-secondary text-[10px] tracking-[0.2em] animate-pulse">
        OP_STATUS: CONNECTED
      </div>
    </div>
  );
};