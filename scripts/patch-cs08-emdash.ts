/**
 * Replaces all instances of " —" with "," in the AI Portfolio Build case study.
 * Operates on the live Sanity document so manual edits are preserved.
 *
 * Run with:
 *   npx sanity exec scripts/patch-cs08-emdash.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const DOC_ID = "cs-ai-portfolio-build";

// Recursively walk any value and replace " —" with "," in strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepReplace(val: any): any {
  if (typeof val === "string") return val.replace(/ —/g, ",");
  if (Array.isArray(val)) return val.map(deepReplace);
  if (val && typeof val === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out: any = {};
    for (const key of Object.keys(val)) out[key] = deepReplace(val[key]);
    return out;
  }
  return val;
}

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  const doc = await client.fetch(`*[_id == $id][0]`, { id: DOC_ID });
  if (!doc) {
    console.error(`❌ Document not found: ${DOC_ID}`);
    return;
  }

  const patched = deepReplace(doc);

  // Remove system fields before patching
  const { _id, _type, _rev, _createdAt, _updatedAt, ...fields } = patched;
  void _type; void _rev; void _createdAt; void _updatedAt;

  await client.patch(_id).set(fields).commit();
  console.log(`✓ All " —" replaced with "," in ${DOC_ID}`);
})();
