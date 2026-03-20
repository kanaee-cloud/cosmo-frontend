export default function LeaderboardRow({ rank, pilot_id, missions_completed, total_fuel_cells }) {
  return (
    <tr className="border-b border-tertiary/50/50 hover:bg-[#1a113a]/40 transition-colors">
      {/* 5. Font isi tabel diperbesar menjadi text-sm/base */}
      <td className="py-4 px-4 text-white font-secondary text-sm md:text-base">{rank}</td>
      <td className="py-4 px-4 text-white font-secondary text-sm md:text-base">{pilot_id}</td>
      <td className="py-4 px-4 text-white font-secondary text-sm md:text-base">{missions_completed}</td>
      <td className="py-4 px-4 text-accent font-secondary text-sm md:text-base tracking-wider font-bold">
        {total_fuel_cells}
      </td>
    </tr>
  );
}