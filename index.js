// @see https://github.com/nodejs/node/blob/master/doc/STYLE_GUIDE.md

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
      unchecked: " "
    }
  ],
  require("remark-lint-checkbox-content-indent"),
  [require("remark-lint-code-block-style"), "fenced"],
  require("remark-lint-definition-spacing"),
  require("remark-lint-fenced-code-flag"),
  [require("remark-lint-fenced-code-marker"), "`"],
  [require("remark-lint-file-extension"), "md"],
  require("remark-lint-final-definition"),
  [require("remark-lint-first-heading-level"), 1],
  [require("remark-lint-heading-style"), "atx"],
  [require("remark-lint-list-item-indent"), "space"],
  require("remark-lint-maximum-line-length"),
  require("remark-lint-no-consecutive-blank-lines"),
  require("remark-lint-no-file-name-articles"),
  require("remark-lint-no-file-name-consecutive-dashes"),
  require("remark-lint-no-file-name-outer-dashes"),
  require("remark-lint-no-heading-indent"),
  [require("remark-lint-no-literal-urls"), false],
  require("remark-lint-no-multiple-toplevel-headings"),
  require("remark-lint-no-shell-dollars"),
  require("remark-lint-no-table-indentation"),
  require("remark-lint-no-tabs"),
  require("remark-lint-no-trailing-spaces"),
  [
    require("remark-lint-prohibited-strings"),
    [
      { no: "End-Of-Life", yes: "End-of-Life" },
      { no: "End-of-life", yes: "End-of-Life" },
      { no: "Github", yes: "GitHub" },
      { no: "hostname", yes: "host name" },
      { no: "[Jj]avascript", yes: "JavaScript" },
      { no: "Node", yes: "Node.js" },
      { no: "Node\\.JS", yes: "Node.js" },
      { no: "node\\.js", yes: "Node.js" },
      { no: "Node\\.js's?", yes: "the Node.js" },
      { no: "[Nn]ote that", yes: "<nothing>" },
      { no: "Rfc", yes: "RFC" },
      { no: "[Rr][Ff][Cc]\\d+", yes: "RFC <number>" },
      { no: "rfc", yes: "RFC" },
      { no: "UNIX", yes: "Unix" },
      { no: "unix", yes: "Unix" },
      { no: "v8", yes: "V8" }
    ]
  ],
  require("remark-lint-rule-style"),
  [require("remark-lint-strong-marker"), "*"],
  [require("remark-lint-table-cell-padding"), "padded"],
  require("remark-lint-table-pipes"),
  [require("remark-lint-unordered-list-marker-style"), "*"]
];
