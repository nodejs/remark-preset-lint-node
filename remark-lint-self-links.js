"use strict";

const path = require("path");
const { pathToFileURL } = require("url");

const rule = require("unified-lint-rule");

const getLinksRecursively = require("./getLinksRecursively.js");

function validateLinks(tree, vfile) {
  const currentFileURL = pathToFileURL(path.join(vfile.cwd, vfile.path));
  for (const node of getLinksRecursively(tree)) {
    if (node.url[0] !== "#") {
      const targetURL = new URL(node.url, currentFileURL);
      if (targetURL.pathname === currentFileURL.pathname) {
        const expected = node.url.includes("#")
          ? node.url.slice(node.url.indexOf("#"))
          : "#";
        vfile.message(
          `Self-reference must start with hash (expected "${expected}", got "${node.url}")`,
          node
        );
      }
    }
  }
}

module.exports = rule("remark-lint-self-links", validateLinks);
