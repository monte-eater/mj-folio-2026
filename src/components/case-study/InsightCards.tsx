interface InsightCard {
  label: string;
  text: string;
  highlight?: boolean;
}

interface InsightCardsProps {
  cards: InsightCard[];
}

export default function InsightCards({ cards }: InsightCardsProps) {
  return (
    <div className="insight-grid">
      {cards.map((card, i) => (
        <div key={i} className={`insight-card${card.highlight ? " highlight" : ""}`}>
          <div className="insight-label">{card.label}</div>
          <div className="insight-text">{card.text}</div>
        </div>
      ))}
    </div>
  );
}
