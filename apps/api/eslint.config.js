import foodlyConfig from "@foodly/eslint-config";

export default [
  ...foodlyConfig({ node: true, browser: false }),
];
