import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const requestedPort = Number(process.env.PORT) || 3000;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
  const normalizedPath = normalize(requestedPath);

  if (isAbsolute(normalizedPath) || normalizedPath.startsWith("..")) {
    return join(root, "index.html");
  }

  return join(root, normalizedPath);
}

function startServer(port) {
  const server = createServer(async (request, response) => {
    try {
      const filePath = resolveRequestPath(request.url);
      const file = await readFile(filePath);
      const contentType = contentTypes[extname(filePath)] || "application/octet-stream";

      response.writeHead(200, { "Content-Type": contentType });
      response.end(file);
    } catch (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && !process.env.PORT) {
      startServer(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, () => {
    console.log(`Weather app running at http://localhost:${port}`);
  });
}

startServer(requestedPort);
