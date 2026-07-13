import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const serverDirectory = resolve(root, "dist", "server");
const metadataDirectory = resolve(root, "dist", ".openai");

const worker = `const worker = {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset binding is unavailable.", { status: 500 });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const url = new URL(request.url);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const looksLikeFile = /\\.[a-z0-9]+$/i.test(url.pathname);

    if (!acceptsHtml || looksLikeFile) {
      return response;
    }

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

export default worker;
`;

await mkdir(serverDirectory, { recursive: true });
await mkdir(metadataDirectory, { recursive: true });
await writeFile(resolve(serverDirectory, "index.js"), worker, "utf8");
await copyFile(
  resolve(root, ".openai", "hosting.json"),
  resolve(metadataDirectory, "hosting.json"),
);
