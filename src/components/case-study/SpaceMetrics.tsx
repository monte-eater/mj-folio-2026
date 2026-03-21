interface SpaceMetric {
  area: string;
  unit: string;
  label: string;
}

interface SpaceMetricsProps {
  metrics: SpaceMetric[];
}

export default function SpaceMetrics({ metrics }: SpaceMetricsProps) {
  return (
    <div className="space-metrics">
      {metrics.map((m, i) => (
        <div key={i} className="space-metric-item">
          <div className="space-metric-area">
            {m.area}
            <span className="space-metric-unit">{m.unit}</span>
          </div>
          <div className="space-metric-label">{m.label}</div>
        </div>
      ))}
    </div>
  );
}
