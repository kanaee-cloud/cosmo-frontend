import LeaderboardRow from './LeaderboardRow';

export default function LeaderboardTable({ data }) {
  return (
    <div className="w-full h-full p-4 border border-tertiary bg-transparent flex flex-col justify-center transition-colors duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-tertiary transition-colors duration-500">
            <th className="py-4 px-4 font-secondary text-light/70 text-xs md:text-sm tracking-widest uppercase font-normal w-20 transition-colors duration-500">RANK</th>
            <th className="py-4 px-4 font-secondary text-light/70 text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500">PILOT ID</th>
            <th className="py-4 px-4 font-secondary text-light/70 text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500">MISI SELESAI</th>
            <th className="py-4 px-4 font-secondary text-light/70 text-xs md:text-sm tracking-widest uppercase font-normal transition-colors duration-500">TOTAL FUEL CELLS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <LeaderboardRow key={row.id} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}