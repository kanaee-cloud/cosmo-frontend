export default function LeaderboardRow({ rank, pilot_id, missions_completed, total_fuel_cells }) {
  return (
    <tr className="border-b border-tertiary/50 hover:bg-[#1a113a]/40 transition-colors">
      <td className="py-3 md:py-4 px-2 md:px-4 text-white font-secondary text-xs sm:text-sm md:text-base whitespace-nowrap">{rank}</td>
      <td className="py-3 md:py-4 px-2 md:px-4 text-white font-secondary text-xs sm:text-sm md:text-base whitespace-nowrap">{pilot_id}</td>
      <td className="py-3 md:py-4 px-2 md:px-4 text-white font-secondary text-xs sm:text-sm md:text-base whitespace-nowrap text-center md:text-left">{missions_completed}</td>
      <td className="py-3 md:py-4 px-2 md:px-4 text-accent font-secondary text-xs sm:text-sm md:text-base tracking-wider font-bold whitespace-nowrap">
        {total_fuel_cells}
      </td>
    </tr>
  );
}