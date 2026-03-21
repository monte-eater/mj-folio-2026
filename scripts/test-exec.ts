import { getCliClient } from "sanity/cli";

(async () => {
  const client = getCliClient({ useProjectHostname: true });
  console.log("✓ Client created, project:", client.config().projectId);

  const docs = await client.fetch('*[_type == "caseStudy"] | order(order asc) { projectName }');
  console.log(`Found ${docs.length} case study documents`);
  if (docs.length > 0) console.log(JSON.stringify(docs, null, 2));
})();
