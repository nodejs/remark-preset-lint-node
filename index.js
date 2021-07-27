// @see https://github.com/nodejs/node/blob/master/doc/guides/doc-style-guide.md

"use strict";

// Add in rules alphabetically
module.exports.plugins = [
  require("remark-lint"),
  // Leave preset at the top so it can be overridden
  require("remark-preset-lint-recommended"),
  [require("remark-lint-blockquote-indentation"), 2],
  [
    require("remark-lint-checkbox-character-style"),
    {
      checked: "x",
      unchecked: " ",
    },
  ],
  require("remark-lint-checkbox-content-indent"),
  [require("remark-lint-code-block-style"), "fenced"],
  require("remark-lint-definition-spacing"),
  [
    require("remark-lint-fenced-code-flag"),
    {
      flags: [
        "bash",
        "c",
        "cjs",
        "coffee",
        "console",
        "cpp",
        "diff",
        "http",
        "js",
        "json",
        "markdown",
        "mjs",
        "powershell",
        "r",
        "text",
      ],
    },
  ],
  [require("remark-lint-fenced-code-marker"), "`"],
  [require("remark-lint-file-extension"), "md"],
  require("remark-lint-final-definition"),
  [require("remark-lint-first-heading-level"), 1],
  [require("remark-lint-heading-style"), "atx"],
  [require("remark-lint-list-item-indent"), "space"],
  [require("remark-lint-mdash-style"), "-"],
  require("remark-lint-match-punctuation"),
  require("remark-lint-maximum-line-length"),
  require("remark-lint-no-consecutive-blank-lines"),
  require("remark-lint-no-dead-urls"),
  require("remark-lint-no-empty-sections"),
  require("remark-lint-no-file-name-articles"),
  require("remark-lint-no-file-name-consecutive-dashes"),
  require("remark-lint-no-file-name-outer-dashes"),
  require("remark-lint-no-heading-indent"),
  require("remark-lint-no-multiple-toplevel-headings"),
  require("remark-lint-no-repeat-punctuation"),
  require("remark-lint-no-shell-dollars"),
  require("remark-lint-no-table-indentation"),
  require("remark-lint-no-tabs"),
  require("remark-lint-no-trailing-spaces"),
  require("./remark-lint-nodejs-links.js"),
  require("./remark-lint-nodejs-yaml-comments.js"),
  [
    require("remark-lint-prohibited-strings"),
    [
      { yes: "End-of-Life" },
      { yes: "GitHub" },
      { no: "hostname", yes: "host name" },
      { yes: "JavaScript" },
      { no: "[Ll]ong[ -][Tt]erm [Ss]upport", yes: "Long Term Support" },
      { no: "Node", yes: "Node.js", ignoreNextTo: "-API" },
      { yes: "Node.js" },
      { no: "Node[Jj][Ss]", yes: "Node.js" },
      { no: "Node\\.js's?", yes: "the Node.js" },
      { no: "[Nn]ote that", yes: "<nothing>" },
      { yes: "RFC" },
      { no: "[Rr][Ff][Cc]\\d+", yes: "RFC <number>" },
      { yes: "Unix" },
      { yes: "V8" },
    ],
  ],
  require("remark-lint-rule-style"),
  [require("remark-lint-strong-marker"), "*"],
  [require("remark-lint-table-cell-padding"), "padded"],
  require("remark-lint-table-pipes"),
  [require("remark-lint-unordered-list-marker-style"), "*"],
];
