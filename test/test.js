import assert from "assert";
import fs from "fs";
import process from "process";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import presetLintNode from "../index.js";
import { read } from "to-vfile";
import { reporter } from "vfile-reporter";

import fixturesUrl from "./fixtures/fixturesUrl.js";

const linter = unified()
  .use(remarkParse)
  .use(presetLintNode)
  .use(remarkStringify);

const expectedCalls = [];
function mustCall(message = "The Promise never fulfilled") {
  const errorWrapper = { error: new Error(message) };
  expectedCalls.push(errorWrapper);
  return () => {
    errorWrapper.error = undefined;
  };
}
process.on("exit", () => {
  for (const { error } of expectedCalls) {
    if (error) {
      throw error;
    }
  }
});

const handleError = (err) => {
  console.error(err);
  process.exitCode = 1;
};

// Top-level await is not supported in Node.js 12.x. Once we no longer support
// 12.x, this test file can be improved with top-level await.

// Test that correctly-formatted markdown is ok.
(async () => {
  const file = await read(new URL("./ok.md", fixturesUrl));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 0, reporter(result));
})().then(mustCall(), handleError);

// Test that incorrectly-formatted markdown fails.
(async () => {
  const file = await read(new URL("./fail.md", fixturesUrl));
  const result = await linter.process(file);
  assert.strictEqual(result.messages.length, 1, reporter(result));
})().then(mustCall(), handleError);

// Test that incorrectly-formatted markdown is turned into correctly-formatted markdown.
(async () => {
  const file = await read(new URL("./formatting-input.md", fixturesUrl));
  const result = await linter.process(file);
  const expected = await fs.promises.readFile(
    new URL("./formatting-output.md", fixturesUrl)
  );
  assert.strictEqual(result.toString(), expected.toString());
})().then(mustCall(), handleError);
