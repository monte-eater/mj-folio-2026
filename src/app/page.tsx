import TopBar from "@/components/layout/TopBar";
import Copyright from "@/components/layout/Copyright";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import NameBlock from "@/components/home/NameBlock";
import AboutBlock from "@/components/home/AboutBlock";
import SocialLinks from "@/components/home/SocialLinks";
import ProjectGrid from "@/components/home/ProjectGrid";
import { ProjectCardData } from "@/components/home/ProjectCard";
import { isSanityConfigured, fetchAllCaseStudyCards } from "@/sanity/lib/fetch";

const fallbackProjects: ProjectCardData[] = [
  {
    slug: "checkout-optimisation",
    title: "Checkout Optimisation",
    category: "CRO / Experimentation",
    description:
      "Multi-test exploration to reduce Checkout friction \u2014 one variant shipped to production, durable design rules preserved.",
    coordLabel: "014 \u00B7 01",
  },
  {
    slug: "banana-barge",
    title: "Banana Barge",
    category: "Industrial Design",
    description:
      "Purpose-built banana display fixture for Coles \u2014 deployed across 500+ stores nationally, still in use 10+ years later.",
    coordLabel: "015 \u00B7 02",
  },
  {
    slug: "ikea-make-room-for-life",
    title: "IKEA \u2014 Make Room for Life",
    category: "Retail Spatial Design",
    description:
      "Full Living Room department rebuild for IKEA UK & Ireland \u2014 function-first grouping, hot-spot planning, and coordinated VM.",
    coordLabel: "016 \u00B7 03",
  },
  {
    slug: "through-the-woods",
    title: "Through the Woods",
    category: "Industrial Design",
    description:
      "Nature-inspired A/W toy range \u2014 costumes, plush, and wooden play built from sustainable materials throughout.",
    coordLabel: "017 \u00B7 04",
  },
  {
    slug: "la-bohemia",
    title: "La Bohemia",
    category: "Web Design",
    description:
      "Task-first WIX site for a Chilean caf\u00e9 & bar \u2014 orders, reservations, and menus live from day one.",
    coordLabel: "018 \u00B7 05",
  },
  {
    slug: "medipal",
    title: "MediPal",
    category: "UX / UI Design",
    description:
      "Healthcare app concept \u2014 appointment booking, real-time tracking, and treatment management validated through usability testing.",
    coordLabel: "019 \u00B7 06",
  },
  {
    slug: "acre-organics",
    title: "Acre Organics",
    category: "UX / UI Design",
    description:
      "Online grocery experience focused on quality produce, reusable packaging, and store-like navigation.",
    coordLabel: "020 \u00B7 07",
  },
  {
    slug: "homepage-optimisation",
    title: "Homepage Optimisation",
    category: "CRO / Experimentation",
    description:
      "Multi-year Homepage evolution \u2014 shifting from campaign canvas to orientation layer with one-job-per-zone model.",
    coordLabel: "021 \u00B7 08",
  },
];

function HomeLeftCol() {
  return (
    <>
      <div
        className="home-left-top"
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          gap: 46,
        }}
      >
        <NameBlock />
        <AboutBlock />
      </div>

      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          paddingBottom: 0,
        }}
        className="home-left-bottom"
      >
        <SocialLinks />
      </div>
    </>
  );
}

function HomeRightCol({ projects }: { projects: ProjectCardData[] }) {
  return (
    <>
      <div
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          gap: 46,
        }}
      >
        <div>
          <div
            style={{
              alignSelf: "stretch",
              paddingBottom: 24,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 32,
            }}
          >
            <div style={{ flex: "1 1 0" }}>
              <div
                style={{
                  color: "#252525",
                  fontSize: 32,
                  fontWeight: 600,
                }}
                className="portfolio-label-text"
              >
                Portfolio_014-026
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProjectGrid projects={projects} />
    </>
  );
}

export default async function Home() {
  let projects: ProjectCardData[] = fallbackProjects;

  if (isSanityConfigured()) {
    const sanityCards = await fetchAllCaseStudyCards();
    if (sanityCards.length > 0) {
      projects = sanityCards;
    }
  }

  return (
    <>
      <TopBar
        left="MJ PORTFOLIO \u2014 SHEET 01/01"
        right="LOCATION: MELBOURNE_AU"
      />
      <Copyright />
      <TwoColumnLayout left={<HomeLeftCol />} right={<HomeRightCol projects={projects} />} />
    </>
  );
}
