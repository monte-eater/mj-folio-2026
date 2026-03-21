interface OutcomeBlockProps {
  text: string;
}

export default function OutcomeBlock({ text }: OutcomeBlockProps) {
  return (
    <div className="outcome-block">
      <div className="outcome-title">Key Outcome</div>
      <div className="outcome-text">{text}</div>
    </div>
  );
}
