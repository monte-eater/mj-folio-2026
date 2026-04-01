import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/caseStudies";
import { isSanityConfigured, fetchAllCaseStudySlugs } from "@/sanity/lib/fetch";

const BASE_URL = "https://www.montaguejoachim.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = isSanityConfigured()
    ? await fetchAllCaseStudySlugs()
    : getAllSlugs();

  const caseStudyEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/case-study/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudyEntries,
  ];
}
