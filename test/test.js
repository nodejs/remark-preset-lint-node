import assert from "node:assert";
import fs from "node:fs";
import process from "node:process";

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

const handleError = (err) => {
  console.error(err);
  process.exit(1);
};

// Top-level await is not supported in Node.js 12.x. Once we no longer support
// 12.x, this test file can be improved with top-level await.

// Test that correctly-formatted markdown is ok.
(async () => {
  const file = await read(new URL("./fixtures/ok.md", import.meta.url));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 0, reporter(result));
})().catch(handleError);

// Test that incorrectly-formatted markdown fails.
(async () => {
  const file = await read(new URL("./fixtures/fail.md", import.meta.url));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 1, reporter(result));
})().catch(handleError);

// Test that incorrectly-formatted markdown is turned into correctly-formatted markdown.
(async () => {
  const file = await read(
    new URL("./fixtures/formatting-input.md", import.meta.url)
  );
  const result = await linter.process(file);
  const expected = await fs.promises.readFile(
    new URL("./fixtures/formatting-output.md", import.meta.url)
  );
  assert.strictEqual(result.toString(), expected.toString());
})().catch(handleError);
