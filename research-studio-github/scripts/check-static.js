const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "research-studio.html");
const html = fs.readFileSync(htmlPath, "utf8");
const start = html.indexOf('"use strict";');
const end = html.lastIndexOf("</script>");
if (start < 0 || end < 0) throw new Error("Inline application script not found");
new Function(html.slice(start, end));

const required = ["index.html", "research-studio.html", "manifest.webmanifest", "sw.js", "README.md", "LICENSE"];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing required release file: ${file}`);
}

const remoteScripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
const unpinned = remoteScripts.filter(url => !/@\d|\/\d+\.\d+\.\d+\//.test(url));
if (unpinned.length) throw new Error(`Unpinned CDN dependencies: ${unpinned.join(", ")}`);

const staticMarkup = html.slice(0, start);
const duplicateIds = [...staticMarkup.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]).filter((id, index, ids) => ids.indexOf(id) !== index);
if (duplicateIds.length) throw new Error(`Duplicate static HTML ids: ${[...new Set(duplicateIds)].join(", ")}`);

console.log(`Static checks passed: ${remoteScripts.length} pinned CDN scripts, ${html.length} HTML chars.`);
