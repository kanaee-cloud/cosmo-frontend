export default function LeaderboardHeader({ matrixColor = '#ff0055' }) {
  return (
    <div className="pt-4 px-6 mb-8">
      <h1 
        className="font-press text-lg tracking-widest uppercase"
        style={{ color: matrixColor }}
      >
        DEWAN KEHORMATAN KOSMIK
      </h1>
    </div>
  );
}