"use strict";

const rule = require("unified-lint-rule");
const getLinksRecursively = require("./getLinksRecursively.js");

function validateLinks(tree, vfile) {
  let previousDefinitionLabel;
  for (const node of getLinksRecursively(tree)) {
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

module.exports = rule("remark-lint-alphabetize-references", validateLinks);
