import CaseStudyNav from "./CaseStudyNav";
import SocialLinks from "@/components/home/SocialLinks";

interface MetaRow {
  label: string;
  value: string;
}

interface CaseStudyLeftColProps {
  coordLabel: string;
  title: string;
  discipline: string;
  meta: MetaRow[];
  tldr: string;
}

export default function CaseStudyLeftCol({
  coordLabel,
  title,
  discipline,
  meta,
  tldr,
}: CaseStudyLeftColProps) {
  return (
    <>
      <div className="cs-left-top-wrap">
      <div className="cs-left-top">
        <div className="cs-title-block">
          <div className="coord-label">{coordLabel}</div>
          <h1 className="project-title">
            {title.replace(/<br\s*\/?>/gi, " ")}
          </h1>
        </div>

        <div className="discipline-tag">{discipline}</div>

        <div className="meta-grid">
          {meta.filter((row) => row.label.toLowerCase() !== "team").map((row, i) => (
            <div key={i} className="meta-row-cs">
              <span className="meta-label">{row.label}</span>
              <span className="meta-value">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="tldr-block">
          <div className="tldr-label">TL;DR</div>
          <p className="tldr-text">{tldr}</p>
        </div>
      </div>
      </div>

      <div className="cs-left-bottom">
        <CaseStudyNav />
        <SocialLinks />
      </div>
    </>
  );
}
