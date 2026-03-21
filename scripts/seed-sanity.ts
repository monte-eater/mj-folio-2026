/**
 * Sanity seed script — populates all 8 case study documents with content
 * and uploads images from portfolio-reference/assets/images.
 *
 * Run with:
 *   npx sanity exec scripts/seed-sanity.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";
import { createReadStream, existsSync } from "fs";
import path from "path";

const IMAGES_BASE = path.join(
  "C:",
  "Users",
  "Monte",
  "Documents",
  "portfolio-reference",
  "assets",
  "images"
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any;

async function uploadImage(
  client: Client,
  projectDir: string,
  filename: string,
  retries = 3
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  const filePath = path.join(IMAGES_BASE, projectDir, filename);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠  Image not found, skipping: ${filename}`);
    return undefined;
  }
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  ↑  Uploading: ${filename}${attempt > 1 ? ` (attempt ${attempt})` : ""}`);
      const asset = await client.assets.upload(
        "image",
        createReadStream(filePath),
        { filename }
      );
      return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch (err: unknown) {
      const isLast = attempt === retries;
      const status = (err as { statusCode?: number }).statusCode;
      if (!isLast && (status === 502 || status === 503 || status === 429)) {
        const wait = attempt * 2000;
        console.warn(`  ⚠  ${status} on ${filename}, retrying in ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
      } else {
        throw err;
      }
    }
  }
}

async function seq(uploads: (() => Promise<unknown>)[]): Promise<unknown[]> {
  const results: unknown[] = [];
  for (const fn of uploads) results.push(await fn());
  return results;
}

function key(s: string) {
  return s.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
}

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  // ─────────────────────────────────────────────────────────────
  // CS-00: Checkout Optimisation
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-00: Checkout Optimisation ──");
  const dir00 = "project-checkout-optimisation";
  const [co_hero, co_research, co_process, co_gl, co_cr, co_solution] =
    await seq([
      () => uploadImage(client, dir00, "hero.jpg"),
      () => uploadImage(client, dir00, "heuristic-teardown.jpg"),
      () => uploadImage(client, dir00, "experiment-streams.jpg"),
      () => uploadImage(client, dir00, "guest-login-iteration.jpg"),
      () => uploadImage(client, dir00, "cart-review-iteration.jpg"),
      () => uploadImage(client, dir00, "shipped-desktop-pattern.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-checkout-optimisation",
    _type: "caseStudy",
    projectName: "Officeworks — Checkout UX Optimisation",
    slug: { _type: "slug", current: "checkout-optimisation" },
    projectSlug: "OFFICEWORKS_CHECKOUT_OPTIMISATION",
    coordLabel: "CS_000 · CRO / Experimentation · 2024–2025",
    title: "Checkout<br>Optimisation",
    discipline: "CRO / Experimentation",
    meta: [
      { _key: "role", label: "Role", value: "UX & Experimentation Designer" },
      { _key: "timeline", label: "Timeline", value: "2024 → 2025 · Programme paused mid-2025" },
      { _key: "team", label: "Team", value: "CRO/Experimentation · Design · Analytics · Dev Squad" },
      { _key: "tools", label: "Tools", value: "Figma · Miro · Adobe Target · Adobe Analytics · Jira · Confluence" },
      { _key: "scope", label: "Scope", value: "Guest/Login UI · Cart Review → Continue · Mobile CTA Visibility · Customer Details" },
    ],
    tldr: "A research-led, multi-test exploration to reduce Checkout friction and shorten the perceived journey — without changing payment mechanics. Led UX and experimentation across three streams: guest/login UI, Cart Review → Continue, and mobile-first CTA visibility. One desktop customer-details variant shipped to production; the programme was paused mid-2025 due to compounding roadblocks, with durable insights and design rules preserved for future enabling work.",
    heroImage: co_hero,
    order: 0,
    cardCoordLabel: "014 · 01",
    cardDescription: "Multi-test exploration to reduce Checkout friction — one variant shipped to production, durable design rules preserved.",
    overview: "The Officeworks Checkout is a shared web/app surface handling a wide range of customer types — guest, logged-in, loyalty members — across desktop and mobile. The optimisation program aimed to reduce friction and shorten the perceived journey without touching payment mechanics or back-end platform logic. Three parallel streams ran across 2024–2025 — guest/login UI, Cart Review progression, and mobile CTA visibility — each structured as iterate-to-success experiments with clear hypotheses and guardrail metrics.",
    problem: "Customers experienced a confusing, hard-to-navigate checkout with friction editing the cart once inside. Delivery costs and availability appeared too late, loyalty and discount placement was unclear, and some UI patterns competed with the primary progression path. Platform constraints — how availability is populated after address entry, brittle payment-step behaviours — limited what could be solved through front-end tests alone.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Cart editing friction — once inside checkout, customers found it difficult to modify their cart, creating confusion and abandonment at a high-value moment in the journey.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Late delivery transparency — costs and availability surfacing too late in the flow created frustration and trust issues at the point of commitment.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Mobile CTA visibility — primary Continue actions were consistently pushed below the fold on small screens by competing UI elements, creating a device-specific drop-off problem.", highlight: true },
    ],
    research: "Research combined customer feedback (NPS and internal notes), heuristic teardown, competitor analysis of checkout flows (guest-first affordance, fewer fields, early delivery transparency, progress indicators, express pay, sticky order summaries), and a FY25 Checkout experimentation plan. Four design principles framed the work: shorten the perceived journey, respect intent (guest-first by default), optimise for device realities, and operate within the stack.",
    researchImage: co_research,
    researchCaption: "Heuristic teardown · Checkout friction mapping across guest/login, cart review, and mobile CTA streams",
    processIntro: "The program ran across four phases — framing, experiments and iteration, shipping, and knowledge transfer — with three parallel streams each following an iterate-to-success model. Each A/B test included clear hypotheses, targeting, and primary/guardrail metrics. One variant shipped; the programme was paused mid-2025 with all insights consolidated into design rules for future enabling work.",
    processSteps: [
      { _key: "ps1", title: "Stream A — Guest/Login UI", text: "First attempt emphasised account/login within Customer Details — continuation was neutral but acquisition intent dipped. An iteration introduced side-by-side CTAs with value cues, improving login/registration intent while keeping continuation neutral. A targeted variant for recently-known customers removed irrelevant options. Desktop stacked CTA layout shipped to production." },
      { _key: "ps2", title: "Stream B — Cart Review → Continue", text: "First pass raised the primary Continue CTA above the fold — neutral/negative site-wide due to a large logged-in cohort preferring familiar affordance. Iteration restored familiar cues while maintaining prominence; behavioural signals moved in the right direction. Heatmaps confirmed dead-click friction on non-interactive panels; simplification concept established a single obvious CTA pattern." },
      { _key: "ps3", title: "Stream C — Mobile CTA Visibility", text: "A sticky Continue CTA improved visibility but competed with high-value recommendation placements on small screens — neutral-to-negative continuation and a material drop in add-on behaviour. Not commercially viable in tested form. Recommendation: contextual or paged alternatives that preserve upsell value." },
      { _key: "ps4", title: "Knowledge Transfer", text: "Programme paused mid-2025 due to technical blockers, stakeholder constraints, and a platform change that prevented live testing. Findings consolidated into design rules and operating guardrails for stakeholders — ready to reuse when enabling work unblocks deeper changes." },
    ],
    processImage: co_process,
    processCaption: "Three parallel experiment streams · Guest/Login · Cart Review · Mobile CTA · 2024–2025",
    imgGrid2: [
      { _key: "g2a", image: co_gl, alt: "Guest/Login UI iteration", caption: "Stream A · Guest/Login UI — initial account emphasis vs side-by-side CTAs with value cues" },
      { _key: "g2b", image: co_cr, alt: "Cart Review iteration", caption: "Stream B · Cart Review — above-the-fold Continue vs prominence-with-familiarity" },
    ],
    solutionIntro: "The solution is a set of design patterns and guardrails — not a single shipped screen. One desktop customer-details variant is live in production; the remaining patterns are codified as design rules ready to scale when platform enabling work lands.",
    solutionTiles: [
      { _key: "st1", title: "Guest-First with Value-Cued Login", text: "Keep guest checkout obvious. Side-by-side CTAs with succinct value proof when prompting for account/login. For recently-known customers, suppress irrelevant options to reduce choice friction. ~30% relative uplift in registration starts." },
      { _key: "st2", title: "Cart Review Clarity", text: "Familiar, obvious Continue affordance for logged-in customers. Reduce below-the-fold dependency. Retire dead-click panels that look interactive but aren't. Avoid stacking competing modules above the primary path at the moment of progression." },
      { _key: "st3", title: "Mobile Rules", text: "Ensure visibility of the primary action without permanently crowding the viewport or cannibalising upsell areas. Prefer contextual or progressive patterns over permanent sticky elements — confirmed by CT-288 decline." },
      { _key: "st4", title: "Scope Guardrails", text: "Focus optimisation where the team can ship sustainably — UI, sequencing, copy, validation, trust signals. Defer back-end-heavy ideas (delivery transparency, availability logic) until enabling platform work makes them low-risk." },
    ],
    solutionImage: co_solution,
    solutionCaption: "Shipped · Desktop customer-details stacked CTA layout — now live in production",
    experiments: [
      { _key: "e1", id: "CT-185", name: "Initial Account Emphasis", hypothesis: "Emphasising account/login within Customer Details will improve registration and login rates.", resultValue: "Neutral/negative", resultLabel: "Acquisition intent softened · Iterate → CT-201" },
      { _key: "e2", id: "CT-201", name: "Side-by-Side CTAs with Value Cues", hypothesis: "Side-by-side CTAs with value proof will improve login/registration intent without penalising continuation.", resultValue: "~30% relative ↑", resultLabel: "Registration starts · Winner → CT-214" },
      { _key: "e3", id: "CT-214 ⭐", name: "Desktop Stacked CTA Layout", hypothesis: "A stacked CTA layout for desktop Customer Details will improve clarity and acquisition signals.", resultValue: "Shipped", resultLabel: "Live in production" },
      { _key: "e4", id: "CT-206", name: "Known Customer Targeting", hypothesis: "Removing irrelevant options for recently-known customers will reduce choice friction and improve login rates.", resultValue: "Positive", resultLabel: "Login attempts ↑ · Adopted" },
      { _key: "e5", id: "CT-229", name: "Continue Above the Fold", hypothesis: "Raising the primary Continue CTA above the fold will improve checkout continuation.", resultValue: "Neutral/negative", resultLabel: "Familiar affordance disrupted · Iterate → CT-237" },
      { _key: "e6", id: "CT-237", name: "Prominence with Familiarity", hypothesis: "Restoring familiar cues while maintaining CTA prominence will improve continuation without penalising completion.", resultValue: "Positive direction", resultLabel: "Signals improved · Led to CT-243" },
      { _key: "e7", id: "CT-243", name: "Dead-Click Panel Simplification", hypothesis: "Removing non-clickable panels that generated dead clicks will reduce confusion and clarify the path to Continue.", resultValue: "Rules adopted", resultLabel: "Single CTA pattern codified" },
      { _key: "e8", id: "CT-288", name: "Persistent Sticky Continue (Mobile)", hypothesis: "A persistent sticky Continue CTA on mobile will improve CTA visibility and checkout continuation.", resultValue: "Declined", resultLabel: "Add-on behaviour ↓ · Contextual alternative recommended" },
    ],
    outcomes: "One desktop customer-details variant (stacked CTA layout) shipped to production and is now part of the live experience. The broader programme was paused mid-2025 due to technical and stakeholder roadblocks. Insights and design rules are preserved and ready to resume. All outcomes are directional — no commercially sensitive metrics are published.",
    keyOutcome: "One variant shipped — the desktop stacked CTA layout is now live. Eight further experiments produced durable design rules and guardrails across guest/login, cart review, and mobile CTA streams — ready to scale when platform enabling work resumes.",
    reflection: "This work is best framed as research, exploration, and learning. It identified what helps — guest-first clarity, value-cued login, familiarity at key decision points — and what harms — crowding mobile viewports, competing with upsell at the wrong moment. Equally, it surfaced limits that front-end tests cannot solve alone. The programme pause was frustrating but honest — shipping one strong pattern and preserving the rest as design rules is a better outcome than forcing changes that the platform couldn't sustain. If I were to do it differently, I'd map platform constraints earlier and build the test backlog around what's actually shippable — rather than discovering blockers mid-cycle.",
  });
  console.log("  ✓  CS-00 created");

  // ─────────────────────────────────────────────────────────────
  // CS-01: Banana Barge
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-01: Banana Barge ──");
  const dir01 = "project-banana-barge";
  const [bb_hero, bb_research, bb_process, bb_pilot, bb_exploded] =
    await seq([
      () => uploadImage(client, dir01, "hero.jpg"),
      () => uploadImage(client, dir01, "replenishment-context.jpg"),
      () => uploadImage(client, dir01, "solidworks-exploded.jpg"),
      () => uploadImage(client, dir01, "pilot-instore.jpg"),
      () => uploadImage(client, dir01, "solidworks-exploded.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-banana-barge",
    _type: "caseStudy",
    projectName: "Banana Barge",
    slug: { _type: "slug", current: "banana-barge" },
    projectSlug: "BANANA_BARGE",
    coordLabel: "CS_001 · Industrial Design · 2014",
    title: "Banana<br>Barge",
    discipline: "Industrial Design",
    meta: [
      { _key: "role", label: "Role", value: "Industrial/Product Designer — Concept, CAD, Prototyping, Pilot, Production Handover" },
      { _key: "timeline", label: "Timeline", value: "Concept → Prototyping → 6-month Pilot → National Rollout" },
      { _key: "team", label: "Team", value: "Internal design & fabrication; Coles produce team; offshore manufacturing" },
      { _key: "tools", label: "Tools", value: "SolidWorks · Materials sampling · In-store trials" },
      { _key: "scope", label: "Scope", value: "Retail fixture · 3 size variants · 500+ stores nationally" },
    ],
    tldr: "Purpose-built banana display fixture for Coles Supermarkets — designed to maximise on-floor stock capacity while reducing bruising and waste. Role spanned SolidWorks development, prototype refinement, a 6-month in-store pilot, and production handover. Result: a modular, durable fixture deployed nationally across 500+ stores and still in use 10+ years later.",
    heroImage: bb_hero,
    order: 1,
    cardCoordLabel: "015 · 02",
    cardDescription: "Purpose-built banana display fixture for Coles — deployed across 500+ stores nationally, still in use 10+ years later.",
    overview: "The Banana Barge is a purpose-built fresh produce display fixture designed for Coles Supermarkets — one of Australia's largest grocery retailers. With bananas being one of the highest-grossing items in the fresh produce section, Coles needed a fixture that could hold significantly more stock on the floor daily while protecting a notoriously fragile product. The design challenge was balancing display capacity, product preservation, hygiene, and ease of replenishment — across stores of varying footprints — within the constraints of offshore manufacture and long-term retail durability.",
    problem: "Bananas are high-volume and high-value but physically fragile — existing display solutions weren't purpose-built for the product, leading to bruising, waste, and suboptimal capacity. Coles required a fixture that could increase daily on-floor stock, reduce damage through better geometry and surface treatment, adapt to different store footprints through modular sizing, and withstand the demands of a wet-clean retail environment over years of use.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Existing display solutions caused bruising — contact surfaces and loading angles weren't designed for the fragility of bananas at scale.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Fixed-size fixtures couldn't adapt to varied store footprints — a single solution needed to work across 500+ stores of different sizes.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Hygiene, replenishment speed, and cleaning ease were non-negotiable operational constraints that had to be designed in from the start.", highlight: true },
    ],
    research: "Research focused on observing in-store replenishment behaviours and understanding operational constraints — reach, load height, stock flow from back-of-house to floor, and cleaning routines. Materials were benchmarked for hygiene performance, impact resistance, finish longevity, and suitability for a wet-clean environment. The goal was to reduce bruising while keeping replenishment and cleaning simple for store staff.",
    researchImage: bb_research,
    researchCaption: "In-store observation · Replenishment flow and load height constraints",
    processIntro: "The process moved from in-store observation and material benchmarking through SolidWorks CAD development, multiple prototype rounds, a formal in-store pilot, and offshore manufacture — with each phase directly informing the next. The 6-month pilot at Coles Brighton was the critical validation gate before committing to national production.",
    processSteps: [
      { _key: "ps1", title: "CAD Development", text: "Full 3D definition, joint detailing, and bill of materials developed in SolidWorks. Stepped geometry established early to maximise display capacity and visibility while keeping the form manufacturable at scale." },
      { _key: "ps2", title: "Prototyping", text: "Multiple prototype rounds refining edge treatments, contact surface radii, and module interfaces — each iteration focused on reducing pressure points that cause bruising during loading and replenishment." },
      { _key: "ps3", title: "In-Store Pilot", text: "6-month trial at Coles Brighton validated capacity, replenishment flow, cleaning ease, and damage reduction in a live retail environment. Findings confirmed the design was ready for national production." },
      { _key: "ps4", title: "Manufacturing & Rollout", text: "Offshore production managed through fabrication partners, with national deployment across 500+ Coles supermarkets. Modular construction simplified logistics — flat-pack transport and in-store assembly without specialist trades." },
    ],
    processImage: bb_process,
    processCaption: "SolidWorks assembly · Exploded view showing module interfaces and joinery",
    pilotInfo: {
      location: "Coles Brighton",
      duration: "6 months",
      outcome: "National rollout — 500+ stores",
      findings: "Validated on-floor capacity increase, replenishment ease, cleaning performance, and damage reduction. Edge refinements from prototype rounds confirmed effective in live conditions.",
    },
    imgGrid2: [
      { _key: "g2a", image: bb_pilot, alt: "Pilot installation at Coles Brighton", caption: "Pilot installation · Coles Brighton · 6-month trial" },
      { _key: "g2b", image: bb_exploded, alt: "SolidWorks exploded view", caption: "SolidWorks exploded view · Module interfaces, joinery and material callouts" },
    ],
    solutionIntro: "The Banana Barge is a stepped, oval-form display fixture in three modular sizes — built from Victorian Ash timber, 304 stainless steel, and 6mm Haircell ABS. Stepped geometry increases on-floor capacity and product visibility; smooth contact surfaces and careful edge radii minimise bruising; modular construction adapts to any store footprint and simplifies transport and installation.",
    solutionTiles: [
      { _key: "st1", title: "Stepped Geometry", text: "Tiered display surface increases on-floor stock capacity and product visibility while keeping the fixture accessible for both shoppers and staff during replenishment." },
      { _key: "st2", title: "Modular Construction", text: "Three size variants — Small, Medium, Large — built from the same modular components. Flat-pack transport, straightforward in-store assembly, and easy replacement of individual panels." },
      { _key: "st3", title: "Material Selection", text: "Victorian Ash for structural warmth, 304 stainless steel for hygiene durability, 6mm Haircell ABS for thermoformed contact surfaces. All materials selected for wet-clean compatibility and long retail lifespan." },
      { _key: "st4", title: "Shopper Convenience", text: "Integrated plastic bag dispenser positioned at the natural reach point — a small detail that removes friction at the moment of purchase and reduces loose bags accumulating on the fixture." },
    ],
    solutionImage: bb_hero,
    solutionCaption: "Banana Barge installed at Coles Brighton · Modular oval form with stepped ABS display surface",
    outcomes: "The Banana Barge was deployed nationally across 500+ Coles supermarkets following the successful Coles Brighton pilot. Still in use 10+ years after initial rollout — a strong indicator of durability, operational fit, and store team adoption. Directional feedback indicated improved display capacity and reduced damage, though no metrics were published.",
    keyOutcome: "Deployed across 500+ Coles supermarkets nationally and still in use 10+ years later — a fixture that outlasted the brief and became a long-term operational standard.",
    clientCredit: { client: "Coles Supermarkets", via: "iCreate Retail Solutions Pty. Ltd." },
    rolloutScope: "500+ stores nationally · Australia-wide",
    reflection: "This project reinforced how small geometry and material choices directly influence product preservation and store workflows — details that are invisible to shoppers but critical to the people using the fixture every day. The 6-month pilot was the most valuable part of the process: it surfaced edge cases that no amount of CAD modelling could predict, and gave the design real-world validation before the cost of national production was committed. It also strengthened my end-to-end confidence across CAD, prototyping, pilot, and offshore manufacture — a path I've applied to every physical project since.",
  });
  console.log("  ✓  CS-01 created");

  // ─────────────────────────────────────────────────────────────
  // CS-02: IKEA — Make Room for Life
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-02: IKEA — Make Room for Life ──");
  const dir02 = "project-ikea-make-room-for-life";
  const [ik_hero, ik_process, ik_fp, ik_vm, ik_l1, ik_l2, ik_l3, ik_concept] =
    await seq([
      () => uploadImage(client, dir02, "hero.jpg"),
      () => uploadImage(client, dir02, "sketchup-elevation.jpg"),
      () => uploadImage(client, dir02, "floor-plan.jpg"),
      () => uploadImage(client, dir02, "vm-communication.jpg"),
      () => uploadImage(client, dir02, "leeds-01.jpg"),
      () => uploadImage(client, dir02, "leeds-02.jpg"),
      () => uploadImage(client, dir02, "leeds-03.jpg"),
      () => uploadImage(client, dir02, "concept-package.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-ikea-make-room-for-life",
    _type: "caseStudy",
    projectName: "IKEA — Make Room for Life",
    slug: { _type: "slug", current: "ikea-make-room-for-life" },
    projectSlug: "IKEA_MAKE_ROOM_FOR_LIFE",
    coordLabel: "CS_002 · Retail Spatial Design · 2018",
    title: "IKEA —<br>Make Room<br>for Life",
    discipline: "Retail Spatial Design",
    meta: [
      { _key: "role", label: "Role", value: "Retail Design Specialist / Deputy Communication & Design Manager" },
      { _key: "timeline", label: "Timeline", value: "FY18–FY19 planning and multi-store rollout" },
      { _key: "team", label: "Team", value: "Com&In (VM/Graphics) · Sales · In-Store Logistics · Contractors" },
      { _key: "tools", label: "Tools", value: "AutoCAD · Revit · SketchUp · CSP guidelines" },
      { _key: "scope", label: "Scope", value: "Living Room compacts · Sofas · Armchairs · Hot spots · Podiums · VM" },
    ],
    tldr: "Full Living Room department rebuild for IKEA UK & Ireland — function-first grouping, hot-spot planning, and coordinated VM to improve range overview, inspiration, and commercial clarity. Role spanned concept development, store-scale layout planning, VM execution guidance, and multi-team coordination across the FY18–FY19 rollout.",
    heroImage: ik_hero,
    order: 2,
    cardCoordLabel: "016 · 03",
    cardDescription: "Full Living Room department rebuild for IKEA UK & Ireland — function-first grouping, hot-spot planning, and coordinated VM.",
    overview: "In 2018 IKEA launched \"Make Room for Life\" across the UK and Ireland — a campaign and department rebuild examining how flexible, well-organised living rooms support the way people actually live at home. The Living Room department needed to present a wide, fast-changing seating offer in a way that was inspiring, easy to navigate, and commercially effective. The design challenge was translating IKEA's global Common Store Planning guidance into store-scale layouts that worked across varied footprints, while reinforcing low-price perception, surfacing top families, and supporting add-on sales throughout the customer journey.",
    problem: "The Living Room area needed to present a wide, fast-changing sofa and armchair range in a way that was inspiring, easy to navigate, and commercially effective — across stores with different footprints and evolving seasonal ranges. Customers struggled to get an immediate overview of what was available, price comparisons were unclear, and add-on sales opportunities were being missed. The brief required a flexible compact that could accommodate future range shifts, reinforce low-price perception at entry, and make the full seating offer readable in a single visit.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "No clear range overview — customers couldn't quickly distinguish function (sleep/no-sleep), style, or price tier without significant browsing effort.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Price/quality ladders were invisible — lowest-price options weren't surfaced at entry, and high-end ranges lacked the storytelling context needed to justify the price.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Add-on sales and coordinated solutions were disconnected from the seating offer — cushions, throws, and lighting weren't driving complete-room purchases.", highlight: true },
    ],
    research: "Research was aligned to IKEA's Common Store Planning (CSP) guidance for FY18–FY19 — a global framework developed from shopper behaviour studies and commercial performance analysis. Primary grouping logic was established by studying how customers shop by function first (does it convert to a bed?), then style, then family. Hot-spot strategy at aisle prolongations was validated against top-family commercial performance data, and competitor spatial analysis informed display technique decisions.",
    researchCaption: "CSP guidance extract · Function → style → family grouping logic and hot-spot locations",
    processIntro: "The process moved from global CSP guidance interpretation through macro planning, VM and communication integration, and inspiration/add-on sales design — translating brand-level strategy into store-scale decisions that worked across varied UK and Ireland footprints. Each phase required balancing global standards with local store constraints.",
    processSteps: [
      { _key: "ps1", title: "Macro Planning", text: "Defined the Sofa compact (~521m²) and Armchair compact (~83m²) with low walls for clear sight lines and single flooring for flexibility. Identified hot-spot positions at aisle prolongations to carry top families — KIVIK, VIMLE, STRANDMON — and key commercial messages." },
      { _key: "ps2", title: "VM & Communication Integration", text: "Established display racking for width-and-depth impressions, fronta/repetition for clarity, and A4 overview signs for families with many shape and fabric options. Managed price/quality ladders so customers could compare lowest, mid, and high-price options side by side." },
      { _key: "ps3", title: "Inspiration & Add-On Sales", text: "Positioned activity podiums and perimeter breaks to punctuate the compact, support seasonality, and reinforce Democratic Design. Coordinated cushions, throws, and lighting with seating to encourage complete-room solutions." },
      { _key: "ps4", title: "Store Rollout Package", text: "Developed a complete concept package — CAD plans, SketchUp elevations, VM playbooks, and finish/furniture specifications — sent to all UK & Ireland stores for local adaptation. Each store was entitled to adapt the general concept plan to their own layout." },
    ],
    processImage: ik_process,
    processCaption: "SketchUp concept elevation · Customer walkthrough of the Living Room department entry",
    imgGrid2: [
      { _key: "g2a", image: ik_fp, alt: "Combined compact floor plan", caption: "Combined compact floor plan · Sofa + Armchair zones, hot spots, and aisle prolongations" },
      { _key: "g2b", image: ik_vm, alt: "VM and communication", caption: "VM & communication · A4 overview signs, price ladders, and fabric sample stations" },
    ],
    imgGrid3: [
      { _key: "g3a", image: ik_l1, alt: "IKEA Leeds implementation 1", caption: "IKEA Leeds · Make Room for Life implementation" },
      { _key: "g3b", image: ik_l2, alt: "IKEA Leeds implementation 2", caption: "IKEA Leeds · Armchair compact and Democratic Design hot spot" },
      { _key: "g3c", image: ik_l3, alt: "IKEA Leeds implementation 3", caption: "IKEA Leeds · Coordinated sofa solution with add-on styling" },
    ],
    spaceMetrics: [
      { _key: "sm1", area: "521", unit: "m²", label: "Sofa Compact" },
      { _key: "sm2", area: "83", unit: "m²", label: "Armchair Compact" },
      { _key: "sm3", area: "20+", unit: "stores", label: "UK & Ireland Rollout" },
    ],
    solutionIntro: "A function-first Living Room department built around clear grouping logic, hot-spot strategy, and price/quality ladders — delivered as a complete concept package that each UK and Ireland store could adapt to their own footprint. The solution prioritised range overview and commercial clarity above everything else.",
    solutionTiles: [
      { _key: "st1", title: "Grouping & Navigation", text: "Sofas grouped by function first (no-sleep → sleep), then style, then family. Armchairs grouped by style → family and positioned centrally to keep the full seating offer together and coordination with sofas natural." },
      { _key: "st2", title: "First Impressions & Hot Spots", text: "Low-price perception surfaced at entry with accessible price signs on top families. Direct sight lines from aisle prolongations to coordinated solutions — VIMLE, FRIHETEN — ensured strong first impressions before customers entered the compact." },
      { _key: "st3", title: "Price & Quality Ladders", text: "Lowest, mid, and high-price tiers placed side by side for easy comparison. Lowest-price families (KNOPPARP, HAMMARN) clearly flagged; high-end ranges (STOCKHOLM 2017) framed with story and collection context to justify the price." },
      { _key: "st4", title: "Add-On Sales & Coordination", text: "Cushions, throws, and lighting positioned with seating throughout the compact. Curated collage setups for \"Living with children\" and \"Small space living\" supported add-on sales and gave customers permission to imagine the full room." },
    ],
    solutionImage: ik_concept,
    solutionCaption: "Concept package · SketchUp isometric showing full Living Room department layout",
    designPrinciples: [
      { _key: "dp1", title: "Function-First Grouping", text: "Primary grouping by function (sleep/no-sleep) before style or family — aligned to how customers actually shop. This single decision made the range dramatically easier to read and navigate." },
      { _key: "dp2", title: "Hot-Spot Planning", text: "Top families and key messages positioned at aisle prolongations — the highest-dwell, highest-visibility positions in the compact. Hot spots carried commercial priority, not just visual interest." },
      { _key: "dp3", title: "Price/Quality Ladder", text: "Lowest, mid, and high-price tiers made visible and comparable. Low-price framed with accessibility; high-price framed with story and context. Customers needed to feel confident at every tier." },
      { _key: "dp4", title: "Width & Depth Display", text: "Racking and fronta/repetition techniques created impact without clutter. Calm palette as the base, stronger colours used selectively to attract attention — not as a default." },
      { _key: "dp5", title: "Add-On Integration", text: "Accessories positioned with seating throughout — not in a separate section. Podiums and perimeter breaks used to punctuate the compact with seasonal stories and complete-room inspiration." },
    ],
    outcomes: "The department rebuild delivered a clearer range overview and a more inspiring journey through the seating offer — with visible price ladders, top-family prioritisation, and stronger add-on sales storytelling. The flexible compact design accommodated future range shifts and local market needs without structural changes. Outcomes are directional — no commercially sensitive metrics are published.",
    keyOutcome: "A function-first Living Room compact rolled out across IKEA UK & Ireland — delivering clearer range overview, stronger first impressions, and a flexible structure that adapts to evolving ranges and local store footprints without redesign.",
    clientCredit: { client: "IKEA Systems BV", via: "IKEA UK & Ireland — Retail Design / Com&In" },
    rolloutScope: "Multi-store · UK & Ireland · FY18–FY19",
    reflection: "Balancing global brand guidance with local store constraints was the central challenge — and the most valuable lesson. The strongest levers were function-first grouping, hot-spot planning, and clear price/quality ladders: they make a wide, complex range readable without simplifying it. It also reinforced how small, consistent VM decisions — repetition, fronta, fabric sampling positioned at the right moment — help customers compare faster and feel more confident. If I were to revisit it, I'd invest more in measuring the commercial impact of specific hot-spot placements to build a stronger evidence base for future compact decisions.",
  });
  console.log("  ✓  CS-02 created");

  // ─────────────────────────────────────────────────────────────
  // CS-03: Through the Woods
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-03: Through the Woods ──");
  const dir03 = "project-through-the-woods";
  const [tw_hero, tw_research, tw_process, tw_costume, tw_plush, tw_solution, tw_costumes, tw_plush_decor, tw_char, tw_wooden] =
    await seq([
      () => uploadImage(client, dir03, "hero.jpg"),
      () => uploadImage(client, dir03, "trend-moodboard.jpg"),
      () => uploadImage(client, dir03, "materials-board.jpg"),
      () => uploadImage(client, dir03, "costume-detail.jpg"),
      () => uploadImage(client, dir03, "plush-detail.jpg"),
      () => uploadImage(client, dir03, "range-overview.jpg"),
      () => uploadImage(client, dir03, "category-costumes.jpg"),
      () => uploadImage(client, dir03, "category-plush-decor.jpg"),
      () => uploadImage(client, dir03, "category-character-plush.jpg"),
      () => uploadImage(client, dir03, "category-wooden-play.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-through-the-woods",
    _type: "caseStudy",
    projectName: "Through the Woods",
    slug: { _type: "slug", current: "through-the-woods" },
    projectSlug: "THROUGH_THE_WOODS",
    coordLabel: "CS_003 · Industrial Design · 2022",
    title: "Through<br>the Woods",
    discipline: "Industrial Design",
    meta: [
      { _key: "role", label: "Role", value: "Toy Design, Product Development, Material Sourcing" },
      { _key: "timeline", label: "Timeline", value: "Seasonal A/W Collection — Trend → Materials → Range → Construction" },
      { _key: "team", label: "Team", value: "Solo design & product development · Manufacturing liaison" },
      { _key: "tools", label: "Tools", value: "Pattern drafting · Soft-goods construction · Materials sourcing · Wooden prototyping" },
      { _key: "scope", label: "Scope", value: "Costumes · Oversized Plush Décor · Character Plush · Wooden Activity Sets" },
    ],
    tldr: "Nature-inspired, screen-free toy range for Autumn/Winter — costumes, oversized plush décor, character plush, and wooden activity sets. Designed around sustainable materials (rPET, organic cotton, hemp-based faux fur, FSC pine) and child-safe construction throughout. Up to ~80% sustainable material content across SKUs.",
    heroImage: tw_hero,
    order: 3,
    cardCoordLabel: "017 · 04",
    cardDescription: "Nature-inspired A/W toy range — costumes, plush, and wooden play built from sustainable materials throughout.",
    overview: "Through the Woods is a seasonal A/W toy range designed to reconnect children with nature and create a screen-free play world. Products represent the flora and fauna of the forest — costumes, oversized plush décor, character plush, and wooden activity sets — each supporting tactile learning and imaginative play. The design challenge was building a cohesive, commercially viable range that prioritised sustainable materials and child-safe construction without compromising on quality, tactile appeal, or the imaginative story that connects every SKU.",
    problem: "Design an Autumn/Winter toy collection that reflects current children's trends, uses eco-friendly materials and ethical production, delivers tactile learning and imaginative play, and meets child safety standards across four distinct product categories — costumes, décor, collectible plush, and wooden play. The range needed to work as individual entry points for buyers and families, while telling a single cohesive nature story across all SKUs.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Sustainability requirements ruled out conventional materials — every SKU needed eco-friendly alternatives that still met child-safe construction and tactile quality standards.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Four distinct product categories — soft goods, plush, wooden — each with different construction methods, safety requirements, and manufacturing processes to coordinate.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Range cohesion across very different product types — costumes, décor, character plush, and wooden play all needed to tell one unified forest story to work as a coordinated collection.", highlight: true },
    ],
    research: "Research focused on current A/W children's product trends to identify the pillars shaping the category — natural finishes and materials, organic forms, feature pieces that create a play environment, muted colour palettes, conscious (eco-friendly, socially aware, inclusive) products, and elevated fashion and quality. Material research benchmarked sustainable alternatives across all construction methods: rPET felts, BCI organic cottons, EcoPel hemp-based faux fur, FSC-certified pine, and natural non-toxic pigments and sealants.",
    researchImage: tw_research,
    researchCaption: "Trend direction · Natural finishes, organic forms, muted palette, conscious product values",
    processIntro: "The process moved from trend research and material benchmarking through pattern and construction testing, to range cohesion — with child safety and sustainable material content as non-negotiable constraints throughout. Each category had its own construction logic, but all four were designed to share a single flora and fauna story.",
    processSteps: [
      { _key: "ps1", title: "Materials Exploration", text: "Prioritised sustainable content across all SKUs — rPET felts, BCI organic cottons, EcoPel hemp-based faux fur, FSC-sourced pine, and 100% natural non-toxic pigments and sealants. Each material was assessed for child safety, tactile quality, durability, and manufacturing feasibility." },
      { _key: "ps2", title: "Pattern & Construction Testing", text: "Upholstery-style builds for oversized plush — dense foam core with organic cotton padding — for durability in daily use. Child-safe stitch choices (nylon upholsterers thread), reinforced seams, embroidered facial features to eliminate loose small parts, and non-skid bases on all floor pieces." },
      { _key: "ps3", title: "Range Cohesion", text: "A shared flora and fauna story threads through all four categories — costumes → décor → character plush → wooden play — so each SKU supports open-ended imaginative play and can be combined into a coordinated play world. Brand system established across tags, packaging, and labels." },
      { _key: "ps4", title: "Safety & Compliance", text: "All product decisions driven by child-safe construction principles — embroidered facial features on all plush (no loose glued components), sealed edges and reinforced seams, non-toxic pigments and sealants, FSC-certified timber, and EcoPel hemp-based faux fur as an ethical alternative to conventional synthetic fur." },
    ],
    processImage: tw_process,
    processCaption: "Sustainable material stack · rPET felt, EcoPel hemp faux fur, BCI organic cotton, FSC pine",
    imgGrid2: [
      { _key: "g2a", image: tw_costume, alt: "Costume detail", caption: "Costumes · Tree Top Owl + Woodland Red Fox · rPET felt and EcoPel hemp faux fur" },
      { _key: "g2b", image: tw_plush, alt: "Oversized plush detail", caption: "Oversized Plush · Giant Mushroom + Giant Leaf · upholstery-style construction" },
    ],
    solutionIntro: "A four-category A/W toy range — costumes, oversized plush décor, character plush, and wooden activity sets — unified by a nature story and built from sustainable materials throughout. Every construction decision was made with child safety, tactile quality, and long-term durability as the primary constraints.",
    solutionTiles: [
      { _key: "st1", title: "Costumes", text: "Tree Top Owl and Woodland Red Fox — masks, capes, cowls, and spats in rPET recycled polyester and EcoPel hemp faux fur. Unisex sizing 2–6, Velcro and elastic closures, natural pigment dyes throughout." },
      { _key: "st2", title: "Oversized Plush Décor", text: "Giant Mushroom (H500 × W400mm) and Giant Leaf Cushion (L700 × W450mm) — upholstery-style builds with recycled composite chip foam cores, BCI organic cotton fill, and rPET non-skid bases. Built for daily use." },
      { _key: "st3", title: "Character Plush", text: "Freya Fox, Daisy the Pixie, and Lily Rabbit — EcoPel hemp-based cotton outers, BCI organic cotton fill, embroidered facial features, rPET satin accessories. Approximately H250–315mm, designed as collectible characters." },
      { _key: "st4", title: "Wooden Play", text: "Activity Treehouse (FSC pine, flat-pack, abacus/ABC/ZigZag/clock activities) and Memory Tile Game (FSC Victorian Ash, dual-use memory match and jigsaw, sliding pine box). All finished with non-toxic matt sealant and natural pigments." },
    ],
    solutionImage: tw_solution,
    solutionCaption: "Through the Woods range · Costumes, Oversized Plush, Character Plush, Wooden Play",
    materials: [
      { _key: "m1", name: "rPET Felt", spec: "100% recycled polyethylene terephthalate · felted polyester sheet", use: "Costume masks · Plush outers · Non-skid bases", swatch: "#D8D4CC" },
      { _key: "m2", name: "EcoPel Hemp Faux Fur", spec: "Hemp-based faux fur · ethical synthetic alternative", use: "Costume cowls & spats · Character plush outers", swatch: "#C4B49A" },
      { _key: "m3", name: "BCI Organic Cotton", spec: "Better Cotton Initiative certified · organic grade", use: "Plush fill · Lining · Character apparel", swatch: "#F0EDE8" },
      { _key: "m4", name: "FSC Pine", spec: "FSC-certified pine/plywood · non-toxic matt sealant", use: "Activity Treehouse · Memory Tile Game", swatch: "#C8A97A" },
    ],
    productRange: [
      { _key: "pr1", name: "Costumes", detail: "Tree Top Owl + Woodland Red Fox · Unisex 2–6 · rPET + EcoPel hemp faux fur", image: tw_costumes },
      { _key: "pr2", name: "Oversized Plush", detail: "Giant Mushroom + Giant Leaf Cushion · upholstery-style · rPET + organic cotton", image: tw_plush_decor },
      { _key: "pr3", name: "Character Plush", detail: "Freya Fox · Daisy the Pixie · Lily Rabbit · EcoPel hemp cotton + embroidered features", image: tw_char },
      { _key: "pr4", name: "Wooden Play", detail: "Activity Treehouse + Memory Tile Game · FSC pine · non-toxic pigments", image: tw_wooden },
    ],
    outcomes: "A cohesive, nature-inspired play world with up to ~80% sustainable material content across SKUs. The range supports screen-free, tactile play and offers multiple entry points for buyers and families — costume, décor, collectible character, or educational wooden toy — each part of the same coordinated forest story.",
    keyOutcome: "A four-category A/W toy range unified by a single nature story — with sustainable materials at the core of every construction decision and child safety built in from the start, not retrofitted.",
    reflection: "This range reinforced why material choice and construction detail matter for children's products — durability, safety, and tactile feel are as important as the look. The key balance was imagination plus practicality: eco-minded materials, responsible construction, and a cohesive story that works across multiple toy categories and scales with a family's collection over time. If I were to revisit it, I'd push further on material innovation — particularly exploring bio-based alternatives to the remaining synthetic content — and invest more in packaging design to extend the sustainable story to the retail shelf.",
  });
  console.log("  ✓  CS-03 created");

  // ─────────────────────────────────────────────────────────────
  // CS-04: La Bohemia
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-04: La Bohemia ──");
  const dir04 = "project-la-bohemia";
  const [lb_hero, lb_research, lb_process, lb_ds, lb_mood, lb_solution] =
    await seq([
      () => uploadImage(client, dir04, "hero.jpg"),
      () => uploadImage(client, dir04, "competitor-analysis.jpg"),
      () => uploadImage(client, dir04, "wireframes.png"),
      () => uploadImage(client, dir04, "design-system.jpg"),
      () => uploadImage(client, dir04, "moodboard.jpg"),
      () => uploadImage(client, dir04, "solution-screens.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-la-bohemia",
    _type: "caseStudy",
    projectName: "La Bohemia",
    slug: { _type: "slug", current: "la-bohemia" },
    projectSlug: "LA_BOHEMIA",
    coordLabel: "CS_004 · Web Design · 2021",
    title: "La<br>Bohemia",
    discipline: "Web Design",
    meta: [
      { _key: "role", label: "Role", value: "Web Design, UX/UI, IA, Wireframing, WIX Build" },
      { _key: "timeline", label: "Timeline", value: "Concept → Wireframes → WIX Configuration" },
      { _key: "team", label: "Team", value: "Solo design & build · Owner-operators as stakeholders" },
      { _key: "tools", label: "Tools", value: "WIX · rankingCoach · Ascend · Figma" },
      { _key: "scope", label: "Scope", value: "Home · Menus · Reservations · Order Online · Gallery · Contact" },
    ],
    tldr: "Website for an authentic Chilean café & bar to move beyond a social-only presence. Task-first IA with WIX plugins for online orders, reservations, and menus — built for owner autonomy and local SEO from day one.",
    heroImage: lb_hero,
    order: 4,
    cardCoordLabel: "018 · 05",
    cardDescription: "Task-first WIX site for a Chilean café & bar — orders, reservations, and menus live from day one.",
    overview: "La Bohemia is an authentic Chilean café & bar in Melbourne's south-east — a family business built on culture, quality, and community, hosting events and live Latin music weekly. Starting as a sandwich shop and evolving into a full restaurant and bar over a decade, their reputation was strong but their digital presence was limited entirely to social media. The challenge was designing and building a website that improves the pre-visit experience, surfaces the three core tasks customers need — see menus, book a table, order online — and gives the owners full autonomy to update it themselves.",
    problem: "La Bohemia had no website — only social media. Potential customers had no reliable way to see menus, make reservations, or place online orders without calling or messaging directly. The owners — a mother and son duo managing a busy venue — needed a solution they could maintain independently, without technical resource. The brief: build a simple, task-first site that closes the gap between social discovery and on-site action.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "No owned web presence — menus, bookings, and orders all depended on social media DMs or phone calls.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Competitor analysis showed all three local benchmarks lacked cohesive branding and clear task access — a clear opportunity to differentiate.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Owners needed full autonomy to update menus, promotions, and events — a custom build was not viable.", highlight: true },
    ],
    research: "Competitor analysis benchmarked three local restaurants selected on cuisine specialisation, location proximity, and online presence: Citrico Cocina (Latin American, inner-city), Pyramids Restaurant & Café (African, same suburb), and Maple Leaf Malaysian Restaurant (same suburb, 30+ year local). WIX was assessed against Weebly and Squarespace across ease of use, design/customisation, plugins, e-commerce, SEO, support, and pricing — selected for its plugin ecosystem and owner-friendly maintenance.",
    researchImage: lb_research,
    researchCaption: "Competitor analysis · Three restaurants benchmarked on structure, booking clarity, and branding",
    processIntro: "The process moved from competitor analysis through IA definition, wireframing, design system development, and WIX configuration — with owner autonomy as the primary constraint shaping every decision. Platform selection happened early and deliberately, before a single wireframe was drawn.",
    processSteps: [
      { _key: "ps1", title: "Task-First IA", text: "Defined the site structure around three primary tasks: Order, Book, Menus. Navigation set as Home, Menus, Reservations, Order Online, Gallery/Social, Contact — with all three CTAs surfaced above the fold on the homepage." },
      { _key: "ps2", title: "Wireframes", text: "Built wireframes for Home, Menus, and Reservations — proving the above-the-fold CTA logic, nav ribbon consistency, and the relative weight of content vs. action across each page." },
      { _key: "ps3", title: "Design System", text: "Established typography (Avenir LT Std + Courier), a warm Chilean-inspired palette (amber, teal, sage, charcoal), and a moodboard drawing from Chilean street culture, food photography, and local community — warm and cultural, not corporate." },
      { _key: "ps4", title: "WIX Configuration", text: "Configured WIX Orders, Menus, Reservations, and Social Bar (Instagram/Facebook/Zomato). Set up rankingCoach for local SEO hygiene and Ascend/Mailchimp for EDM. Defined owner handover documentation for independent updates." },
    ],
    processImage: lb_process,
    processCaption: "Lo-fi wireframes · Home, Menus, Reservations",
    imgGrid2: [
      { _key: "g2a", image: lb_ds, alt: "Design system", caption: "Design system · Avenir + Courier · warm Chilean palette" },
      { _key: "g2b", image: lb_mood, alt: "Moodboard", caption: "Moodboard · Chilean street culture, food photography, community" },
    ],
    solutionIntro: "A WIX site built around three primary tasks surfaced on every page — Order, Book, Menus — with a warm, culturally-grounded design system and a plugin stack the owners can manage independently. Every decision prioritised clarity and owner autonomy over complexity.",
    solutionTiles: [
      { _key: "st1", title: "Orders & Menus", text: "WIX Orders handles pickup/delivery with multiple payment options (credit/debit, GPay, PayPal, Stripe). WIX Menus supports time-based and specialty menus, dietary icons, and item customisation." },
      { _key: "st2", title: "Reservations", text: "WIX Reservations provides self-serve table bookings around the clock, removing phone dependency for both customers and owners." },
      { _key: "st3", title: "Social & SEO", text: "Restaurant Social Bar integrates Instagram, Facebook, and Zomato directly. rankingCoach handles local SEO hygiene — Google My Business, keyword metadata, internal/external linking, and competitor checks." },
      { _key: "st4", title: "Owner Autonomy", text: "Full handover documentation and training so owners can update menus, post promotions, and manage bookings independently. EDM via Ascend/Mailchimp for events and targeted campaigns." },
    ],
    solutionImage: lb_solution,
    solutionCaption: "Final WIX build · Home, Menus, Reservations, Order Online",
    techStack: [
      { _key: "ts1", value: "WIX", primary: true },
      { _key: "ts2", value: "WIX Orders", primary: true },
      { _key: "ts3", value: "WIX Menus", primary: false },
      { _key: "ts4", value: "WIX Reservations", primary: false },
      { _key: "ts5", value: "rankingCoach", primary: false },
      { _key: "ts6", value: "Ascend / Mailchimp", primary: false },
    ],
    outcomes: "A task-first website that connects the dots between social discovery and on-site action — menus visible, bookings self-serve, orders online. Owners can update menus and promotions independently, with a baseline in place for local SEO and EDM-driven campaigns.",
    keyOutcome: "La Bohemia moved from social-only to a fully functional owned web presence — with orders, reservations, and menus all live and owner-managed from day one.",
    clientCredit: { client: "La Bohemia Café & Bar", via: "Solo commission" },
    reflection: "This was a pragmatic build: prioritise tasks, choose tools the owners can maintain, and keep the design warm but uncluttered. The WIX stack provided the right balance of capability and simplicity for a small family business with no in-house technical resource. The key design decision was keeping three primary actions above the fold on every page — making the site work for customers who know exactly what they want before they arrive. If I were to revisit it, I'd invest more time in photography art direction — food imagery was the biggest variable in perceived quality across all three competitors.",
  });
  console.log("  ✓  CS-04 created");

  // ─────────────────────────────────────────────────────────────
  // CS-05: MediPal
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-05: MediPal ──");
  const dir05 = "project-medipal";
  const [mp_hero, mp_research, mp_jason, mp_paulette, mp_process, mp_flow_book, mp_flow_login, mp_solution] =
    await seq([
      () => uploadImage(client, dir05, "hero.jpg"),
      () => uploadImage(client, dir05, "journey-map.jpg"),
      () => uploadImage(client, dir05, "persona-jason.jpg"),
      () => uploadImage(client, dir05, "persona-paulette.jpg"),
      () => uploadImage(client, dir05, "wireframes-annotated.jpg"),
      () => uploadImage(client, dir05, "user-flow-book.jpg"),
      () => uploadImage(client, dir05, "user-flow-login.jpg"),
      () => uploadImage(client, dir05, "hifi-screens.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-medipal",
    _type: "caseStudy",
    projectName: "MediPal",
    slug: { _type: "slug", current: "medipal" },
    projectSlug: "MEDIPAL",
    coordLabel: "CS_005 · UX/UI · 2021",
    title: "Medi<br>Pal",
    discipline: "UX/UI Design",
    meta: [
      { _key: "role", label: "Role", value: "UX Research, IA, User Flows, Wireframing, Prototype, Usability Testing" },
      { _key: "timeline", label: "Timeline", value: "Research → IA → User Flows → Wireframes → Prototype → Testing" },
      { _key: "team", label: "Team", value: "Solo UX · 7 research participants · 40 survey respondents · 4 usability testers" },
      { _key: "tools", label: "Tools", value: "Axure · Miro · SurveyMonkey" },
      { _key: "scope", label: "Scope", value: "Login · Dashboard · Search · Book Appointment · Treatments · Live Tracking" },
    ],
    tldr: "MediPal is a healthcare app concept designed to centralise appointment booking, real-time tracking, and treatment management across multiple practitioners. Research-led IA, user flows, and an Axure prototype were validated through usability testing with 4 participants — averaging 8 minutes 17 seconds task completion with strong satisfaction scores.",
    heroImage: mp_hero,
    order: 5,
    cardCoordLabel: "019 · 06",
    cardDescription: "Healthcare app concept — appointment booking, real-time tracking, and treatment management validated through usability testing.",
    overview: "MediPal is a web and mobile app concept that lets users book appointments across multiple healthcare providers, track appointments in real time, check in contactlessly, and centralise their prescriptions and treatment records in one place. The project was designed for two distinct user types: busy active professionals managing multiple practitioners, and older users with ongoing health conditions managing frequent appointments manually. The design challenge was building a single, intuitive service that worked for both — reducing wait time friction, eliminating app fragmentation, and making healthcare management feel effortless rather than administrative.",
    statStrip: [
      { _key: "ss1", number: "7", label: "Qualitative Interviews" },
      { _key: "ss2", number: "40", label: "Survey Respondents" },
      { _key: "ss3", number: "8m 17s", label: "Avg. Task Completion" },
    ],
    problem: "Managing healthcare needs across multiple practitioners is fragmented and inefficient. Users juggle separate apps per clinic, sit in waiting rooms with no visibility on delays, manage prescriptions on paper, and manually track appointment times across personal calendars. Research confirmed three dominant pain points — all centred on time, convenience, and information being scattered across too many places.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Appointment wait times — 50% of survey respondents said live updates and tracking would most improve their experience attending appointments.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "App fragmentation — active users had to manage a different booking app for every practitioner, with no unified view of upcoming appointments or treatments.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Treatment tracking — 20% had no tracking system at all; scripts were kept on paper, easily lost or damaged, with no reminders to renew or action medications.", highlight: true },
    ],
    research: "Research combined qualitative interviews (7 participants over 1 week) with a quantitative survey (40 respondents) to understand how people manage their healthcare needs, the considerations they make when choosing and booking practitioners, and how they track treatments and medications. Two distinct user segments emerged — App/Service Users (24–44, high digital confidence, frustrated by fragmentation) and Non-App/Service Users (55–65, lower digital confidence, open to adoption if sufficiently intuitive).",
    researchImage: mp_research,
    researchCaption: "Customer journey map · Awareness → Browse → Book → Attend → Post-appointment",
    personas: [
      { _key: "p1", name: "Jason Daniels", role: "Current App/Service User · Age 34 · Warrandyte", bio: "Charter pilot with a busy lifestyle managing GP, Physio, and Dietician appointments across multiple apps. Frustrated by appointment availability, waiting room time, and having to re-enter personal information for each new clinic. Values pre-fill, live tracking, and minimal physical interactions above all.", image: mp_jason },
      { _key: "p2", name: "Paulette Vlotman", role: "Non-App/Service User · Age 58 · Glen Waverley", bio: "Part-time admin assistant managing ongoing health conditions (diabetes, cardiac) with frequent visits to GP, Cardiologist, Physio, Optometrist, and Dentist. Currently manages all appointments manually via calendar and paper scripts. Open to digital if intuitive — waiting time is her primary frustration.", image: mp_paulette },
    ],
    researchQuote: {
      text: "\"The waiting time. Sometimes we're there for an hour or two, and it gets boring and you tend to get impatient. That's my main Gripe.\"",
      attribution: "Paulette Vlotman · Non-App/Service User Persona",
    },
    processIntro: "The process moved from qualitative and quantitative research through IA definition, user flow mapping, annotated wireframing, Axure prototype build, and moderated usability testing — with testing findings driving the most significant structural refinements. The 8-screen site map and three core user flows (Login/Register, Book Appointment, Track Booking) formed the backbone of the prototype.",
    processSteps: [
      { _key: "ps1", title: "Information Architecture", text: "Defined a 7-level app hierarchy — Splash, Onboarding, Register/Login, Dashboard, Appointments, Treatments, Search, Account — based on research pain points. Entity/attribute breakdown documented every screen, sub-entity, and field across the full app." },
      { _key: "ps2", title: "User Flow Mapping", text: "Three core flows mapped in Miro — Login/Register, Book Appointment (dual pathway: search by location or practitioner name), and Track Booking/Appointment Schedule. Flows validated the IA logic before a single wireframe was drawn." },
      { _key: "ps3", title: "Annotated Wireframes & Prototype", text: "15 annotated wireframe screens built in Axure covering every primary flow — Splash, Onboarding, Dashboard, Search, Clinic/Practitioner profiles, Booking, Appointment info, Live Update, Treatments, and Account. Interaction logic documented per element." },
      { _key: "ps4", title: "Usability Testing (n=4)", text: "Four participants completed scripted tasks averaging 8m 17s — Login/Register, Search by location and practitioner, Book appointment, Exit to OS, and respond to a live update notification. Task 4 (live update/notifications) generated the most errors and required the most facilitator prompting." },
    ],
    processImage: mp_process,
    processCaption: "Annotated wireframes · Axure prototype — Dashboard, Search, Book Appointment, Live Update",
    imgGrid2: [
      { _key: "g2a", image: mp_flow_book, alt: "User flow: Book Appointment", caption: "User flow · Book Appointment — dual pathway by location or practitioner" },
      { _key: "g2b", image: mp_flow_login, alt: "User flow: Login/Register", caption: "User flow · Login/Register and Track Booking/Appointment Schedule" },
    ],
    solutionIntro: "MediPal brings appointment booking, real-time tracking, contactless check-in, and treatment management into a single intuitive app — designed around the mental models of both high-frequency digital users and lower-confidence adopters. The core IA decision was a tab-based navigation (Home, Appointments, Treatments, Account) that mirrors familiar e-commerce app patterns, reducing the learning curve for new users.",
    solutionTiles: [
      { _key: "st1", title: "Search & Book", text: "Search by provider/clinic name, speciality, or suburb/postcode. Filter by date, time, and availability. Dual booking pathway — existing or new patient — with pre-filled personal information reducing form friction at every clinic." },
      { _key: "st2", title: "Real-Time Tracking", text: "Live departure prompts adjust in real time based on the practitioner's running schedule. Users are notified if their appointment is running late and given an updated departure time — minimising waiting room time." },
      { _key: "st3", title: "Contactless Check-In", text: "NFC-based check-in notifies the clinic of arrival with minimal physical interactions. Video and phone consultation options available when no convenient in-person time is available." },
      { _key: "st4", title: "Treatment & Script Wallet", text: "Current and historical scripts and treatments stored digitally, accessible at any time. Treatment reminders, medication frequency tracking, and online renewal/repurchase — all in one place." },
    ],
    solutionImage: mp_solution,
    solutionCaption: "High-fidelity screens · Splash, Dashboard, Search, Appointment Info, Live Update",
    outcomes: "Usability testing confirmed the app had a familiar, functional format — all participants completed tasks in an average of 8m 17s and expressed strong overall satisfaction. The notification/live update flow was identified as the primary area for improvement — 50% of participants required prompting to access notifications, and no participant intuitively accessed the appointment info tab after reviewing their departure time update. All four participants said they would use MediPal again.",
    keyOutcome: "A fully tested Axure prototype across 15 screens and 3 core flows — with 100% task completion on Login, Search, and Booking, and clear, actionable findings on notification UX to drive the next iteration.",
    youtubeEmbed: "https://youtu.be/PYPX9-h2064?si=baZOZvTmRYZqXoUn",
    reflection: "The research surfaced a meaningful split between user segments — active digital users frustrated by fragmentation, and older users who were open to digital but needed an exceptionally intuitive interface. This tension shaped every IA decision toward simplicity and step-by-step flows over feature density. The usability test was most valuable in exposing the notification/live update flow as counterintuitive — users focused entirely on the departure time and ignored the appointment info tab, suggesting the two pieces of information need to be surfaced together on a single screen rather than requiring navigation. If I were to run another sprint, I'd conduct a card sorting study to harden the IA hierarchy, and redesign the live update screen to surface both departure time and appointment detail in a single view.",
  });
  console.log("  ✓  CS-05 created");

  // ─────────────────────────────────────────────────────────────
  // CS-06: Acre Organics
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-06: Acre Organics ──");
  const dir06 = "project-acre-organics";
  const [ao_hero, ao_research, ao_joshua, ao_rachel, ao_process, ao_affinity, ao_journey] =
    await seq([
      () => uploadImage(client, dir06, "hero.jpg"),
      () => uploadImage(client, dir06, "research-postit.jpg"),
      () => uploadImage(client, dir06, "persona-joshua.jpg"),
      () => uploadImage(client, dir06, "persona-rachel.jpg"),
      () => uploadImage(client, dir06, "wireframes.png"),
      () => uploadImage(client, dir06, "affinity-map.png"),
      () => uploadImage(client, dir06, "customer-journey.png"),
    ]);
  // solution-screens.png not yet available (needs Figma export)

  await client.createOrReplace({
    _id: "case-study-acre-organics",
    _type: "caseStudy",
    projectName: "Acre Organics",
    slug: { _type: "slug", current: "acre-organics" },
    projectSlug: "ACRE_ORGANICS",
    coordLabel: "CS_006 · UX/UI · 2020",
    title: "Acre<br>Organics",
    discipline: "UX/UI Design",
    meta: [
      { _key: "role", label: "Role", value: "UX Research, IA, Wireframing, Usability Testing" },
      { _key: "timeline", label: "Timeline", value: "Research → IA → Wireframes → Testing → Iteration" },
      { _key: "team", label: "Team", value: "Solo UX · 5 research participants · 5 usability participants" },
      { _key: "tools", label: "Tools", value: "Figma · Miro" },
      { _key: "scope", label: "Scope", value: "Home · Category Landing · PLP · PDP · Recipes · Returns" },
    ],
    tldr: "Online grocery experience focused on quality, Australian-grown produce, and reusable packaging. Research-led IA and wireframes; usability testing drove clearer navigation and reduced reliance on predictive search.",
    heroImage: ao_hero,
    order: 6,
    cardCoordLabel: "020 · 07",
    cardDescription: "Online grocery experience focused on quality produce, reusable packaging, and store-like navigation.",
    overview: "Acre Organics is an online grocery experience built around a simple idea: Australian-grown produce, delivered to your door in eco-friendly, reusable packaging. The challenge was designing a site that felt like a well-laid-out store online — one that makes quality and provenance visible while keeping the shopping journey fast and intuitive.",
    statStrip: [
      { _key: "ss1", number: "5", label: "Research Interviews" },
      { _key: "ss2", number: "5", label: "Usability Participants" },
      { _key: "ss3", number: "8m 53s", label: "Avg. Task Completion" },
    ],
    problem: "Shoppers want fresh, local produce and less packaging waste — but they also expect quick, intuitive journeys online. Existing grocery services were failing on quality transparency, sustainable packaging, and navigation clarity. The brief: design a grocery site that feels like a well-laid-out store, clarifies provenance, reduces packaging impact, and keeps journeys fast.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Poor quality transparency — shoppers couldn't verify freshness or provenance before purchasing.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Excessive, non-recyclable packaging with no return or reuse pathway offered.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Navigation wasn't store-like — category hierarchy was confusing, forcing heavy reliance on search.", highlight: true },
    ],
    research: "Five qualitative interviews were conducted over two weeks exploring how food plays a role in participants' daily lives and the considerations they make when purchasing groceries physically and online. Two distinct user types emerged from the research, both placing high value on quality, Australian-grown products, and packaging accountability.",
    researchImage: ao_research,
    researchCaption: "Research synthesis · Affinity mapping in Miro",
    personas: [
      { _key: "p1", name: "Joshua Chen", role: "The Home Cook · Age 38 · Seddon", bio: "Values quality, provenance, and Australian-grown products above all. Willing to pay a premium and drive across the city for the right ingredients. Concerned about excess packaging but hasn't purchased groceries online due to quality concerns.", image: ao_joshua },
      { _key: "p2", name: "Rachel Fletcher", role: "App/Service User · Age 26 · Glen Waverley", bio: "Currently uses meal kit services for convenience. Frustrated by bulky non-recyclable packaging, unavailable ingredients, and the lack of dietary substitutions. Actively tries to reduce her environmental footprint.", image: ao_rachel },
    ],
    researchQuote: {
      text: "\"The cardboard box, the plastic packaging, the ice packs — every time I order, that stuff just goes straight in the bin. If they had a return service where they picked all that stuff up and dropped off the next one, I'd be happy.\"",
      attribution: "Rachel Fletcher · App/Service User Persona",
    },
    processIntro: "The process moved from research insights through information architecture, to lo-fi wireframes, usability testing, and a final iteration cycle — keeping store-like mental models central throughout. Each phase built directly on the last, with testing findings driving the most significant structural changes.",
    processSteps: [
      { _key: "ps1", title: "Information Architecture", text: "Designed a store-like IA with clear category entry points, a recipes hub, and dedicated trust and returns content. Card sorting with participants validated taxonomy groupings and confirmed that supermarket-style department labels outperformed abstract category names." },
      { _key: "ps2", title: "Lo-Fi Wireframes", text: "Built wireframes for Home, PLP, PDP, and Recipes — proving flow, establishing copy priorities, and surfacing sustainability cues at key decision points in the journey." },
      { _key: "ps3", title: "Usability Testing (n=5)", text: "Five participants completed scripted tasks across five sessions, averaging 8m 53s. Navigation friction emerged clearly: 100% of users defaulted to predictive search over flyout menus, and 75% found flyout hierarchy confusing." },
      { _key: "ps4", title: "Iteration", text: "Simplified flyout labels, added category landing pages with visual cues, and introduced 'Shop Again' and recently-viewed patterns to reduce search dependency for returning users." },
    ],
    processImage: ao_process,
    processCaption: "Lo-fi wireframes · Home, PDP, Recipes pages",
    imgGrid2: [
      { _key: "g2a", image: ao_affinity, alt: "Affinity map", caption: "Affinity map · Research synthesis" },
      { _key: "g2b", image: ao_journey, alt: "Customer journey map", caption: "Customer journey map · Awareness → Post-purchase" },
    ],
    solutionIntro: "The final solution brings together store-like navigation, strong product storytelling, and light-touch sustainability throughout the shopping journey — from homepage to checkout. Each surface has a clear job: orient, inform, and guide without overwhelming.",
    solutionTiles: [
      { _key: "st1", title: "Homepage", text: "Seasonal and local highlights, clear category entry tiles, prominent search, recipes rail, and a reusable packaging return explainer surfaced above the fold." },
      { _key: "st2", title: "Product Listing (PLP)", text: "Tighter filters — dietary, Australian-grown, packaging type — with a consistent card layout and simple grid/list toggle." },
      { _key: "st3", title: "Product Detail (PDP)", text: "Strong provenance storytelling, freshness and storage cues, recipe cross-links, and clear trust signals for delivery and quality guarantees." },
      { _key: "st4", title: "Recipes & Sustainability", text: "Browse recipes and auto-fill cart via \"Shop this recipe.\" Packaging return program surfaced on PDP and at checkout — visible but unobtrusive." },
    ],
    outcomes: "Testing led to a clearer, category-first navigation that reduces dependence on predictive search, while keeping quality and sustainability visible throughout the journey.",
    keyOutcome: "A category-first IA with simplified flyouts and visual landing pages reduced navigation friction significantly. Store-like mental models, predictable labels, and light sustainability cues made the biggest difference to user confidence — not visual polish.",
    youtubeEmbed: "https://youtu.be/qXsFpbLCgeA?si=37DLSIqRh3VmrZaN",
    reflectionQuote: {
      text: "\"Grocery shoppers expect to navigate the way they navigate a physical store. The moment that mental model breaks — when they can't find the aisle — they default to asking someone. Online, that's the search bar.\"",
      attribution: "Montague Joachim · Reflection",
    },
    reflection: "Grocery UX benefits most from store-like mental models online. IA clarity, predictable labels, and light-touch sustainability cues made the biggest difference — not visual polish. If I had another sprint, I'd run tree-tests on menu labels and a small card sort on the recipes taxonomy to harden findability before moving to high-fidelity design.",
  });
  console.log("  ✓  CS-06 created");

  // ─────────────────────────────────────────────────────────────
  // CS-07: Homepage Optimisation
  // ─────────────────────────────────────────────────────────────
  console.log("\n── CS-07: Homepage Optimisation ──");
  const dir07 = "project-homepage-optimisation";
  const [hp_hero, hp_research, hp_process, hp_placement, hp_mobile, hp_solution] =
    await seq([
      () => uploadImage(client, dir07, "hero.jpg"),
      () => uploadImage(client, dir07, "ct208-categories-shipped.jpg"),
      () => uploadImage(client, dir07, "ct209-hero-shipped.jpg"),
      () => uploadImage(client, dir07, "placement-purpose-map.jpg"),
      () => uploadImage(client, dir07, "mobile-constraints.jpg"),
      () => uploadImage(client, dir07, "homepage-operating-model.jpg"),
    ]);

  await client.createOrReplace({
    _id: "case-study-homepage-optimisation",
    _type: "caseStudy",
    projectName: "Officeworks — Homepage Optimisation",
    slug: { _type: "slug", current: "homepage-optimisation" },
    projectSlug: "OFFICEWORKS_HOMEPAGE_OPTIMISATION",
    coordLabel: "CS_007 · CRO / Experimentation · 2024–2026",
    title: "Homepage<br>Optimisation",
    discipline: "CRO / Experimentation",
    meta: [
      { _key: "role", label: "Role", value: "UX/UI Designer · Experimentation & Personalisation (Web & Mobile)" },
      { _key: "timeline", label: "Timeline", value: "2024 → 2026 · Multi-cycle program · Active" },
      { _key: "team", label: "Team", value: "CRO/Experimentation · eComm Content/Trade · Design · Analytics" },
      { _key: "tools", label: "Tools", value: "A/B testing infrastructure · Figma · Analytics · Design system" },
      { _key: "scope", label: "Scope", value: "Homepage strategy · Modular/Bento system · Hero · Categories · Recommendations · Seasonal · Mobile" },
    ],
    tldr: "A multi-year evolution of the Officeworks Homepage (2024–2026) focused on improving clarity, relevance, and the ability to guide customers into the right journeys. Led UX and experimentation across messaging hierarchy, promotional framing, navigation cues, and personalisation — shifting the Homepage from a campaign canvas to an orientation layer with a one-job-per-zone operating model.",
    heroImage: hp_hero,
    order: 7,
    cardCoordLabel: "021 · 08",
    cardDescription: "Multi-year Homepage evolution — shifting from campaign canvas to orientation layer with one-job-per-zone model.",
    overview: "The Officeworks Homepage carries a wide range of responsibilities — brand storytelling, promotions, navigation, and personalisation for very different customer intents. Over a multi-year program (2024–2026), the challenge was improving clarity and relevance at scale without breaking the high-impact, high-risk surface that the Homepage represents. The work evolved from isolated component optimisation toward a coordinated operating model — shifting the team from \"what to say\" toward \"how customers orient and decide\" at the start of their visit.",
    problem: "Customers often struggled to quickly understand where to go next, what was most relevant to them, or how the Homepage related to their task. Unclear messaging hierarchy, over-reliance on promotional carousels, low-engagement regions, and limited contextual guidance were compounded by stakeholder and ops friction that slowed iteration. Small changes risked large downstream effects — making the Homepage both high-impact and high-risk to optimise.",
    insightCards: [
      { _key: "ic1", label: "Pain Point 01", text: "Customers scan the Homepage quickly and make early decisions based on clarity — not persuasion. Promotional overload reduced confidence and slowed decision-making rather than driving it.", highlight: false },
      { _key: "ic2", label: "Pain Point 02", text: "Content cannibalisation — repeating the same trade story across multiple placements (hero + recommendations + bento) diluted the incremental value of each zone.", highlight: false },
      { _key: "ic3", label: "Pain Point 03", text: "Mobile fragility — long copy and tall imagery consistently pushed primary CTAs below the fold on small screens, creating a device-specific experience that couldn't be ignored.", highlight: true },
    ],
    research: "Research combined a heuristic teardown, 2-year CRO journey mapping, behavioural analysis, customer feedback, and competitor benchmarking — structured around test charters covering categories, hero design, recommendations simplification, value/benefit blocks, and targeted/seasonal content. Each charter included clear hypotheses and success criteria. The goal was to identify the most and least effective Homepage blocks and clarify the page's primary role in customer discovery.",
    researchImage: hp_research,
    researchCaption: "CT-208 · Category tiles redesign · shipped to production",
    processIntro: "The program ran as an iterative learning loop — charter → test → learn → iterate — across four phases over 2024–2026. Rather than a single redesign, each phase built on the last, with insights consolidated into design rules that informed Homepage decisions beyond individual experiments.",
    processSteps: [
      { _key: "ps1", title: "Establishing Baselines", text: "Early tests focused on hero messaging, promotional emphasis, and value propositions. Results showed that stronger copy or visual treatment alone did not materially change behaviour if overall structure remained complex — framing the shift toward hierarchy and orientation." },
      { _key: "ps2", title: "Hierarchy & Orientation", text: "Subsequent experiments simplified the hero, clarified category entry points, and adjusted the balance between promotions and navigation. These changes improved engagement signals and reduced early drop-off — confirming that orientation mattered more than persuasion." },
      { _key: "ps3", title: "Personalisation & Relevance", text: "Later tests introduced contextual and audience-based variations. Personalisation performed best when it removed irrelevant content or highlighted likely next steps — not when it attempted to surprise or upsell. Cannibalisation risk between themed recommendations and the hero was confirmed and codified." },
      { _key: "ps4", title: "Synthesis & Scale", text: "Rather than continuously testing surface-level changes, insights were consolidated into design rules — a one-job-per-zone operating model, mobile-first constraints, curation guardrails, and lightweight governance — that informed Homepage decisions across the team." },
    ],
    processImage: hp_process,
    processCaption: "CT-209 · Full-width hero · double-digit lift · shipped to production",
    imgGrid2: [
      { _key: "g2a", image: hp_placement, alt: "Placement purpose map", caption: "Placement Purpose Map · One job per zone — Wayfinding / Trade / Discovery / Supplier" },
      { _key: "g2b", image: hp_mobile, alt: "Mobile constraints", caption: "Mobile-first constraints · Copy limits, image ratios, CTA visibility thresholds" },
    ],
    solutionIntro: "The final solution is not a single screen — it's a coordinated operating model that prevents the Homepage competing with itself. A one-job-per-zone framework, mobile-first constraints, curation guardrails, and lightweight governance work together to protect compounding effects and keep daily operations flexible.",
    solutionTiles: [
      { _key: "st1", title: "One Job Per Zone", text: "Wayfinding (categories/navigation) always present and prominent. Trade (hero/premium) owns the primary campaign moment — no theme duplication downstream. Discovery (recommendations) adds distinct value only. Supplier (Bento) is governed premium real estate with creative standards." },
      { _key: "st2", title: "Mobile-First Constraints", text: "Non-negotiable copy length, image ratio rules, and CTA visibility thresholds that preserve core actions on small screens. Device-specific treatments for carousels and grids. Applied across all card-based modules — no exceptions." },
      { _key: "st3", title: "Curation Rules", text: "Complement the hero — attach/adjacent categories, brand spotlights, price-led hot drops. Never repeat the same trade story in Discovery zones. A theme should not appear in multiple modules unless architecturally intentional." },
      { _key: "st4", title: "Governance & RACI", text: "Zone eligibility and duplication rules, mobile-readiness checks, SKU strength checks, and clear approvals — co-created with the eComm content lead. Keeps daily operations flexible while protecting clarity and compounding performance effects." },
    ],
    solutionImage: hp_solution,
    solutionCaption: "Homepage operating model · One-job-per-zone framework with mobile-first constraints",
    experiments: [
      { _key: "e1", id: "CT-208", name: "Categories / Tiles (Wayfinding)", hypothesis: "Elevating categories and improving tile scannability will strengthen discovery paths into shopping.", resultValue: "Meaningful ↑", resultLabel: "Discovery engagement · Shipped ⭐" },
      { _key: "e2", id: "CT-209", name: "Hero Full-Width (Clarity)", hypothesis: "A full-width, decluttered hero will improve above-the-fold clarity and primary message engagement.", resultValue: "Double-digit ↑", resultLabel: "Hero interaction · Shipped ⭐" },
      { _key: "e3", id: "CT-210", name: "Recommendations Simplification", hypothesis: "Reducing rec density will lower cognitive load and improve continuation where strongest logic is retained.", resultValue: "Low single-digit ↑", resultLabel: "Continuation · Kept" },
      { _key: "e4", id: "CT-314", name: "Themed Recommendations", hypothesis: "Manually curated themes will outperform algorithmic baseline by adding relevant discovery value.", resultValue: "Underperformed", resultLabel: "Cannibalisation confirmed · Rules added" },
      { _key: "e5", id: "CT-223", name: "Seasonal Journey (Mother's Day)", hypothesis: "Routing seasonal clicks to a shop-ready PLP will drive stronger product discovery than a campaign splash page.", resultValue: "Substantial ↑", resultLabel: "Discovery & ATC · Adopted situationally" },
      { _key: "e6", id: "CT-300", name: "Search-Term Pills (Intent Strip)", hypothesis: "Surfacing popular search terms will reduce friction and accelerate qualified search behaviour.", resultValue: "Neutral", resultLabel: "High engagement, neutral commercial · Not always-on" },
      { _key: "e7", id: "CT-306", name: "New & Trending Mobile Card", hypothesis: "Mobile-first card formats will improve engagement in low-performing regions.", resultValue: "Constraints adopted", resultLabel: "Mobile fragility confirmed · Rules shipped" },
      { _key: "e8", id: "CT-234/279", name: "Bento / Supplier-Funded", hypothesis: "A modular premium surface with short copy and visible CTAs will increase top-of-page engagement on mobile.", resultValue: "Double-digit ↑", resultLabel: "Mobile interaction · Retained, governed" },
    ],
    outcomes: "The program moved from isolated component lifts to coordinated orchestration — reducing competition between Homepage blocks and protecting compounding effects. The one-job-per-zone operating model was adopted across the team. All outcomes are directional — no commercially sensitive metrics are published.",
    keyOutcome: "Three variants shipped to production across the program — CT-208 (category tiles), CT-209 (full-width hero), and CT-234/279 (Bento) — with a coordinated one-job-per-zone operating model adopted by the team to compound gains over time.",
    reflection: "What changed the game wasn't a single big win — it was coordinating how placements work together. The shift to a one-job-per-zone model, combined with mobile-first guardrails and simple governance, turned sporadic lifts into compounding improvements. It also created a shared language with eComm/Trade — so the team can keep shipping a purposeful homepage under real operational constraints. If I were to do it again, I'd push for the governance framework earlier — the biggest delays came from content decisions that competed with tested patterns, and a clearer RACI from the start would have protected more of the gains.",
  });
  console.log("  ✓  CS-07 created");

  console.log("\n✅  All 8 case studies seeded successfully.");
})();
