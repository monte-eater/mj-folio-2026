interface SectionBlockProps {
  label: string;
  children: React.ReactNode;
  isFirst?: boolean;
}

export default function SectionBlock({ label, children, isFirst }: SectionBlockProps) {
  return (
    <div
      className="section-block"
      style={isFirst ? { borderTop: "none", paddingTop: 0 } : undefined}
    >
      <div className="section-label">{label}</div>
      {children}
    </div>
  );
}
