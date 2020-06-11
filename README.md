# remark-preset-lint-node

[![Build Status](https://github.com/nodejs/remark-preset-lint-node/workflows/Tests/badge.svg)](https://github.com/nodejs/remark-preset-lint-node/actions?workflow=Tests)

remark preset to configure remark-lint with settings for nodejs/node

## Install

```console
npm install remark-preset-lint-node
```

## Test

```console
npm test
```

## Add new language or grammar

### Adding the language to the linter

1. PR this repo adding the language/grammar
1. Bump this package version, publish it
1. In [node-lint-md-cli-rollup](https://github.com/nodejs/node/tree/master/tools/node-lint-md-cli-rollup), bump the `remark-preset-lint-node` dependency 
1. In the `nodejs/node` repo, rebuild the Markdown linter (`make lint-md-rollup`)
1. PR the `nodejs/node` repo with the updated linter

### Adding a new language to the highlight.js bundle

1. Visit [highlightjs.org/download](https://highlightjs.org/download/)
1. Select [the pre-existing grammars](https://github.com/nodejs/node/tree/master/doc/api_assets#highlightpackjs) and include any additional grammar(s)
1. Download the custom `highlight.zip` package for Node.js
1. Extract the downloaded `highlight.zip`
1. Copy `highlight.pack.js` into the `doc/api_assets/` directory
1. Update the date when the bundle was downloaded at [`doc/api_assets/README.md#highlightpackjs`](https://github.com/nodejs/node/tree/master/doc/api_assets#highlightpackjs)
1. Update [the pre-existing grammars](https://github.com/nodejs/node/tree/master/doc/api_assets#highlightpackjs) at `doc/api_assets/README.md` to include the new grammar(s)
1. PR the `nodejs/node` repo with the updated bundle
