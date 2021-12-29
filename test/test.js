import { strict as assert } from "assert";
import fs from "fs";
import process from "process";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { read } from "to-vfile";
import { reporter } from "vfile-reporter";
import presetLintNode from "../index.js";

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
  if (process.exitCode !== 0) return;
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
  const file = await read(new URL("./fixtures/ok.md", import.meta.url));
  const result = await linter.process(file);
  assert.equal(result.messages.length, 0, reporter(result));
})().then(mustCall(), handleError);

// Test that incorrectly-formatted markdown fails.
(async () => {
  const file = await read(
    new URL("./fixtures/fail-prohibited-string.md", import.meta.url)
  );
  const result = await linter.process(file);
  assert.equal(result.messages.length, 1, reporter(result));
})().then(mustCall(), handleError);

// Test that incorrectly-formatted YAML comment fails.
(async () => {
  const file = await read(
    new URL("./fixtures/fail-nodejs-yaml-comments.md", import.meta.url)
  );
  const result = await linter.process(file);
  assert.equal(result.messages.length, 1, reporter(result));
})().then(mustCall(), handleError);

// Test that incorrectly-formatted markdown is turned into correctly-formatted markdown.
(async () => {
  const file = await read(
    new URL("./fixtures/formatting-input.md", import.meta.url)
  );
  const result = await linter.process(file);
  const expected = await fs.promises.readFile(
    new URL("./fixtures/formatting-output.md", import.meta.url)
  );
  assert.equal(result.toString(), expected.toString());
})().then(mustCall(), handleError);
