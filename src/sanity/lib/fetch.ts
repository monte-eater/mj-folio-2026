import { getClient } from "../client";
import { urlFor } from "../image";
import { projectId } from "../env";
import {
  caseStudyBySlugQuery,
  caseStudyNavQuery,
  allCaseStudyCardsQuery,
  allCaseStudySlugsQuery,
  homePageQuery,
  aboutPageQuery,
} from "./queries";
import type { CaseStudyData } from "@/lib/types";

// Returns true if Sanity is configured with a project ID
export function isSanityConfigured(): boolean {
  return !!projectId;
}

// Helper to resolve a Sanity image field to a URL string
function resolveImage(img: unknown): string | undefined {
  if (!img || typeof img !== "object") return undefined;
  try {
    return urlFor(img).url();
  } catch {
    return undefined;
  }
}

// ── Case Study fetchers ──

interface SanityNavItem {
  slug: string;
  title: string;
}

export async function fetchCaseStudyNavList(): Promise<SanityNavItem[]> {
  return getClient().fetch(caseStudyNavQuery);
}

export async function fetchAllCaseStudySlugs(): Promise<string[]> {
  const results: { slug: string }[] = await getClient().fetch(allCaseStudySlugsQuery);
  return results.map((r) => r.slug);
}

interface SanityCardData {
  slug: string;
  projectName: string;
  discipline: string;
  title: string;
  cardCoordLabel?: string;
  cardDescription?: string;
  heroImage?: unknown;
}

export async function fetchAllCaseStudyCards() {
  const results: SanityCardData[] = await getClient().fetch(allCaseStudyCardsQuery);
  return results.map((r) => ({
    slug: r.slug,
    title: r.title.replace(/<br\s*\/?>/g, " "),
    category: r.discipline,
    description: r.cardDescription || "",
    coordLabel: r.cardCoordLabel || "",
    heroImage: resolveImage(r.heroImage),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityImageArray(arr: any[] | undefined): { src?: string; alt: string; caption?: string }[] | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr.map((item) => ({
    src: resolveImage(item.image),
    alt: item.alt || "",
    caption: item.caption,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPersonas(arr: any[] | undefined): CaseStudyData["personas"] {
  if (!arr || arr.length === 0) return undefined;
  return arr.map((p) => ({
    name: p.name,
    role: p.role,
    bio: p.bio,
    image: resolveImage(p.image),
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProductRange(arr: any[] | undefined): CaseStudyData["productRange"] {
  if (!arr || arr.length === 0) return undefined;
  return arr.map((p) => ({
    name: p.name,
    detail: p.detail,
    image: resolveImage(p.image),
  }));
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await getClient().fetch(caseStudyBySlugQuery, { slug });
  if (!raw) return null;

  return {
    slug: raw.slug,
    projectName: raw.projectName,
    projectSlug: raw.projectSlug,
    coordLabel: raw.coordLabel,
    title: raw.title,
    discipline: raw.discipline,
    meta: raw.meta || [],
    tldr: raw.tldr,
    heroImage: resolveImage(raw.heroImage),
    overview: raw.overview,
    statStrip: raw.statStrip?.length ? raw.statStrip : undefined,
    problem: raw.problem,
    insightCards: raw.insightCards?.length ? raw.insightCards : undefined,
    research: raw.research,
    researchImage: resolveImage(raw.researchImage),
    researchCaption: raw.researchCaption || undefined,
    personas: mapPersonas(raw.personas),
    researchQuote: raw.researchQuote?.text ? raw.researchQuote : undefined,
    processIntro: raw.processIntro,
    processSteps: raw.processSteps || [],
    processImage: resolveImage(raw.processImage),
    processCaption: raw.processCaption || undefined,
    pilotInfo: raw.pilotInfo?.location ? raw.pilotInfo : undefined,
    imgGrid2: mapSanityImageArray(raw.imgGrid2),
    imgGrid2Stack: raw.imgGrid2Stack ?? false,
    imgGrid3: mapSanityImageArray(raw.imgGrid3),
    imgGrid3Stack: raw.imgGrid3Stack ?? false,
    spaceMetrics: raw.spaceMetrics?.length ? raw.spaceMetrics : undefined,
    solutionIntro: raw.solutionIntro,
    solutionTiles: raw.solutionTiles || [],
    solutionImage: resolveImage(raw.solutionImage),
    solutionCaption: raw.solutionCaption || undefined,
    materials: raw.materials?.length ? raw.materials : undefined,
    materialsCaption: raw.materialsCaption || undefined,
    designPrinciples: raw.designPrinciples?.length ? raw.designPrinciples : undefined,
    productRange: mapProductRange(raw.productRange),
    productRangeCaption: raw.productRangeCaption || undefined,
    techStack: raw.techStack?.length ? raw.techStack : undefined,
    experiments: raw.experiments?.length ? raw.experiments : undefined,
    outcomes: raw.outcomes,
    keyOutcome: raw.keyOutcome,
    clientCredit: raw.clientCredit?.client ? raw.clientCredit : undefined,
    rolloutScope: raw.rolloutScope || undefined,
    reflection: raw.reflection,
    reflectionQuote: raw.reflectionQuote?.text ? raw.reflectionQuote : undefined,
    youtubeEmbed: raw.youtubeEmbed || undefined,
    youtubeCaption: raw.youtubeCaption || undefined,
  };
}

// ── Home Page ──

export interface HomePageData {
  topBarLeft: string;
  topBarRight: string;
  portfolioLabel: string;
  nameLineOne: string;
  nameLineTwo: string;
  bio: string;
  emailAddress: string;
  linkedInUrl: string;
  youtubeUrl: string;
}

export async function fetchHomePage(): Promise<HomePageData | null> {
  return getClient().fetch(homePageQuery);
}

// ── About Page ──

export interface AboutPageData {
  headshot?: string;
  name: string;
  jobTitle: string;
  aboutParagraphs: string[];
  experience: { role: string; company: string; period: string; description: string }[];
  skillGroups: { groupName: string; skills: string[] }[];
  tools: string[];
  education: { degree: string; institution: string; year: string }[];
}

export async function fetchAboutPage(): Promise<AboutPageData | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await getClient().fetch(aboutPageQuery);
  if (!raw) return null;
  return {
    ...raw,
    headshot: resolveImage(raw.headshot),
  };
}
