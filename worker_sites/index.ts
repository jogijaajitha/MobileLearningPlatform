// Simple Cloudflare Worker with no dependency on ASSETS binding
// This serves a fully hardcoded version of the site

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log("Request received for:", path);

    // Extract file extension from the path (if any)
    const fileExtMatch = path.match(/\.([a-z0-9]+)$/i);
    const fileExt = fileExtMatch ? fileExtMatch[1].toLowerCase() : null;

    // Handle different file types
    switch (fileExt) {
      case "js":
        // If the specific JS file is requested, we'd serve it here
        // For example: if (path === '/assets/index-OrT4_Ag8.js') return serveJsFile();
        return new Response(
          `console.log('Asset not available in standalone mode');`,
          {
            headers: { "Content-Type": "application/javascript" },
          },
        );

      case "css":
        // If the specific CSS file is requested, we'd serve it here
        return new Response(`/* Asset not available in standalone mode */`, {
          headers: { "Content-Type": "text/css" },
        });

      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
      case "ico":
        // For images, return a simple placeholder or error
        return new Response("Image not available in standalone mode", {
          status: 404,
          headers: { "Content-Type": "text/plain" },
        });

      default:
        // For all other requests (including SPA routes), serve index.html
        return serveIndexHtml(request, path);
    }
  },
};

// Function to serve the main index.html
function serveIndexHtml(request: Request, path: string) {
  // Return the hardcoded index.html
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Skrolla - Type. Swipe. Master.</title>
    <meta name="description" content="Skrolla turns any topic into dynamic, scrollable flashcards that combine short-form lessons with interactive Q&A. It's microlearning designed for busy minds and short attention spans." />

    <!-- Open Graph Tags -->
    <meta property="og:title" content="Skrolla - Type. Swipe. Master." />
    <meta property="og:description" content="Skrolla turns any topic into dynamic, scrollable flashcards that combine short-form lessons with interactive Q&A for busy minds and short attention spans." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://skrolla.app" />

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

    <!-- Inline CSS for basic styling since we're not loading external CSS -->
    <style>
      body {
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
        background: #f5f5f7;
      }
      #root {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #7c3aed;
        margin-top: 0;
      }
      .debug-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #333;
        color: #fff;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        opacity: 0.9;
      }
      .debug-panel-toggle {
        position: fixed;
        bottom: 0;
        right: 0;
        background: #555;
        color: #fff;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
        z-index: 10000;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <h1>Skrolla</h1>
      <p>This is a standalone version of the Skrolla app running without the ASSETS binding.</p>
      <p>The app is running in a simplified mode that doesn't load external JavaScript or CSS assets.</p>
      <p>To see the full app, use <code>npm run dev:worker</code> which properly configures the ASSETS binding.</p>
    </div>

    <!-- Debug panel -->
    <div class="debug-panel" id="debugPanel">
      <p>🔍 Worker Debug Info:</p>
      <p>Requested path: ${path}</p>
      <p>Mode: Standalone (no ASSETS binding)</p>
      <p>URL: ${request.url}</p>
    </div>
    <button class="debug-panel-toggle" onclick="document.getElementById('debugPanel').style.display = document.getElementById('debugPanel').style.display === 'none' ? 'block' : 'none'">Toggle Debug</button>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    },
  );
}
