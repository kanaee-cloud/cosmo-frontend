import LeaderboardRow from './LeaderboardRow';

export default function LeaderboardTable({ data }) {
  return (
    <div className="w-full h-full p-2 md:p-4 border border-tertiary bg-transparent flex flex-col justify-start transition-colors duration-500 overflow-hidden">
      {/* Wrapper untuk Horizontal Scroll di Mobile */}
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[450px]">
          <thead>
            <tr className="border-b-2 border-tertiary transition-colors duration-500">
              <th className="py-3 md:py-4 px-2 md:px-4 font-secondary text-light/70 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-normal w-12 md:w-20 transition-colors duration-500 whitespace-nowrap">RANK</th>
              <th className="py-3 md:py-4 px-2 md:px-4 font-secondary text-light/70 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500 whitespace-nowrap">PILOT ID</th>
              <th className="py-3 md:py-4 px-2 md:px-4 font-secondary text-light/70 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500 whitespace-nowrap">MISI SELESAI</th>
              <th className="py-3 md:py-4 px-2 md:px-4 font-secondary text-light/70 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500 whitespace-nowrap">TOTAL FUEL CELLS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <LeaderboardRow key={row.id} {...row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}