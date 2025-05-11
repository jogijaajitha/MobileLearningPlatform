// This is a simple Cloudflare Pages worker that serves static assets
import {
  getAssetFromKV,
  serveSinglePageApp,
} from "@cloudflare/kv-asset-handler";

// Define options for serving assets locally
const ASSETS_MANIFEST = {}; // This will be auto-populated in production
const LOCAL_ASSETS_PATH = "../dist/public"; // Relative path from worker_sites directory

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Debug output to help identify issues
    console.log("Worker request path:", path);
    console.log("Environment keys:", Object.keys(env || {}));
    console.log("ASSETS binding present:", !!(env && env.ASSETS));

    // Handle API requests (placeholder for now)
    if (path.startsWith("/api/")) {
      return new Response(
        JSON.stringify({
          message:
            "API endpoints are not available in the static Cloudflare Pages deployment.",
          info: "This is a static frontend-only deployment.",
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    try {
      // If ASSETS binding exists, use it (this is the standard way)
      if (env && env.ASSETS) {
        // Try to serve the requested path
        let response = await env.ASSETS.fetch(request.clone());

        // If it's a 404 and not a file with a specific extension, serve index.html for SPA routing
        if (
          response.status === 404 &&
          !path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
        ) {
          // Create a new request for index.html
          const indexRequest = new Request(
            new URL("/index.html", request.url),
            request,
          );
          return env.ASSETS.fetch(indexRequest);
        }

        return response;
      }
      // Fallback to kv-asset-handler for local development
      else {
        console.log(
          "ASSETS binding not available, using fallback kv-asset-handler",
        );

        // Use kv-asset-handler to serve from local filesystem in development
        const options = {
          ASSET_NAMESPACE: ASSETS_MANIFEST,
          ASSET_MANIFEST: ASSETS_MANIFEST,
          cacheControl: {
            browserTTL: 0, // No cache during development
            edgeTTL: 0,
          },
          defaultMimeType: "text/html",
          defaultDocument: "index.html",
        };

        try {
          // For non-file extensions that might be SPA routes
          if (
            !path.match(
              /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/,
            )
          ) {
            return await serveSinglePageApp(request, options);
          }

          // For direct file requests
          return await getAssetFromKV(
            {
              request,
              waitUntil: (promise: Promise<any>) => ctx.waitUntil(promise),
            },
            options,
          );
        } catch (kvError: any) {
          console.error("Error serving from KV:", kvError);

          // If we still can't serve the asset, show a more informative error
          return new Response(
            `Unable to serve the requested resource. Please ensure you have built the project (npm run build) and are running with the correct configuration.

Details: ${kvError.message}

For best results, run:
npm run dev:worker
            `,
            {
              status: 404,
              headers: { "Content-Type": "text/plain" },
            },
          );
        }
      }
    } catch (error: any) {
      console.error("Worker error:", error);
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};
