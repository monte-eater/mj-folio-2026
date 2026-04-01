import Image from "next/image";

interface SolutionTile {
  title: string;
  text: string;
  image?: string;
}

interface SolutionGridProps {
  tiles: SolutionTile[];
}

export default function SolutionGrid({ tiles }: SolutionGridProps) {
  return (
    <div className="solution-grid">
      {tiles.map((tile, i) => (
        <div key={i} className="solution-item">
          {tile.image && (
            <div className="solution-item-image">
              <Image src={tile.image} alt={tile.title} fill sizes="(max-width: 768px) 100vw, 32vw" style={{ objectFit: "cover" }} />
            </div>
          )}
          <div className="solution-item-title">{tile.title}</div>
          <div className="solution-item-text">{tile.text}</div>
        </div>
      ))}
    </div>
  );
}
