import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "identity", title: "Identity" },
    { name: "about", title: "About" },
    { name: "experience", title: "Experience" },
    { name: "skills", title: "Skills & Tools" },
    { name: "education", title: "Education" },
  ],
  fields: [
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      group: "identity",
      options: { hotspot: true },
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "identity",
      initialValue: "Montague Joachim",
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      group: "identity",
      initialValue: "UX/UI Designer",
    }),
    defineField({
      name: "aboutParagraphs",
      title: "About Paragraphs",
      type: "array",
      group: "about",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      group: "experience",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", type: "string", title: "Role" }),
            defineField({ name: "company", type: "string", title: "Company" }),
            defineField({ name: "period", type: "string", title: "Period" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
          preview: {
            select: { title: "role", subtitle: "company" },
          },
        },
      ],
    }),
    defineField({
      name: "skillGroups",
      title: "Skill Groups",
      type: "array",
      group: "skills",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "groupName", type: "string", title: "Group Name" }),
            defineField({
              name: "skills",
              type: "array",
              title: "Skills",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "groupName" },
          },
        },
      ],
    }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      group: "skills",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      group: "education",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "degree", type: "string", title: "Degree" }),
            defineField({ name: "institution", type: "string", title: "Institution" }),
            defineField({ name: "year", type: "string", title: "Year" }),
          ],
          preview: {
            select: { title: "degree", subtitle: "institution" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
