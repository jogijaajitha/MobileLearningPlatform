// This is a simple Cloudflare Pages worker that serves static assets

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    const path = url.pathname;

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

    // Check if ASSETS binding exists before using it
    if (!env || !env.ASSETS) {
      console.error("ASSETS binding is not available.", {
        environmentKeys: env ? Object.keys(env) : "env is undefined",
      });

      return new Response(
        "Configuration Error: Cloudflare Pages assets not available. This typically happens during local development when the ASSETS binding isn't configured properly. Please check your wrangler.toml file and ensure you're using --site flag with wrangler dev.",
        {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        },
      );
    }

    try {
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
    } catch (error: any) {
      console.error("Worker error:", error);
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};
