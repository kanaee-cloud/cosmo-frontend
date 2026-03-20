export default function LeaderboardStatsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
      {metrics.map((metric) => (
        <div 
          key={metric.id}
          className="relative h-16 p-[1px] bg-tertiary transition-colors duration-500"
          style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0% 50%)' }}
        >
          {/* Inner Hexagon for Border Effect */}
          <div 
            className="w-full h-full bg-secondary flex flex-col justify-center items-center text-center px-4 transition-colors duration-500"
            style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%, 0% 50%)' }}
          >
            {metric.label && (
              <span className="text-[8px] text-light/70 whitespace-pre-line leading-tight uppercase font-secondary tracking-widest mb-1 transition-colors duration-500">
                {metric.label}
              </span>
            )}
            <span className="text-sm text-accent font-secondary tracking-widest transition-colors duration-500">
              {metric.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}