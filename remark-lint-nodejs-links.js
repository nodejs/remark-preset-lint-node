"use strict";

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const rule = require("unified-lint-rule");

const getLinksRecursively = require("./getLinksRecursively.js");

function validateLinks(tree, vfile) {
  const currentFileURL = pathToFileURL(path.join(vfile.cwd, vfile.path));
  for (const node of getLinksRecursively(tree)) {
    if (node.url[0] !== "#") {
      const targetURL = new URL(node.url, currentFileURL);
      if (targetURL.protocol === "file:" && !fs.existsSync(targetURL)) {
        vfile.message("Broken link", node);
      }
    }
  }
}

module.exports = rule("remark-lint:nodejs-links", validateLinks);
