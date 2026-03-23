export const ProfileTitle = () => {
  return (
    <div className="border-b-2 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2 border-tertiary">
      <div>
        <h1 className=" text-lg md:text-xl tracking-widest uppercase text-light drop-shadow-[0_0_8px_rgba(201,191,230,0.5)]">
          [ SYSTEM PROFILE ]
        </h1>
      </div>
      <div className="text-accent font-secondary text-[10px] tracking-[0.2em] animate-pulse">
        OP_STATUS: CONNECTED
      </div>
    </div>
  );
};