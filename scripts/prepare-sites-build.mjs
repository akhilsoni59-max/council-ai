import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";

const root = process.cwd();
const distributionDirectory = resolve(root, "dist");
const serverDirectory = resolve(distributionDirectory, "server");
const metadataDirectory = resolve(distributionDirectory, ".openai");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "server" || entry.name === ".openai") continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    if (entry.isFile()) files.push(path);
  }

  return files;
}

const files = await collectFiles(distributionDirectory);
const assets = {};

for (const file of files) {
  const pathname = `/${relative(distributionDirectory, file).split(sep).join("/")}`;
  assets[pathname] = {
    body: (await readFile(file)).toString("base64"),
    type: mimeTypes[extname(file).toLowerCase()] ?? "application/octet-stream",
  };
}

const worker = `const assets = ${JSON.stringify(assets)};

function decodeBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

const worker = {
  async fetch(request) {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", { status: 405 });
    }

    const url = new URL(request.url);
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }

    let asset = assets[pathname];
    let assetPath = pathname;
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const looksLikeFile = /\\.[a-z0-9]+$/i.test(pathname);

    if (!asset && (pathname === "/" || (acceptsHtml && !looksLikeFile))) {
      asset = assets["/index.html"];
      assetPath = "/index.html";
    }

    if (!asset) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers({
      "content-type": asset.type,
      "cache-control": assetPath.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
      "x-content-type-options": "nosniff",
    });

    return new Response(request.method === "HEAD" ? null : decodeBase64(asset.body), {
      status: 200,
      headers,
    });
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
