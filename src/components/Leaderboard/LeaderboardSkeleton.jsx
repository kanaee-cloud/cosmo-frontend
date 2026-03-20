export default function LeaderboardSkeleton() {
  return (
    <div className="animate-pulse w-full flex flex-col gap-4">
      {/* Skeleton Panel Atas */}
      <div className="h-64 border border-tertiary bg-transparent p-4 flex flex-col justify-between">
        <div className="h-6 w-64 bg-tertiary rounded mb-8"></div>
        <div className="flex justify-center items-end gap-6 h-full pb-4">
          <div className="w-36 h-24 bg-tertiary opacity-70" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}></div>
          <div className="w-48 h-36 bg-tertiary" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}></div>
          <div className="w-36 h-24 bg-tertiary opacity-70" style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}></div>
        </div>
      </div>

      {/* Skeleton Panel Bawah */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch h-full">
        {/* Skeleton Tabel */}
        <div className="w-full lg:w-[60%] border border-tertiary bg-transparent p-2 space-y-2">
          <div className="h-8 bg-tertiary w-full mb-4"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-secondary w-full"></div>
          ))}
        </div>
        
        {/* Skeleton Stats & Target */}
        <div className="w-full lg:w-[40%] flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-tertiary"></div>
            ))}
          </div>
          <div className="h-[220px] border-2 border-tertiary/50 bg-transparent"></div>
        </div>
      </div>
    </div>
  );
}