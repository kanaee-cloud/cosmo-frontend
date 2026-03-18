import LeaderboardRow from './LeaderboardRow';

export default function LeaderboardTable({ data }) {
  return (
    <div className="w-full h-full p-4 border border-[#3b2b5a] bg-transparent flex flex-col justify-center">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#3b2b5a]">
            {/* 5. Font Header diperbesar ke text-xs/sm */}
            <th className="py-4 px-4 font-secondary text-[#7a5299] text-xs md:text-sm tracking-widest uppercase font-normal w-20">RANK</th>
            <th className="py-4 px-4 font-secondary text-[#7a5299] text-xs md:text-sm tracking-widest uppercase font-normal">PILOT ID</th>
            <th className="py-4 px-4 font-secondary text-[#7a5299] text-xs md:text-sm tracking-widest uppercase font-normal">MISI SELESAI</th>
            <th className="py-4 px-4 font-secondary text-[#7a5299] text-xs md:text-sm tracking-widest uppercase font-normal">TOTAL FUEL CELLS</th>
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