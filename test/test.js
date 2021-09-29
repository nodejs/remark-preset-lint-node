import assert from "assert";
import fs from "fs";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import presetLintNode from "../index.js";
import { read } from "to-vfile";
import { reporter } from "vfile-reporter";

const linter = unified()
  .use(remarkParse)
  .use(presetLintNode)
  .use(remarkStringify);

// Test that correctly-formatted markdown is ok.
(async () => {
  const file = await read(new URL("./fixtures/ok.md", import.meta.url));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 0, reporter(result));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Test that incorrectly-formatted markdown fails.
(async () => {
  const file = await read(new URL("./fixtures/fail.md", import.meta.url));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 1, reporter(result));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

// // Test that incorrectly-formatted markdown is turned into correctly-formatted markdown.
(async () => {
  const file = await read(
    new URL("./fixtures/formatting-input.md", import.meta.url)
  );
  const result = await linter.process(file);
  const expected = await fs.promises.readFile(
    new URL("./fixtures/formatting-output.md", import.meta.url)
  );
  assert.strictEqual(result.toString(), expected.toString());
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
