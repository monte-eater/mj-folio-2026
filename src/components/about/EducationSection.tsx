interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

const fallback: EducationItem[] = [
  {
    degree: "Graduate Certificate in UX & Web Design",
    institution: "Billy Blue College of Design, Torrens University Australia · 2022",
    year: "Certificate of Excellence",
  },
  {
    degree: "Bachelor of Industrial Design (Honours)",
    institution: "Monash University, Caulfield",
    year: "Australasian Student Design Awards, Nominee · Callaway Golf Fusion Project, Finalist",
  },
];

interface EducationSectionProps {
  education?: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  const items = education?.length ? education : fallback;
  return (
    <div className="content-section">
      <div className="section-label">Education_005</div>
      {items.map((edu, i) => (
        <div key={i} className="edu-item">
          <div className="edu-degree">{edu.degree}</div>
          <div className="edu-school">{edu.institution}</div>
          <div className="edu-detail">{edu.year}</div>
        </div>
      ))}
    </div>
  );
}
