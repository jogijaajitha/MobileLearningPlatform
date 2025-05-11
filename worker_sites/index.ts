// Simple Cloudflare Worker that returns a dummy response

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Get request information
    const url = new URL(request.url);
    const path = url.pathname;

    console.log("Request received for:", path);

    // Return a dummy HTML response
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Skrolla App</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              line-height: 1.6;
              color: #333;
              background: #f9f9f9;
            }
            h1 { color: #7c3aed; }
            .card {
              background: white;
              border-radius: 8px;
              padding: 1.5rem;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              margin: 2rem 0;
            }
            .path { 
              font-family: monospace;
              background: #333;
              color: #fff;
              padding: 0.5rem;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <h1>Skrolla Mobile Learning Platform</h1>
          <div class="card">
            <h2>🎉 Dummy Response</h2>
            <p>This is a simplified dummy response from the Cloudflare Worker.</p>
            <p>You requested: <span class="path">${path}</span></p>
          </div>
          <div class="card">
            <h3>Environment Info</h3>
            <p>Environment keys: ${Object.keys(env || {}).join(", ") || "No environment keys available"}</p>
            <p>Assets binding available: ${!!(env && env.ASSETS)}</p>
          </div>
        </body>
      </html>
    `,
      {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
        },
      },
    );
  },
};
