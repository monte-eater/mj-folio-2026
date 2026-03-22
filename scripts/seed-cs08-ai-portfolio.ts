/**
 * Seed script — CS-08: AI Portfolio Build
 * Run with: npx sanity exec scripts/seed-cs08-ai-portfolio.ts --with-user-token
 *
 * Images are screenshots from the build process captured after go-live.
 * Missing images are skipped gracefully and can be uploaded via Sanity Studio.
 */

import { getCliClient } from "sanity/cli";
import { createReadStream, existsSync } from "fs";

const IMAGES_BASE = "C:\\Users\\Monte\\Documents\\portfolio-reference\\assets\\images\\project-ai-portfolio-build";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any;

async function uploadImage(
  client: Client,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  const filePath = `${IMAGES_BASE}\\${filename}`;
  if (!existsSync(filePath)) {
    console.warn(`  ⚠  Image not found, skipping: ${filename}`);
    return undefined;
  }
  console.log(`  ↑  Uploading: ${filename}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  console.log("\n── CS-08: AI Portfolio Build ──");

  const [hero, researchImg, processImg, gridA, gridB, solutionImg] = await Promise.all([
    uploadImage(client, "hero.jpg"),
    uploadImage(client, "conversation-research.jpg"),
    uploadImage(client, "claude-code-terminal.jpg"),
    uploadImage(client, "html-prototype.jpg"),
    uploadImage(client, "sanity-studio.jpg"),
    uploadImage(client, "live-site.jpg"),
  ]);

  const doc = {
    _id: "cs-ai-portfolio-build",
    _type: "caseStudy",
    order: 9,
    slug: { _type: "slug", current: "ai-portfolio-build" },
    projectName: "AI Portfolio Build",
    projectSlug: "AI_PORTFOLIO_BUILD",
    coordLabel: "CS_008 · UX/UI · Web Development · 2026",
    title: "AI Portfolio Build",
    discipline: "UX/UI · Web Development",

    meta: [
      { _key: "m1", label: "Role", value: "Designer, Content Strategist, AI Orchestrator, Developer" },
      { _key: "m2", label: "Timeline", value: "March 2026 · 2 weeks concept to live" },
      { _key: "m3", label: "Tools", value: "Claude · Claude Code · Copilot · Next.js · Sanity · Vercel · Figma · Git" },
      { _key: "m4", label: "Scope", value: "Portfolio website · 9 case studies · CMS · Live deployment" },
    ],

    tldr: "A fully custom portfolio website designed and built collaboratively with AI agents — from content strategy and UX through to a live Next.js + Sanity CMS deployment. The entire design system, 8 case study content documents, and codebase were produced using Claude, Claude Code, and Copilot as active collaborators rather than passive tools. Concept to live site in under 2 weeks.",

    ...(hero ? { heroImage: hero } : {}),

    overview: "This portfolio site is itself a case study — built to demonstrate what a designer with 13+ years of experience can produce when AI agents are used as genuine collaborators across every phase of a project. The challenge was building a high-quality, production-ready portfolio without a development team, a large budget, or weeks of spare time. Using Claude for strategy and content, Claude Code for development, and Copilot for in-editor assistance, the entire site — design system, 8 case studies, CMS integration, and live deployment — was completed in under 2 weeks alongside full-time employment.",

    statStrip: [
      { _key: "s1", number: "< 2 WKS", label: "Concept to live" },
      { _key: "s2", number: "9", label: "Case studies" },
      { _key: "s3", number: "10+", label: "Tools & AI agents" },
    ],

    problem: "Building a portfolio that accurately represents 13+ years of cross-disciplinary work — UX/UI, industrial design, retail spatial design, and CRO — typically requires a developer, a designer, a copywriter, and weeks of production time. The constraints here were real: no development team, no extended timeline, and a need to present complex, multi-discipline work in a single coherent system. The question was whether AI agents could genuinely replace those missing collaborators — not just generate boilerplate, but actively contribute to decisions about structure, content, design, and code.",

    insightCards: [
      {
        _key: "ic1",
        label: "Pain Point 01",
        text: "13+ years of cross-disciplinary work across 4 design practices needed a single coherent content system — not a generic portfolio template with copy pasted in.",
        highlight: false,
      },
      {
        _key: "ic2",
        label: "Pain Point 02",
        text: "No development background, no team, and a 2-week window alongside full-time work — the build had to be highly efficient with zero wasted effort.",
        highlight: false,
      },
      {
        _key: "ic3",
        label: "Pain Point 03",
        text: "AI tools needed to function as genuine collaborators — making real decisions about architecture, content, and code — not just autocomplete assistants.",
        highlight: true,
      },
    ],

    research: "Research focused on two questions — what makes a portfolio effective for senior design roles, and what AI-assisted workflows could genuinely replace traditional production processes. Competitor portfolios across UX, industrial, and CRO disciplines informed the content structure and case study depth. The orthographic drawing aesthetic, sticky left column layout, and modular block system all emerged from this research phase — developed in conversation with Claude across multiple sessions before a single line of code was written.",

    ...(researchImg ? { researchImage: researchImg } : {}),
    researchCaption: "Claude conversation · Design system and content architecture developed before any code was written",

    processIntro: "The process was deliberately sequenced — content before code, structure before styling, one phase validated before the next began. Claude acted as the primary collaborator across strategy, content, and design decisions. Claude Code handled all development. A frontend developer assisted with deployment. The entire workflow ran across two platforms — Claude.ai on MacBook for content and design, Claude Code on PC for development — with all assets transferred via cloud storage between sessions.",

    processSteps: [
      {
        _key: "ps1",
        title: "Design System & HTML Prototypes",
        text: "Design system established first — Manrope typeface, teal/dark/white palette, orthographic aesthetic, sticky two-column layout. Three HTML files built as pixel-perfect templates — homepage, about, and universal case study template — before any framework was chosen. These became the source of truth for the entire build.",
      },
      {
        _key: "ps2",
        title: "Content Architecture",
        text: "A modular block system designed across 18 optional case study sections — each block activated or deactivated per project via an ACTIVE BLOCKS table. 8 case study content documents produced in a structured PLACEHOLDER to VALUE format, ready for direct CMS population without interpretation. All content written collaboratively with Claude across multiple sessions.",
      },
      {
        _key: "ps3",
        title: "Next.js + Sanity Scaffold",
        text: "Claude Code scaffolded the full Next.js App Router project, Sanity CMS schema, GROQ queries, and component library — reading the HTML templates and .md content documents as source of truth. A seed script auto-populated all 8 case studies and uploaded all image assets to Sanity in a single run.",
      },
      {
        _key: "ps4",
        title: "QA, Amendments & Deployment",
        text: "Local QA across desktop and mobile — layout fixes, content amendments, and conditional rendering logic all applied through Claude Code without manual code editing. Deployed to Vercel via GitHub with Sanity CORS configured. Live in under 2 weeks from first conversation.",
      },
    ],

    ...(processImg ? { processImage: processImg } : {}),
    processCaption: "Claude Code · Scaffolding the Next.js project and Sanity schema from HTML templates and .md content documents",

    imgGrid2: [
      {
        _key: "ig2a",
        ...(gridA ? { image: gridA } : {}),
        alt: "HTML prototype",
        caption: "HTML prototype · Design system and case study template built before framework selection",
      },
      {
        _key: "ig2b",
        ...(gridB ? { image: gridB } : {}),
        alt: "Sanity Studio",
        caption: "Sanity Studio · CMS populated automatically via seed script from .md content documents",
      },
    ],
    imgGrid2Stack: false,

    solutionIntro: "A production-ready portfolio site built on Next.js App Router with Sanity CMS — deployed to Vercel, fully content-managed, and built entirely through AI-assisted workflows. The site presents 8 case studies across 4 design disciplines in a single coherent design system, with a modular block architecture that adapts to each project's content without custom code per case study.",

    solutionTiles: [
      {
        _key: "st1",
        title: "AI-First Workflow",
        text: "Claude acted as strategist, copywriter, and design collaborator across the entire project. Claude Code handled all development. No manual code editing — every change was applied through natural language prompts with the HTML templates as source of truth.",
      },
      {
        _key: "st2",
        title: "Content Before Code",
        text: "All 8 case studies fully documented in structured .md files before development began. Each file contained an ACTIVE BLOCKS table, exact placeholder-to-value content mappings, and an image manifest — giving Claude Code everything needed to populate Sanity without interpretation.",
      },
      {
        _key: "st3",
        title: "Modular Block System",
        text: "18 optional case study blocks — stat strip, insight cards, personas, experiments, materials, product range, tech stack, YouTube embed, and more — each conditionally rendered based on Sanity field population. One template, infinite flexibility across disciplines.",
      },
      {
        _key: "st4",
        title: "Live CMS Deployment",
        text: "Next.js App Router + Sanity CMS deployed to Vercel. Content editable through Sanity Studio without touching code. New case studies added via CMS only. Images updated instantly. Site scales indefinitely without a developer.",
      },
    ],

    ...(solutionImg ? { solutionImage: solutionImg } : {}),
    solutionCaption: "Live site · mj-folio-2026.vercel.app · Next.js + Sanity + Vercel",

    techStack: [
      { _key: "ts1", value: "Claude (claude.ai) — Strategy · Content · Design · Case study writing · Decision-making", primary: true },
      { _key: "ts2", value: "Claude Code — Full Next.js scaffold · Sanity schema · Component library · Seed script · QA fixes", primary: true },
      { _key: "ts3", value: "Microsoft Copilot — AI image generation for hero assets · Reference image creation", primary: false },
      { _key: "ts4", value: "Next.js (App Router) — Frontend framework · Dynamic routing · Server-side rendering", primary: true },
      { _key: "ts5", value: "Sanity CMS — Content management · Image pipeline · Studio interface · GROQ queries", primary: true },
      { _key: "ts6", value: "Vercel — Deployment · Hosting · GitHub integration · Auto-deploy on push", primary: true },
      { _key: "ts7", value: "Git + GitHub — Version control · Source of truth · Vercel deployment trigger", primary: false },
      { _key: "ts8", value: "Visual Studio Code — Local development environment · Claude Code interface", primary: false },
      { _key: "ts9", value: "Figma — SVG asset creation · Operating model diagrams · Zone overlay graphics", primary: false },
      { _key: "ts10", value: "Adobe Creative Suite — Image editing · Export · Optimisation for Sanity upload", primary: false },
      { _key: "ts11", value: "HTML · CSS · Markdown · TypeScript · GROQ", primary: false },
    ],

    outcomes: "A production-ready portfolio website — live at mj-folio-2026.vercel.app — built in under 2 weeks alongside full-time employment, with no development team and no prior Next.js experience. 8 case studies across 4 design disciplines presented in a single coherent system. All content managed through Sanity CMS, deployable without touching code. The build demonstrated that AI agents can genuinely replace traditional production roles when used as structured collaborators rather than autocomplete tools.",

    keyOutcome: "Concept to live deployment in under 2 weeks — a fully custom Next.js + Sanity portfolio built entirely through AI-assisted workflows, with no development team, no manual code editing, and no prior framework experience.",

    reflection: "The most important lesson was that AI agents work best when given structure — not open-ended prompts. Every phase that went smoothly had clear inputs: HTML templates as visual source of truth, .md files as content source of truth, explicit ACTIVE BLOCKS tables, exact placeholder mappings. Every phase that needed rework was where those inputs were missing or ambiguous. The second lesson was sequencing — content before code, structure before styling, one validated phase before the next. If I were to do this again I'd invest even more time upfront on the content documents before touching Claude Code. The seed script that auto-populated all 8 case studies in Sanity was the single most time-saving moment of the entire build — and it only worked because the .md files were structured precisely enough for Claude Code to parse without guessing.",
  };

  await client.createOrReplace(doc);
  console.log("✓ CS-08: AI Portfolio Build seeded successfully.");
})();
