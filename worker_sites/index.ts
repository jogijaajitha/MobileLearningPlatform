import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

/**
 * The DEBUG flag will do two things:
 * 1. We will skip caching on the edge, which makes it easier to debug
 * 2. We will return an error message on exception in your Response
 */
const DEBUG = false;

/**
 * Handle requests to your Workers site
 */
export default {
  async fetch(request, env, ctx) {
    try {
      // Get the URL from the request
      const url = new URL(request.url);

      // Check if this is an API request
      if (url.pathname.startsWith("/api/")) {
        // For API requests, return a JSON response with a message
        return new Response(
          JSON.stringify({
            message:
              "API endpoints are under development. Please check back later.",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }

      // Serve static assets from KV
      const options = {
        cacheControl: {
          // Don't cache HTML files
          bypassCache: DEBUG,
        },
      };

      // Get the static asset
      const page = await getAssetFromKV(
        {
          request,
          waitUntil: (promise) => ctx.waitUntil(promise),
        },
        options,
      );

      // Allow headers to be altered
      const response = new Response(page.body, page);

      return response;
    } catch (e) {
      // If an error is thrown, return a simple error page
      return new Response(DEBUG ? e.message : "Error loading page", {
        status: 500,
      });
    }
  },
};
