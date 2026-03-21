interface Material {
  name: string;
  spec: string;
  use: string;
  swatch: string;
}

interface MaterialsGridProps {
  materials: Material[];
  caption?: string;
}

export default function MaterialsGrid({ materials, caption }: MaterialsGridProps) {
  return (
    <>
      <div className="solution-grid mat-grid">
        {materials.map((mat, i) => (
          <div key={i} className="solution-item">
            {mat.swatch && (
              <div style={{ width: 32, height: 32, background: mat.swatch, marginBottom: 12 }} />
            )}
            <div className="solution-item-title">{mat.name}</div>
            <div className="solution-item-text">{mat.spec}</div>
            {mat.use && (
              <div className="solution-item-text" style={{ marginTop: 6, color: "var(--teal)", fontWeight: 600 }}>
                {mat.use}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <div className="img-caption">{caption}</div>}
    </>
  );
}
