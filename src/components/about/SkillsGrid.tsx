const fallback = [
  "UX / UI Design", "Wireframing & Prototyping", "A/B & Multivariate Testing",
  "User Research", "Usability Testing", "Information Architecture",
  "Mobile-First Design", "Industrial Design", "Retail Spatial Design",
  "CAD / Technical Design", "Design Systems", "Experimentation & Personalisation",
  "Stakeholder Engagement", "Cross-functional Collaboration", "Brand Governance",
  "Developer Handoff",
];

interface SkillsGridProps {
  skills?: string[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  const items = skills?.length ? skills : fallback;
  return (
    <div className="content-section">
      <div className="section-label">Skills_003</div>
      <div className="skills-grid">
        {items.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
