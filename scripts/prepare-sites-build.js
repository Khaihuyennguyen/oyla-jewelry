import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";

mkdirSync("dist/.openai", { recursive: true });
mkdirSync("dist/server", { recursive: true });

copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");

writeFileSync(
  "dist/server/index.js",
  `const INDEX_PATH = "/index.html";

function withIndexFallback(request) {
  const url = new URL(request.url);
  url.pathname = INDEX_PATH;
  url.search = "";
  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }

      return env.ASSETS.fetch(withIndexFallback(request));
    }

    return new Response("Oyla site assets are not available in this environment.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
`,
);
