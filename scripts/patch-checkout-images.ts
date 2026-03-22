/**
 * Patches the checkout-optimisation Sanity document with images.
 * Uploads all 6 images and sets heroImage, researchImage, processImage,
 * imgGrid2, and solutionImage — without touching any text content.
 *
 * Run with:
 *   npx sanity exec scripts/patch-checkout-images.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";
import { createReadStream, existsSync } from "fs";

const IMAGES_BASE =
  "C:\\Users\\Monte\\Documents\\portfolio-reference\\assets\\images\\project-checkout-optimisation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any;

async function uploadImage(client: Client, filename: string) {
  const filePath = `${IMAGES_BASE}\\${filename}`;
  if (!existsSync(filePath)) {
    console.warn(`  ⚠  Not found, skipping: ${filename}`);
    return undefined;
  }
  console.log(`  ↑  Uploading: ${filename}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

(async () => {
  const client = getCliClient({ useProjectHostname: true });

  console.log("\n── Checkout Optimisation — image patch ──");

  const hero      = await uploadImage(client, "hero.jpg");
  const research  = await uploadImage(client, "heuristic-teardown.jpg");
  const process   = await uploadImage(client, "experiment-streams.jpg");
  const guestLogin = await uploadImage(client, "guest-login-iteration.jpg");
  const cartReview = await uploadImage(client, "cart-review-iteration.jpg");
  const solution  = await uploadImage(client, "shipped-desktop-pattern.jpg");

  const patch = client.patch("case-study-checkout-optimisation");

  if (hero)      patch.set({ heroImage: hero });
  if (research)  patch.set({ researchImage: research });
  if (process)   patch.set({ processImage: process });
  if (solution)  patch.set({ solutionImage: solution });

  if (guestLogin || cartReview) {
    patch.set({
      imgGrid2: [
        {
          _key: "g2a",
          ...(guestLogin ? { image: guestLogin } : {}),
          alt: "Guest/Login UI iteration",
          caption: "Stream A · Guest/Login UI — initial account emphasis vs side-by-side CTAs with value cues",
        },
        {
          _key: "g2b",
          ...(cartReview ? { image: cartReview } : {}),
          alt: "Cart Review iteration",
          caption: "Stream B · Cart Review — above-the-fold Continue vs prominence-with-familiarity",
        },
      ],
    });
  }

  await patch.commit();
  console.log("✓ Checkout Optimisation images patched successfully.");
})();
