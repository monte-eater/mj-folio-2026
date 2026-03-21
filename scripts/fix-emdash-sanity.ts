/**
 * Replaces ' \u2014 ' (em dash) with ', ' across all string fields
 * in every caseStudy document in Sanity.
 *
 * Run with:
 *   npx sanity exec scripts/fix-emdash-sanity.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const EM = " \u2014 ";
const REPLACEMENT = ", ";

function fixStrings(obj: unknown): unknown {
  if (typeof obj === "string") return obj.split(EM).join(REPLACEMENT);
  if (Array.isArray(obj)) return obj.map(fixStrings);
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = fixStrings(v);
    }
    return out;
  }
  return obj;
}

(async () => {
  const client = getCliClient({ useProjectHostname: true });
  const docs = await client.fetch('*[_type == "caseStudy"]');
  console.log(`Found ${docs.length} case study documents`);

  for (const doc of docs) {
    const fixed = fixStrings(doc) as Record<string, unknown>;
    await client.createOrReplace(fixed as Parameters<typeof client.createOrReplace>[0]);
    console.log(`✓ Updated: ${doc.slug?.current}`);
  }

  console.log("Done.");
})();
