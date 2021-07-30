"use strict";

module.exports = function* getLinksRecursively(node) {
  if (node.url) {
    yield node;
  }
  for (const child of node.children || []) {
    yield* getLinksRecursively(child);
  }
};
