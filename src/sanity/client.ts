import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!_client) {
    if (!projectId) {
      throw new Error("Sanity projectId is not configured");
    }
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}
