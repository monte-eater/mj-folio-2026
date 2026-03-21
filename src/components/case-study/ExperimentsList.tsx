interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  resultValue: string;
  resultLabel: string;
}

interface ExperimentsListProps {
  experiments: Experiment[];
}

export default function ExperimentsList({ experiments }: ExperimentsListProps) {
  return (
    <div className="experiments-list">
      {experiments.map((exp, i) => (
        <div key={i} className="experiment-item">
          <div className="experiment-label">
            <div className="experiment-id">{exp.id}</div>
            <div className="experiment-name">{exp.name}</div>
          </div>
          <div className="experiment-hypothesis">{exp.hypothesis}</div>
          <div className="experiment-result">
            <div className="experiment-result-value">{exp.resultValue}</div>
            <div className="experiment-result-label">{exp.resultLabel}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
