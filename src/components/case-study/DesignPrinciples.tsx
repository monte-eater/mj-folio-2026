interface Principle {
  title: string;
  text: string;
}

interface DesignPrinciplesProps {
  principles: Principle[];
}

export default function DesignPrinciples({ principles }: DesignPrinciplesProps) {
  return (
    <div className="principles-list">
      {principles.map((p, i) => (
        <div key={i} className="principle-item">
          <div className="principle-num">{String(i + 1).padStart(2, "0")}</div>
          <div>
            <div className="principle-title">{p.title}</div>
            <div className="principle-text">{p.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
