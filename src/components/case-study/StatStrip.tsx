interface Stat {
  number: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
}

export default function StatStrip({ stats }: StatStripProps) {
  return (
    <div className="stat-strip">
      {stats.map((stat, i) => (
        <div key={i} className="stat-item">
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
