// Cloudflare Worker that serves the built frontend from ASSETS binding

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log("Request received for:", path);

    // Check if ASSETS binding exists
    if (env && env.ASSETS) {
      try {
        console.log("Using ASSETS binding to serve content");

        // Serve static assets directly
        if (
          path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
        ) {
          return env.ASSETS.fetch(request.clone());
        }

        // For all other paths, serve index.html (SPA routing)
        const indexRequest = new Request(
          new URL("/index.html", request.url),
          request,
        );
        return env.ASSETS.fetch(indexRequest);
      } catch (error) {
        console.error("Error serving from ASSETS:", error);
      }
    }

    // Fallback if ASSETS binding isn't available
    return new Response(
      `
      <html>
        <head>
          <title>Skrolla - Configuration Error</title>
          <style>
            body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
            pre { background: #f1f1f1; padding: 1rem; border-radius: 4px; overflow-x: auto; }
            .error { color: #e53e3e; }
          </style>
        </head>
        <body>
          <h1>Skrolla - Configuration Error</h1>
          <p class="error">ASSETS binding is not available.</p>
          <p>This typically happens when the worker is not configured correctly.</p>

          <h2>How to fix:</h2>
          <ol>
            <li>Make sure you've built your frontend: <pre>npm run build:frontend</pre></li>
            <li>Deploy with proper ASSETS binding: <pre>npm run deploy</pre></li>
            <li>Or for local development, use: <pre>npx wrangler dev --site=./dist/public</pre></li>
          </ol>
        </body>
      </html>
    `,
      {
        status: 500,
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      },
    );
  },
};
