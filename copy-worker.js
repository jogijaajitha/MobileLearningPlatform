import fs from "fs";
import path from "path";

// Ensure dist directory exists
const distDir = path.resolve("./dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy _worker.js to dist directory
fs.copyFileSync("./_worker.js", path.join(distDir, "_worker.js"));

console.log("Worker file copied successfully!");
