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

    // Serve static files from Cloudflare Pages
    try {
      // Rewrite the URL to index.html for client-side routing
      const path = url.pathname === "/" ? "/index.html" : url.pathname;

      // Try to serve a static asset
      const response = await fetch(new URL(path, request.url));

      if (response.status === 404) {
        // For client-side routing, serve index.html for any route not found
        return await fetch(new URL("/index.html", request.url));
      }

      return response;
    } catch (error: any) {
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
      });
    }
  },
};
