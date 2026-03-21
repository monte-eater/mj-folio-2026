export interface CaseStudyData {
  slug: string;
  projectName: string;
  projectSlug: string;
  coordLabel: string;
  title: string; // HTML with <br>
  discipline: string;
  meta: { label: string; value: string }[];
  tldr: string;

  heroImage?: string;

  overview: string;
  statStrip?: { number: string; label: string }[];

  problem: string;
  insightCards?: { label: string; text: string; highlight?: boolean }[];

  research: string;
  researchImage?: string;
  researchCaption?: string;
  personas?: { name: string; role: string; bio: string; image?: string }[];
  researchQuote?: { text: string; attribution: string };

  processIntro: string;
  processSteps: { title: string; text: string }[];
  processImage?: string;
  processCaption?: string;
  pilotInfo?: { location: string; duration: string; outcome: string; findings: string };
  imgGrid2?: { src?: string; alt: string; caption?: string }[];
  imgGrid2Stack?: boolean;
  imgGrid3?: { src?: string; alt: string; caption?: string }[];
  imgGrid3Stack?: boolean;
  spaceMetrics?: { area: string; unit: string; label: string }[];

  solutionIntro: string;
  solutionTiles: { title: string; text: string }[];
  solutionImage?: string;
  solutionCaption?: string;
  materials?: { name: string; spec: string; use: string; swatch: string }[];
  materialsCaption?: string;
  designPrinciples?: { title: string; text: string }[];
  productRange?: { name: string; detail: string; image?: string }[];
  productRangeCaption?: string;
  techStack?: { value: string; primary?: boolean }[];
  experiments?: { id: string; name: string; hypothesis: string; resultValue: string; resultLabel: string }[];

  outcomes: string;
  keyOutcome: string;
  clientCredit?: { client: string; via: string };
  rolloutScope?: string;

  reflection: string;
  reflectionQuote?: { text: string; attribution: string };

  youtubeEmbed?: string;
  youtubeCaption?: string;
}
