/**
 * Patches the display order of all case study tiles.
 *
 * Run with:
 *   npx sanity exec scripts/patch-order.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const ORDER: { id: string; order: number }[] = [
  { id: "cs-ai-portfolio-build",            order: 1 },
  { id: "case-study-homepage-optimisation", order: 2 },
  { id: "case-study-checkout-optimisation", order: 3 },
  { id: "case-study-acre-organics",         order: 4 },
  { id: "case-study-medipal",               order: 5 },
  { id: "case-study-la-bohemia",            order: 6 },
  { id: "case-study-ikea-make-room-for-life", order: 7 },
  { id: "case-study-banana-barge",          order: 8 },
  { id: "case-study-through-the-woods",     order: 9 },
];

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  console.log("\n── Patching tile order ──");
  for (const { id, order } of ORDER) {
    await client.patch(id).set({ order }).commit();
    console.log(`  ✓  ${id} → ${order}`);
  }
  console.log("\nDone.");
})();
