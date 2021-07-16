"use strict";

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const rule = require("unified-lint-rule");

function* getLinksRecursively(node) {
  if (node.url) {
    yield node;
  }
  for (const child of node.children || []) {
    yield* getLinksRecursively(child);
  }
}

function validateLinks(tree, vfile) {
  const currentFileURL = pathToFileURL(path.join(vfile.cwd, vfile.path));
  let previousDefinitionLabel;
  for (const node of getLinksRecursively(tree)) {
    if (node.url[0] !== "#") {
      const targetURL = new URL(node.url, currentFileURL);
      if (targetURL.protocol === "file:" && !fs.existsSync(currentFileURL)) {
        vfile.message("Broken link", node);
      } else if (targetURL.pathname === currentFileURL.pathname) {
        const expected = node.url.includes("#")
          ? node.url.slice(node.url.indexOf("#"))
          : "#";
        vfile.message(
          `Self-reference must start with hash (expected "${expected}", got "${node.url}")`,
          node
        );
      }
    }
    if (node.type === "definition") {
      if (previousDefinitionLabel && previousDefinitionLabel > node.label) {
        vfile.message(
          `Unordered reference ("${node.label}" should be before "${previousDefinitionLabel}")`,
          node
        );
      }
      previousDefinitionLabel = node.label;
    }
  }
}

module.exports = rule("remark-lint:nodejs-links", validateLinks);
