import imageUrlBuilder from "@sanity/image-url";
import { getClient } from "./client";

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]) {
  const builder = imageUrlBuilder(getClient());
  return builder.image(source);
}
