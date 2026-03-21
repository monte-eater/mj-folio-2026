import { getCliClient } from "sanity/cli";
import * as fs from "fs";

const client = getCliClient({ apiVersion: "2024-01-01" });

(async () => {
  // Upload headshot
  const headshotPath = "C:\\Users\\Monte\\Documents\\portfolio-reference\\assets\\images\\shared\\Monte-Headshot.jpg";
  const headshotStream = fs.createReadStream(headshotPath);
  const headshotAsset = await client.assets.upload("image", headshotStream, {
    filename: "Monte-Headshot.jpg",
  });
  console.log("Uploaded headshot:", headshotAsset._id);

  const doc = {
    _id: "aboutPage",
    _type: "aboutPage",
    headshot: {
      _type: "image",
      asset: { _type: "reference", _ref: headshotAsset._id },
    },
    name: "Montague Joachim",
    jobTitle: "UX/UI Designer · Experimentation & Personalisation",
    aboutParagraphs: [
      "I'm a UX/UI Designer with a background that spans industrial design, retail spatial planning, and digital experimentation. Over the past 13+ years I've worked across physical and digital products — from banana display fixtures manufactured at scale, to IKEA store department rebuilds, to CRO programs optimising high-traffic e-commerce surfaces.",
      "What connects all of it is the same approach: understand the problem deeply, design with evidence, and ship things that work in the real world — not just in a prototype.",
    ],
    experience: [
      {
        _key: "exp1",
        role: "UX/UI Specialist, Experimentation & Personalisation",
        company: "Officeworks Ltd · Melbourne, Australia",
        period: "AUG 2022, PRESENT",
        description:
          "Lead design and delivery of high-performing customer-facing experiences across web and mobile, focusing on experimentation-led growth and platform optimisation. Designed and delivered 30+ UX/UI solutions across checkout, PDP, search and homepage journeys, resulting in $40M in measurable uplift (FY26). Early adopter of AI-enhanced tools including Claude, Gemini, and Figma AI to accelerate design and synthesise insights.",
      },
      {
        _key: "exp2",
        role: "Macro Space Planner",
        company: "Officeworks Ltd · Melbourne, Australia",
        period: "AUG 2020, DEC 2022",
        description:
          "Produced complex spatial layouts and data-driven store blueprints for the national reflow program. Managed large-scale macro space allocations, working closely with category buyers to ensure range changes balanced commercial targets with operational feasibility.",
      },
      {
        _key: "exp3",
        role: "Store Development & Retail Strategy",
        company: "UNIQLO / Target Australia · Melbourne, Australia",
        period: "AUG 2018, MAR 2020",
        description:
          "Brand touchpoints and operational standards across 22 UNIQLO stores nationally. At Target, wrote and illustrated merchandising standards for 284 stores, presenting design concepts to senior leadership and acting as brand champion across every physical touchpoint.",
      },
      {
        _key: "exp4",
        role: "Communication & Design Manager / Specialist",
        company: "IKEA Systems BV · Reading, UK & Melbourne, Australia",
        period: "MAY 2014, JUN 2018",
        description:
          "Led a design team of 9, mentoring juniors and running skill-based workshops. Partnered with national design leaders to improve the customer journey across physical and digital platforms, growing store visits by 4.5%. Designed new kitchen departments driving 32% sales growth for the category. Selected to pioneer IKEA UK's Creative Leadership Program.",
      },
      {
        _key: "exp5",
        role: "Industrial Designer",
        company: "iCreate Retail Solutions & UFO Display Solutions",
        period: "MAY 2011, APR 2014",
        description:
          "Managed projects from initial concept through to manufacturing, specialising in retail furniture and product design. Collaborated with Coles Group to prototype and roll out fixtures across 200+ stores nationally. Directed a successful tender for Dyson Australia, resulting in large-format displays for JB Hi-Fi outlets.",
      },
    ],
    skillGroups: [
      {
        _key: "sg1",
        groupName: "Core Skills",
        skills: [
          "UX / UI Design",
          "Wireframing & Prototyping",
          "A/B & Multivariate Testing",
          "User Research",
          "Usability Testing",
          "Information Architecture",
          "Mobile-First Design",
          "Industrial Design",
          "Retail Spatial Design",
          "CAD / Technical Design",
          "Design Systems",
          "Experimentation & Personalisation",
          "Stakeholder Engagement",
          "Cross-functional Collaboration",
          "Brand Governance",
          "Developer Handoff",
        ],
      },
    ],
    tools: [
      "Figma",
      "Adobe XD",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Adobe Target",
      "Axure RP",
      "AutoCAD",
      "SolidWorks",
      "HTML / CSS",
      "Claude AI",
      "Figma AI",
    ],
    education: [
      {
        _key: "edu1",
        degree: "Graduate Certificate in UX & Web Design",
        institution: "Billy Blue College of Design, Torrens University Australia · 2022",
        year: "Certificate of Excellence",
      },
      {
        _key: "edu2",
        degree: "Bachelor of Industrial Design (Honours)",
        institution: "Monash University, Caulfield",
        year: "Australasian Student Design Awards, Nominee · Callaway Golf Fusion Project, Finalist",
      },
    ],
  };

  await client.createOrReplace(doc);
  console.log("About page seeded successfully.");
})();
