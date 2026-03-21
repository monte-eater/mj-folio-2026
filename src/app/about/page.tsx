import TopBar from "@/components/layout/TopBar";
import Copyright from "@/components/layout/Copyright";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import HeadshotBlock from "@/components/about/HeadshotBlock";
import IdentityBlock from "@/components/about/IdentityBlock";
import SocialLinks from "@/components/home/SocialLinks";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import ExperienceSection from "@/components/about/ExperienceSection";
import SkillsGrid from "@/components/about/SkillsGrid";
import ToolsRow from "@/components/about/ToolsRow";
import EducationSection from "@/components/about/EducationSection";
import { isSanityConfigured, fetchAboutPage, AboutPageData } from "@/sanity/lib/fetch";

export const metadata = {
  title: "About \u2014 Montague Joachim",
};

function AboutLeftCol({ data }: { data: AboutPageData | null }) {
  return (
    <>
      <div className="about-left-top-wrap">
        <div className="about-left-top">
          <HeadshotBlock src={data?.headshot} />
          <IdentityBlock name={data?.name} jobTitle={data?.jobTitle} />
        </div>
      </div>

      <div className="about-left-bottom">
        <CaseStudyNav />
        <SocialLinks />
      </div>
    </>
  );
}

function AboutRightCol({ data }: { data: AboutPageData | null }) {
  const paragraphs = data?.aboutParagraphs?.length
    ? data.aboutParagraphs
    : [
        "I'm a UX/UI Designer with a background that spans industrial design, retail spatial planning, and digital experimentation. Over the past 13+ years I've worked across physical and digital products — from banana display fixtures manufactured at scale, to IKEA store department rebuilds, to CRO programs optimising high-traffic e-commerce surfaces.",
        "What connects all of it is the same approach: understand the problem deeply, design with evidence, and ship things that work in the real world — not just in a prototype.",
      ];

  const skills = data?.skillGroups?.flatMap((g) => g.skills);

  return (
    <div className="about-right-content">
      <div className="content-section" id="about">
        <div className="section-label">About_001</div>
        {paragraphs.map((p, i) => (
          <p key={i} className="body-text">{p}</p>
        ))}
      </div>

      <ExperienceSection experience={data?.experience} />
      <SkillsGrid skills={skills} />
      <ToolsRow tools={data?.tools} />
      <EducationSection education={data?.education} />

      <div className="right-bottom-pad" />
    </div>
  );
}

export default async function AboutPage() {
  const data = isSanityConfigured() ? await fetchAboutPage() : null;

  return (
    <>
      <TopBar
        left="MJ PORTFOLIO \u2014 ABOUT"
        right="LOCATION: MELBOURNE_AU"
      />
      <Copyright />
      <TwoColumnLayout
        left={<AboutLeftCol data={data} />}
        right={<AboutRightCol data={data} />}
      />
    </>
  );
}
