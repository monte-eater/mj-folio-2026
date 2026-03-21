interface SolutionTile {
  title: string;
  text: string;
}

interface SolutionGridProps {
  tiles: SolutionTile[];
}

export default function SolutionGrid({ tiles }: SolutionGridProps) {
  return (
    <div className="solution-grid">
      {tiles.map((tile, i) => (
        <div key={i} className="solution-item">
          <div className="solution-item-title">{tile.title}</div>
          <div className="solution-item-text">{tile.text}</div>
        </div>
      ))}
    </div>
  );
}
