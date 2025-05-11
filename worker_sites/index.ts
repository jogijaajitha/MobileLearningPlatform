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

      // If ASSETS binding is not available (which is the case on workers.dev domains),
      // use direct fetch to serve static content
      const path = url.pathname === "/" ? "/index.html" : url.pathname;

      try {
        // Try to fetch the static asset
        const response = await fetch(new URL(path, request.url));

        if (
          response.status === 404 &&
          !path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
        ) {
          // For SPA routing, return index.html for 404s that aren't static assets
          return await fetch(new URL("/index.html", request.url));
        }

        return response;
      } catch (fetchError: any) {
        console.error("Fetch error:", fetchError);
        return new Response(`Failed to fetch content: ${fetchError.message}`, {
          status: 500,
          headers: { "Content-Type": "text/plain" },
        });
      }
    } catch (error: any) {
      console.error("Worker error:", error);
      return new Response(`Error serving content: ${error.message}`, {
        status: 500,
      });
    }
  },
};
