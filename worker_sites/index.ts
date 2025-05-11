// This is a simple Cloudflare Pages worker that serves static assets

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // Handle API requests (placeholder for now)
    if (url.pathname.startsWith("/api/")) {
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
      // Let Cloudflare Pages handle static assets and routing
      // This approach doesn't use fetch() on the same origin, which avoids the 1042 error

      // For SPA (Single Page Application) routing, return index.html for routes
      // that don't match a static asset - this is handled automatically by Cloudflare Pages

      // Pass the request through to Cloudflare Pages' built-in asset handling
      return env.ASSETS.fetch(request);
    } catch (error: any) {
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
      });
    }
  },
};
