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
      // Check if ASSETS binding exists before using it
      if (env && env.ASSETS) {
        return env.ASSETS.fetch(request);
      }

      // Fall back to default 404 for non-existent assets
      return new Response("Not found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    } catch (error: any) {
      console.error("Worker error:", error);
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};
