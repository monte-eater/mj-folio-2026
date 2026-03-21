interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

const fallback: ExperienceItem[] = [
  {
    role: "UX/UI Specialist, Experimentation & Personalisation",
    company: "Officeworks Ltd · Melbourne, Australia",
    period: "AUG 2022, PRESENT",
    description:
      "Lead design and delivery of high-performing customer-facing experiences across web and mobile, focusing on experimentation-led growth and platform optimisation. Designed and delivered 30+ UX/UI solutions across checkout, PDP, search and homepage journeys, resulting in $40M in measurable uplift (FY26). Early adopter of AI-enhanced tools including Claude, Gemini, and Figma AI to accelerate design and synthesise insights.",
  },
  {
    role: "Macro Space Planner",
    company: "Officeworks Ltd · Melbourne, Australia",
    period: "AUG 2020, DEC 2022",
    description:
      "Produced complex spatial layouts and data-driven store blueprints for the national reflow program. Managed large-scale macro space allocations, working closely with category buyers to ensure range changes balanced commercial targets with operational feasibility.",
  },
  {
    role: "Store Development & Retail Strategy",
    company: "UNIQLO / Target Australia · Melbourne, Australia",
    period: "AUG 2018, MAR 2020",
    description:
      "Brand touchpoints and operational standards across 22 UNIQLO stores nationally. At Target, wrote and illustrated merchandising standards for 284 stores, presenting design concepts to senior leadership and acting as brand champion across every physical touchpoint.",
  },
  {
    role: "Communication & Design Manager / Specialist",
    company: "IKEA Systems BV · Reading, UK & Melbourne, Australia",
    period: "MAY 2014, JUN 2018",
    description:
      "Led a design team of 9, mentoring juniors and running skill-based workshops. Partnered with national design leaders to improve the customer journey across physical and digital platforms, growing store visits by 4.5%. Designed new kitchen departments driving 32% sales growth for the category. Selected to pioneer IKEA UK's Creative Leadership Program.",
  },
  {
    role: "Industrial Designer",
    company: "iCreate Retail Solutions & UFO Display Solutions",
    period: "MAY 2011, APR 2014",
    description:
      "Managed projects from initial concept through to manufacturing, specialising in retail furniture and product design. Collaborated with Coles Group to prototype and roll out fixtures across 200+ stores nationally. Directed a successful tender for Dyson Australia, resulting in large-format displays for JB Hi-Fi outlets.",
  },
];

interface ExperienceSectionProps {
  experience?: ExperienceItem[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const items = experience?.length ? experience : fallback;
  return (
    <div className="content-section">
      <div className="section-label">Experience_002</div>
      {items.map((exp, i) => (
        <div key={i} className="exp-item">
          <div>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-company">{exp.company}</div>
          </div>
          <div className="exp-dates">{exp.period}</div>
          <p className="exp-desc">{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
