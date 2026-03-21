import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "meta", title: "Meta & Identity" },
    { name: "overview", title: "01 — Overview" },
    { name: "problem", title: "02 — Problem" },
    { name: "research", title: "03 — Research" },
    { name: "process", title: "04 — Process" },
    { name: "solution", title: "05 — Solution" },
    { name: "outcomes", title: "06 — Outcomes" },
    { name: "reflection", title: "07 — Reflection" },
  ],
  fields: [
    // ── Meta & Identity ──
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: { source: "projectName", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "projectSlug",
      title: "Project Slug (TopBar label)",
      type: "string",
      group: "meta",
      description: "e.g. OFFICEWORKS_CHECKOUT_OPTIMISATION",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coordLabel",
      title: "Coord Label",
      type: "string",
      group: "meta",
      description: "e.g. CS_000 · CRO / Experimentation · 2024–2025",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title (supports <br> for line breaks)",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "discipline",
      title: "Discipline Tag",
      type: "string",
      group: "meta",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "meta",
      title: "Meta Grid",
      type: "array",
      group: "meta",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value" }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "tldr",
      title: "TL;DR",
      type: "text",
      group: "meta",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "meta",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "meta",
      description: "Controls homepage tile order (lower = first)",
    }),

    // ── Homepage Card ──
    defineField({
      name: "cardCoordLabel",
      title: "Card Coord Label",
      type: "string",
      group: "meta",
      description: "e.g. 014 · 01 — shown on homepage tile",
    }),
    defineField({
      name: "cardDescription",
      title: "Card Description",
      type: "text",
      group: "meta",
      rows: 3,
      description: "Short description for homepage project card",
    }),

    // ── 01 Overview ──
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      group: "overview",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statStrip",
      title: "Stat Strip",
      type: "array",
      group: "overview",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", type: "string", title: "Number" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        },
      ],
    }),

    // ── 02 Problem ──
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      group: "problem",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "insightCards",
      title: "Insight Cards",
      type: "array",
      group: "problem",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "text", type: "text", title: "Text", rows: 3 }),
            defineField({ name: "highlight", type: "boolean", title: "Highlight (teal)", initialValue: false }),
          ],
          preview: {
            select: { title: "label", subtitle: "text" },
          },
        },
      ],
    }),

    // ── 03 Research ──
    defineField({
      name: "research",
      title: "Research",
      type: "text",
      group: "research",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "researchImage",
      title: "Research Image",
      type: "image",
      group: "research",
      options: { hotspot: true },
    }),
    defineField({
      name: "researchCaption",
      title: "Research Image Caption",
      type: "string",
      group: "research",
    }),
    defineField({
      name: "personas",
      title: "Personas",
      type: "array",
      group: "research",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "role", type: "string", title: "Role" }),
            defineField({ name: "bio", type: "text", title: "Bio", rows: 3 }),
            defineField({ name: "image", type: "image", title: "Photo", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "researchQuote",
      title: "Research Quote",
      type: "object",
      group: "research",
      fields: [
        defineField({ name: "text", type: "text", title: "Quote Text", rows: 3 }),
        defineField({ name: "attribution", type: "string", title: "Attribution" }),
      ],
    }),

    // ── 04 Process ──
    defineField({
      name: "processIntro",
      title: "Process Intro",
      type: "text",
      group: "process",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "text", type: "text", title: "Text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "processImage",
      title: "Process Image",
      type: "image",
      group: "process",
      options: { hotspot: true },
    }),
    defineField({
      name: "processCaption",
      title: "Process Image Caption",
      type: "string",
      group: "process",
    }),
    defineField({
      name: "pilotInfo",
      title: "Pilot Info",
      type: "object",
      group: "process",
      fields: [
        defineField({ name: "location", type: "string", title: "Location" }),
        defineField({ name: "duration", type: "string", title: "Duration" }),
        defineField({ name: "outcome", type: "string", title: "Outcome" }),
        defineField({ name: "findings", type: "text", title: "Findings", rows: 3 }),
      ],
    }),
    defineField({
      name: "imgGrid2",
      title: "Image Grid (2-col)",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } }),
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
          preview: {
            select: { title: "alt", subtitle: "caption", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "imgGrid2Stack",
      title: "Stack images vertically (single column)",
      type: "boolean",
      group: "process",
      description: "When enabled, images render full-width stacked vertically instead of a 2-column grid.",
      initialValue: false,
    }),
    defineField({
      name: "imgGrid3",
      title: "Image Grid (3-col)",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } }),
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
          preview: {
            select: { title: "alt", subtitle: "caption", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "imgGrid3Stack",
      title: "Stack images vertically (single column)",
      type: "boolean",
      group: "process",
      description: "When enabled, images render full-width stacked vertically instead of a 3-column grid.",
      initialValue: false,
    }),
    defineField({
      name: "spaceMetrics",
      title: "Space Metrics",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "area", type: "string", title: "Area" }),
            defineField({ name: "unit", type: "string", title: "Unit" }),
            defineField({ name: "label", type: "string", title: "Label" }),
          ],
          preview: {
            select: { title: "area", subtitle: "label" },
          },
        },
      ],
    }),

    // ── 05 Solution ──
    defineField({
      name: "solutionIntro",
      title: "Solution Intro",
      type: "text",
      group: "solution",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "solutionTiles",
      title: "Solution Tiles",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "text", type: "text", title: "Text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "solutionImage",
      title: "Solution Image",
      type: "image",
      group: "solution",
      options: { hotspot: true },
    }),
    defineField({
      name: "solutionCaption",
      title: "Solution Image Caption",
      type: "string",
      group: "solution",
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "spec", type: "string", title: "Spec" }),
            defineField({ name: "use", type: "string", title: "Use" }),
            defineField({ name: "swatch", type: "string", title: "Swatch Colour (hex)", description: "e.g. #C4A35A" }),
          ],
          preview: {
            select: { title: "name", subtitle: "spec" },
          },
        },
      ],
    }),
    defineField({
      name: "materialsCaption",
      title: "Materials Caption",
      type: "string",
      group: "solution",
    }),
    defineField({
      name: "designPrinciples",
      title: "Design Principles",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "text", type: "text", title: "Text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
    }),
    defineField({
      name: "productRange",
      title: "Product Range",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "detail", type: "text", title: "Detail", rows: 2 }),
            defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } }),
          ],
          preview: {
            select: { title: "name", subtitle: "detail", media: "image" },
          },
        },
      ],
    }),
    defineField({
      name: "productRangeCaption",
      title: "Product Range Caption",
      type: "string",
      group: "solution",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "primary", type: "boolean", title: "Primary Tag", initialValue: false }),
          ],
          preview: {
            select: { title: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "experiments",
      title: "Experiments",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", type: "string", title: "ID" }),
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "hypothesis", type: "text", title: "Hypothesis", rows: 2 }),
            defineField({ name: "resultValue", type: "string", title: "Result Value" }),
            defineField({ name: "resultLabel", type: "string", title: "Result Label" }),
          ],
          preview: {
            select: { title: "name", subtitle: "id" },
          },
        },
      ],
    }),

    // ── 06 Outcomes ──
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "text",
      group: "outcomes",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "keyOutcome",
      title: "Key Outcome",
      type: "text",
      group: "outcomes",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "clientCredit",
      title: "Client Credit",
      type: "object",
      group: "outcomes",
      fields: [
        defineField({ name: "client", type: "string", title: "Client" }),
        defineField({ name: "via", type: "string", title: "Via" }),
      ],
    }),
    defineField({
      name: "rolloutScope",
      title: "Rollout Scope",
      type: "string",
      group: "outcomes",
    }),

    // ── 07 Reflection ──
    defineField({
      name: "reflection",
      title: "Reflection",
      type: "text",
      group: "reflection",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reflectionQuote",
      title: "Reflection Quote",
      type: "object",
      group: "reflection",
      fields: [
        defineField({ name: "text", type: "text", title: "Quote Text", rows: 3 }),
        defineField({ name: "attribution", type: "string", title: "Attribution" }),
      ],
    }),
    defineField({
      name: "youtubeEmbed",
      title: "YouTube Embed URL",
      type: "url",
      group: "reflection",
    }),
    defineField({
      name: "youtubeCaption",
      title: "YouTube Caption",
      type: "string",
      group: "reflection",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "projectName",
      subtitle: "discipline",
      media: "heroImage",
    },
  },
});
