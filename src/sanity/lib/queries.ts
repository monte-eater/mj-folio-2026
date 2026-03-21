import { groq } from "next-sanity";

// ── Case Studies ──

export const allCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]
  | order(order asc){
    "slug": slug.current
  }
`;

export const allCaseStudyCardsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]
  | order(order asc){
    "slug": slug.current,
    projectName,
    discipline,
    title,
    cardCoordLabel,
    cardDescription,
    heroImage
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    projectName,
    projectSlug,
    coordLabel,
    title,
    discipline,
    meta,
    tldr,
    heroImage,
    overview,
    statStrip,
    problem,
    insightCards,
    research,
    researchImage,
    researchCaption,
    personas[]{
      name,
      role,
      bio,
      image
    },
    researchQuote,
    processIntro,
    processSteps,
    processImage,
    processCaption,
    pilotInfo,
    imgGrid2[]{
      image,
      alt,
      caption
    },
    imgGrid2Stack,
    imgGrid3[]{
      image,
      alt,
      caption
    },
    imgGrid3Stack,
    spaceMetrics,
    solutionIntro,
    solutionTiles,
    solutionImage,
    solutionCaption,
    materials,
    materialsCaption,
    designPrinciples,
    productRange[]{
      name,
      detail,
      image
    },
    productRangeCaption,
    techStack,
    experiments,
    outcomes,
    keyOutcome,
    clientCredit,
    rolloutScope,
    reflection,
    reflectionQuote,
    youtubeEmbed,
    youtubeCaption
  }
`;

// Adjacent case studies for prev/next nav
export const caseStudyNavQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]
  | order(order asc){
    "slug": slug.current,
    title
  }
`;

// ── Home Page ──

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    topBarLeft,
    topBarRight,
    portfolioLabel,
    nameLineOne,
    nameLineTwo,
    bio,
    emailAddress,
    linkedInUrl,
    youtubeUrl
  }
`;

// ── About Page ──

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    headshot,
    name,
    jobTitle,
    aboutParagraphs,
    experience,
    skillGroups,
    tools,
    education
  }
`;
