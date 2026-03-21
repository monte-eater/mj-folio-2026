interface ProcessStep {
  title: string;
  text: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="process-steps">
      {steps.map((step, i) => (
        <div key={i} className="process-step">
          <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
          <div>
            <div className="step-title">{step.title}</div>
            <div className="step-text">{step.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
