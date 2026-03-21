/**
 * Patches the banana-barge Sanity document:
 *   - Moves imgGrid2[0] (pilot-instore) to solutionImage
 *   - Clears imgGrid2
 *
 * Run with:
 *   npx sanity exec scripts/patch-banana-barge.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  const doc = await client.fetch('*[_type == "caseStudy" && slug.current == "banana-barge"][0]');
  if (!doc) {
    console.error("❌ banana-barge document not found");
    return;
  }

await client
    .patch(doc._id)
    .set({ tldr: "Purpose-built banana display for Coles, maximising stock capacity while reducing bruising and waste. From SolidWorks CAD through prototyping, a 6-month pilot, and national production handover. Deployed across 500+ stores and still in use 10+ years later." })
    .commit();

  console.log("✓ banana-barge tldr updated");
})();
