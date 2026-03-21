interface TechTag {
  value: string;
  primary?: boolean;
}

interface TechStackProps {
  tags: TechTag[];
}

export default function TechStack({ tags }: TechStackProps) {
  return (
    <div className="tech-stack">
      {tags.map((tag, i) => (
        <div key={i} className={`tech-tag${tag.primary ? " primary" : ""}`}>
          {tag.value}
        </div>
      ))}
    </div>
  );
}
