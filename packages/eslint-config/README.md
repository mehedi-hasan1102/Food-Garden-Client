# @foodly/eslint-config

Shared ESLint flat-config foundation used by every app/workspace package in the
Foodly monorepo. It wraps `@eslint/js` with a small, opinionated rule set and
environment-aware globals.

## Usage

Install the dependencies it re-exports (`@eslint/js`, `globals`) are declared
here and resolved from the workspace root.

### Web app (React, ESM)

```js
// apps/web/eslint.config.js
import foodlyConfig from "@foodly/eslint-config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  ...foodlyConfig({ browser: true, jsx: true }),
  { files: ["**/*.{jsx,tsx}"], /* react rules ... */ },
];
```

### API server (Node, CommonJS)

```js
// apps/api/eslint.config.js
import foodlyConfig from "@foodly/eslint-config";

export default [
  ...foodlyConfig({ node: true, browser: false }),
];
```
