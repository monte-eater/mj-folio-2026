import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "topBarLeft",
      title: "TopBar Left Text",
      type: "string",
      initialValue: "MJ PORTFOLIO — SHEET 01/01",
    }),
    defineField({
      name: "topBarRight",
      title: "TopBar Right Text",
      type: "string",
      initialValue: "LOCATION: MELBOURNE_AU",
    }),
    defineField({
      name: "portfolioLabel",
      title: "Portfolio Label",
      type: "string",
      initialValue: "Portfolio_014-026",
    }),
    defineField({
      name: "nameLineOne",
      title: "Name Line 1",
      type: "string",
      initialValue: "MONTAGUE",
    }),
    defineField({
      name: "nameLineTwo",
      title: "Name Line 2",
      type: "string",
      initialValue: "JOACHIM",
    }),
    defineField({
      name: "bio",
      title: "Bio Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
