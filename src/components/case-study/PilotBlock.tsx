interface PilotBlockProps {
  location: string;
  duration: string;
  outcome: string;
  findings: string;
}

export default function PilotBlock({ location, duration, outcome, findings }: PilotBlockProps) {
  return (
    <div className="pilot-block">
      <div className="pilot-header">
        <div className="pilot-meta">
          <div className="pilot-meta-label">Pilot Location</div>
          <div className="pilot-meta-value">{location}</div>
        </div>
        <div className="pilot-meta">
          <div className="pilot-meta-label">Duration</div>
          <div className="pilot-meta-value">{duration}</div>
        </div>
        <div className="pilot-meta">
          <div className="pilot-meta-label">Outcome</div>
          <div className="pilot-meta-value">{outcome}</div>
        </div>
      </div>
      <div className="pilot-findings">
        <div className="pilot-findings-label">Pilot Findings</div>
        <div className="pilot-findings-text">{findings}</div>
      </div>
    </div>
  );
}
