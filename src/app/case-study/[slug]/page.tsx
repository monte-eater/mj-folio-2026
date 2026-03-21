import { notFound } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Copyright from "@/components/layout/Copyright";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import CaseStudyLeftCol from "@/components/case-study/CaseStudyLeftCol";
import HeroBlock from "@/components/case-study/HeroBlock";
import SectionBlock from "@/components/case-study/SectionBlock";
import StatStrip from "@/components/case-study/StatStrip";
import InsightCards from "@/components/case-study/InsightCards";
import PersonaStrip from "@/components/case-study/PersonaStrip";
import QuoteBlock from "@/components/case-study/QuoteBlock";
import ProcessSteps from "@/components/case-study/ProcessSteps";
import SolutionGrid from "@/components/case-study/SolutionGrid";
import OutcomeBlock from "@/components/case-study/OutcomeBlock";
import ImgFull from "@/components/case-study/ImgFull";
import ImgGrid2 from "@/components/case-study/ImgGrid2";
import ImgGrid3 from "@/components/case-study/ImgGrid3";
import MaterialsGrid from "@/components/case-study/MaterialsGrid";
import DesignPrinciples from "@/components/case-study/DesignPrinciples";
import SpaceMetrics from "@/components/case-study/SpaceMetrics";
import PilotBlock from "@/components/case-study/PilotBlock";
import ProductRange from "@/components/case-study/ProductRange";
import TechStack from "@/components/case-study/TechStack";
import ExperimentsList from "@/components/case-study/ExperimentsList";
import ClientCredit from "@/components/case-study/ClientCredit";
import YouTubeEmbed from "@/components/case-study/YouTubeEmbed";
import { getCaseStudy, getAllSlugs } from "@/lib/caseStudies";
import { isSanityConfigured, fetchCaseStudyBySlug, fetchAllCaseStudySlugs } from "@/sanity/lib/fetch";
import type { CaseStudyData } from "@/lib/types";

export async function generateStaticParams() {
  if (isSanityConfigured()) {
    const slugs = await fetchAllCaseStudySlugs();
    return slugs.map((slug) => ({ slug }));
  }
  return getAllSlugs().map((slug) => ({ slug }));
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  let cs: CaseStudyData | undefined | null;

  if (isSanityConfigured()) {
    cs = await fetchCaseStudyBySlug(slug);
  } else {
    cs = getCaseStudy(slug);
  }

  if (!cs) notFound();

  const left = (
    <CaseStudyLeftCol
      coordLabel={cs.coordLabel}
      title={cs.title}
      discipline={cs.discipline}
      meta={cs.meta}
      tldr={cs.tldr}
    />
  );

  const right = (
    <>
      <HeroBlock src={cs.heroImage} alt={cs.projectName} />

      {/* ── Overview_001 ── */}
      <SectionBlock label="Overview_001">
        <p className="body-text">{cs.overview}</p>
        {cs.statStrip && <StatStrip stats={cs.statStrip} />}
      </SectionBlock>

      {/* ── Problem_002 ── */}
      <SectionBlock label="Problem_002">
        <p className="body-text">{cs.problem}</p>
        {cs.insightCards && <InsightCards cards={cs.insightCards} />}
      </SectionBlock>

      {/* ── Research_003 ── */}
      <SectionBlock label="Research_003">
        <p className="body-text">{cs.research}</p>
        <ImgFull src={cs.researchImage} alt="Research" caption={cs.researchCaption} />
        {cs.personas && <PersonaStrip personas={cs.personas} />}
        {cs.researchQuote && (
          <QuoteBlock text={cs.researchQuote.text} attribution={cs.researchQuote.attribution} />
        )}
      </SectionBlock>

      {/* ── Process_004 ── */}
      <SectionBlock label="Process_004">
        <p className="body-text">{cs.processIntro}</p>
        <ProcessSteps steps={cs.processSteps} />
        <ImgFull src={cs.processImage} alt="Process" caption={cs.processCaption} />
        {cs.pilotInfo && <PilotBlock {...cs.pilotInfo} />}
        {cs.imgGrid2 && <ImgGrid2 items={cs.imgGrid2} stack={cs.imgGrid2Stack} />}
        {cs.spaceMetrics && <SpaceMetrics metrics={cs.spaceMetrics} />}
      </SectionBlock>

      {/* ── Solution_005 ── */}
      <SectionBlock label="Solution_005">
        <p className="body-text">{cs.solutionIntro}</p>
        <SolutionGrid tiles={cs.solutionTiles} />
        <ImgFull src={cs.solutionImage} alt="Solution" caption={cs.solutionCaption} />
        {cs.youtubeEmbed && <YouTubeEmbed url={cs.youtubeEmbed} caption={cs.youtubeCaption} />}
        {cs.imgGrid3 && <ImgGrid3 items={cs.imgGrid3} stack={cs.imgGrid3Stack} />}
        {cs.materials && <MaterialsGrid materials={cs.materials} caption={cs.materialsCaption} />}
        {cs.designPrinciples && <DesignPrinciples principles={cs.designPrinciples} />}
        {cs.productRange && <ProductRange variants={cs.productRange} caption={cs.productRangeCaption} />}
        {cs.techStack && <TechStack tags={cs.techStack} />}
        {cs.experiments && <ExperimentsList experiments={cs.experiments} />}
      </SectionBlock>

      {/* ── Outcomes_006 ── */}
      <SectionBlock label="Outcomes_006">
        <p className="body-text">{cs.outcomes}</p>
        <OutcomeBlock text={cs.keyOutcome} />
        {cs.clientCredit && (
          <ClientCredit client={cs.clientCredit.client} via={cs.clientCredit.via} />
        )}
      </SectionBlock>

      {/* ── Reflection_007 ── */}
      <SectionBlock label="Reflection_007">
        <p className="body-text">{cs.reflection}</p>
        {cs.reflectionQuote && (
          <QuoteBlock text={cs.reflectionQuote.text} attribution={cs.reflectionQuote.attribution} />
        )}
      </SectionBlock>

      <div className="right-bottom-pad" />
    </>
  );

  return (
    <>
      <TopBar
        left={`MJ PORTFOLIO — ${cs.projectSlug}`}
        right="LOCATION: MELBOURNE_AU"
      />
      <Copyright />
      <TwoColumnLayout left={left} right={right} showScrollFab />
    </>
  );
}
